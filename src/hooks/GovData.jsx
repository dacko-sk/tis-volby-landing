import { createContext, useContext, useMemo, useState } from 'react';
import { usePapaParse } from 'react-papaparse';

import { colors } from '../helpers/constants';
import { sortByNumericProp, sumOfValues } from '../helpers/helpers';
import { partyAlias } from '../helpers/parties';

// import all csv files from the govfunds folder via webpack
const govFiles = require.context('../../public/csv/govfunds', false, /\.csv$/);

const initialState = {
    error: null,
    electionPeriods: {},
};

export const csvKeys = {
    ELECTION_PERIOD: 'VOLEBNÉ OBDOBIE',
    VOTE_PRICE: 'CENA HLASU',
    SUBSIDY_VOTES: 'PRÍSPEVKY ZA HLASY',
    SUBSIDY_OPERATION: 'PRÍSPEVKY NA ČINNOSŤ',
    SUBSIDY_MANDATE: 'PRÍSPEVKY NA MANDÁT',
    COALITIONS: 'KOALÍCIE',
    ESTIMATE: 'ODHAD',
};

export const subsidyTypes = [
    csvKeys.SUBSIDY_VOTES,
    csvKeys.SUBSIDY_OPERATION,
    csvKeys.SUBSIDY_MANDATE,
];

export const subsidyColors = {
    [csvKeys.SUBSIDY_MANDATE]: {
        paid: colors.colorLightBlue,
        est: colors.colorLightBlueDs,
    },
    [csvKeys.SUBSIDY_OPERATION]: {
        paid: colors.colorDarkBlue,
        est: colors.colorDarkBlueDs,
    },
    [csvKeys.SUBSIDY_VOTES]: {
        paid: colors.colorOrange,
        est: colors.colorOrangeDs,
    },
};

export const processElectionPeriod = (csv) => {
    if (csv.data ?? false) {
        const ep = {};
        let currentDataSet = null;
        let currentYears = [];
        csv.data.forEach((row) => {
            switch (row[0]) {
                case csvKeys.ELECTION_PERIOD:
                    ep[row[0]] = Number(row[1]);
                    ep[csvKeys.ESTIMATE] = !!row[2];
                    break;
                case csvKeys.VOTE_PRICE:
                    ep[row[0]] = Number(row[1]);
                    break;
                case csvKeys.SUBSIDY_VOTES:
                case csvKeys.SUBSIDY_OPERATION:
                case csvKeys.SUBSIDY_MANDATE:
                    currentDataSet = row[0];
                    currentYears = row.filter(
                        (element, index) => index > 0 && element !== null
                    );
                    ep[currentDataSet] = {};
                    break;
                case csvKeys.COALITIONS:
                    currentDataSet = csvKeys.COALITIONS;
                    currentYears = [];
                    ep[currentDataSet] = {};
                    break;
                default:
                    if (currentDataSet) {
                        const partyName = partyAlias(row[0]);
                        if (partyName) {
                            const party = {};
                            if (currentDataSet === csvKeys.COALITIONS) {
                                const members = [];
                                const percentages = [];
                                row.splice(1).forEach((column, index) => {
                                    if (index % 2 === 0) {
                                        percentages.push(Number(column));
                                    } else {
                                        members.push(partyAlias(column));
                                    }
                                });
                                members.forEach((member, index) => {
                                    party[member] = percentages[index];
                                });
                            } else {
                                currentYears.forEach((year, index) => {
                                    party[year] = Number(row[index + 1]) || 0;
                                });
                            }
                            ep[currentDataSet][partyName] = party;
                        }
                    }
            }
        });
        return ep;
    }
    return null;
};

const GovDataContext = createContext(initialState);

export const GovDataProvider = function ({ children }) {
    const [govData, setGovData] = useState(initialState);
    const { readRemoteFile } = usePapaParse();

    const csvLoadingError = (error) => {
        setGovData({
            ...govData,
            error: error,
        });
    };

    const loadAllElections = () => {
        const csvFiles = govFiles.keys();
        const electionPeriods = {};
        let error = null;
        Promise.all(
            csvFiles.map(
                (key) =>
                    new Promise((resolve, reject) => {
                        readRemoteFile(govFiles(key), {
                            worker: false, // must be false for local files
                            header: false,
                            dynamicTyping: true,
                            skipEmptyLines: true,
                            complete: (csv) => {
                                const data = processElectionPeriod(csv);
                                if (data) {
                                    electionPeriods[key] = data;
                                } else {
                                    error = `Data read error in file ${key}`;
                                }

                                return resolve(key);
                            },
                            error: reject,
                        });
                    })
            )
        )
            .then((results) => {
                if (results.length === csvFiles.length && !error) {
                    setGovData({ ...govData, electionPeriods });
                } else {
                    csvLoadingError(error || 'Failed to load all files');
                }
            })
            .catch((error) => {
                csvLoadingError(error);
            });
    };

    const getElectionPeriods = (asc) =>
        Object.values(govData.electionPeriods).sort(
            sortByNumericProp(csvKeys.ELECTION_PERIOD, asc)
        );

    const getElectionPeriodData = (period) =>
        getElectionPeriods().find(
            (ep) => period === ep[csvKeys.ELECTION_PERIOD]
        );

    const getAggYears = (period, type, party) => {
        const paid = {};
        const est = {};
        getElectionPeriods().forEach((ep) => {
            if (!period || ep[csvKeys.ELECTION_PERIOD] === period) {
                const obj = ep[csvKeys.ESTIMATE] ? est : paid;
                (type ? [type] : subsidyTypes).forEach((st) => {
                    let parties = [];
                    let multiplier;
                    if (party) {
                        if (ep[st][party] ?? false) {
                            parties = [ep[st][party]];
                        } else if (ep[csvKeys.COALITIONS] ?? false) {
                            Object.entries(ep[csvKeys.COALITIONS]).some(
                                ([coalition, members]) =>
                                    Object.entries(members).some(
                                        ([member, share]) => {
                                            if (
                                                member === party &&
                                                !Number.isNaN(share)
                                            ) {
                                                parties = [ep[st][coalition]];
                                                multiplier = share;
                                                return true;
                                            }
                                            return false;
                                        }
                                    )
                            );
                        }
                    } else {
                        parties = Object.values(ep[st]);
                    }
                    parties.forEach((p) => {
                        Object.entries(p).forEach(([year, subsidy]) => {
                            obj[year] =
                                (obj[year] ?? 0) +
                                (multiplier ? multiplier * subsidy : subsidy);
                        });
                    });
                });
            }
        });
        return { paid, est };
    };

    const getAggTotals = (period, type, party) => {
        const { paid, est } = getAggYears(period, type, party);
        return sumOfValues(paid) + sumOfValues(est);
    };

    const getPartiesYears = (period, type, party) => {
        const parties = {};
        getElectionPeriods().forEach((ep) => {
            if (!period || ep[csvKeys.ELECTION_PERIOD] === period) {
                (type ? [type] : subsidyTypes).forEach((st) => {
                    const sk =
                        st + (ep[csvKeys.ESTIMATE] ? csvKeys.ESTIMATE : '');
                    let epStParties = [];
                    if (party) {
                        if (ep[st][party] ?? false) {
                            epStParties = [party, ep[st][party]];
                        }
                    } else {
                        epStParties = Object.entries(ep[st]);
                    }
                    epStParties.forEach(([partyName, years]) => {
                        if (!(parties[partyName] ?? false)) {
                            parties[partyName] = {};
                        }
                        if (!(parties[partyName][sk] ?? false)) {
                            parties[partyName][sk] = {};
                        }
                        Object.entries(years).forEach(([year, subsidy]) => {
                            parties[partyName][sk][year] =
                                (parties[partyName][sk][year] ?? 0) + subsidy;
                        });
                    });
                    if (!party) {
                        Object.entries(ep[csvKeys.COALITIONS] ?? []).forEach(
                            ([coalition, members]) => {
                                const years = ep[st][coalition];
                                Object.entries(members).forEach(
                                    ([member, share]) => {
                                        if (!Number.isNaN(share)) {
                                            if (!(parties[member] ?? false)) {
                                                parties[member] = {};
                                            }
                                            if (
                                                !(parties[member][sk] ?? false)
                                            ) {
                                                parties[member][sk] = {};
                                            }
                                            Object.entries(years).forEach(
                                                ([year, subsidy]) => {
                                                    parties[member][sk][year] =
                                                        (parties[member][sk][
                                                            year
                                                        ] ?? 0) +
                                                        share * subsidy;
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        );
                    }
                });
            }
        });
        return parties;
    };

    const getPartiesTotals = (period, type, party) => {
        const parties = {};
        Object.entries(getPartiesYears(period, type, party)).forEach(
            ([partyName, subsidyTypes]) => {
                parties[partyName] = {};
                Object.entries(subsidyTypes).forEach(([st, years]) => {
                    parties[partyName][st] = sumOfValues(years);
                });
            }
        );
        return parties;
    };

    const getCoalitionMembers = (party) => {
        const electionPeriods = {};
        if (party) {
            getElectionPeriods().forEach((ep) => {
                Object.entries(ep[csvKeys.COALITIONS] ?? []).forEach(
                    ([coalition, members]) => {
                        if (party === coalition) {
                            electionPeriods[ep[csvKeys.ELECTION_PERIOD]] =
                                members;
                        }
                    }
                );
            });
        }
        return electionPeriods;
    };

    const isCoalition = (party) =>
        !!Object.keys(getCoalitionMembers(party)).length;

    const getElectionPeriodYears = (period) => {
        const { paid, est } = getAggYears(period);
        const years = Object.keys(
            getElectionPeriodData(period)[csvKeys.ESTIMATE] ? est : paid
        );
        return [Math.min(...years), Math.max(...years)];
    };

    const getExtremes = () => {
        const periods = getElectionPeriods().map(
            (ep) => ep[csvKeys.ELECTION_PERIOD] ?? 0
        );
        const firstEP = periods.length ? Math.min(...periods) : 0;
        const lastEP = periods.length ? Math.max(...periods) : 0;
        const firstYear = firstEP ? getElectionPeriodYears(firstEP)[0] : 0;
        const lastYear = lastEP ? getElectionPeriodYears(lastEP)[1] : 0;
        return { firstEP, lastEP, firstYear, lastYear };
    };

    const value = useMemo(
        () => ({
            govData,
            setGovData,
            getElectionPeriods,
            getElectionPeriodData,
            getElectionPeriodYears,
            getExtremes,
            getAggYears,
            getAggTotals,
            getPartiesYears,
            getPartiesTotals,
            getCoalitionMembers,
            isCoalition,
            loadAllElections,
        }),
        [govData]
    );

    return (
        <GovDataContext.Provider value={value}>
            {children}
        </GovDataContext.Provider>
    );
};

const useGovData = () => {
    const context = useContext(GovDataContext);

    if (context === undefined) {
        throw new Error('useGovData must be used within an GovDataContext');
    }

    return context;
};

export default useGovData;
