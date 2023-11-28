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
    lastElection: 0,
};

export const csvKeys = {
    ELECTION_PERIOD: 'VOLEBNÉ OBDOBIE',
    VOTE_PRICE: 'CENA HLASU',
    SUBSIDY_VOTES: 'PRÍSPEVKY ZA HLASY',
    SUBSIDY_OPERATION: 'PRÍSPEVKY NA ČINNOSŤ',
    SUBSIDY_MANDATE: 'PRÍSPEVKY NA MANDÁT',
    COALITIONS: 'KOALÍCIE',
};

export const subsidyTypes = [
    csvKeys.SUBSIDY_VOTES,
    csvKeys.SUBSIDY_OPERATION,
    csvKeys.SUBSIDY_MANDATE,
];

export const subsidyColors = {
    [csvKeys.SUBSIDY_MANDATE]: colors.colorLightBlue,
    [csvKeys.SUBSIDY_OPERATION]: colors.colorDarkBlue,
    [csvKeys.SUBSIDY_VOTES]: colors.colorOrange,
};

export const processElectionPeriod = (csv) => {
    if (csv.data ?? false) {
        const ep = {};
        let currentDataSet = null;
        let currentYears = [];
        csv.data.forEach((row) => {
            switch (row[0]) {
                case csvKeys.ELECTION_PERIOD:
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
                                        members.push(column);
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
        let lastElection = 0;
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
                                    lastElection = Math.max(
                                        lastElection,
                                        data[csvKeys.ELECTION_PERIOD] ?? 0
                                    );
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
                    setGovData({ ...govData, electionPeriods, lastElection });
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
        const years = {};
        getElectionPeriods().forEach((ep) => {
            if (!period || ep[csvKeys.ELECTION_PERIOD] === period) {
                (type ? [type] : subsidyTypes).forEach((st) => {
                    let parties = [];
                    if (party) {
                        if (ep[st][party] ?? false) {
                            parties = [ep[st][party]];
                        }
                    } else {
                        parties = Object.values(ep[st]);
                    }
                    parties.forEach((p) => {
                        Object.entries(p).forEach(([year, subsidy]) => {
                            years[year] = (years[year] ?? 0) + subsidy;
                        });
                    });
                });
            }
        });
        return years;
    };

    const getAggTotals = (period, type, party) =>
        sumOfValues(getAggYears(period, type, party));

    const getPartiesYears = (period, type, party) => {
        const parties = {};
        getElectionPeriods().forEach((ep) => {
            if (!period || ep[csvKeys.ELECTION_PERIOD] === period) {
                (type ? [type] : subsidyTypes).forEach((st) => {
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
                        if (!(parties[partyName][st] ?? false)) {
                            parties[partyName][st] = {};
                        }
                        Object.entries(years).forEach(([year, subsidy]) => {
                            parties[partyName][st][year] =
                                (parties[partyName][st][year] ?? 0) + subsidy;
                        });
                    });
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

    const getElectionPeriodYears = (period) => {
        const years = Object.keys(getAggYears(period));
        return [Math.min(...years), Math.max(...years)];
    };

    const value = useMemo(
        () => ({
            govData,
            setGovData,
            getElectionPeriods,
            getElectionPeriodData,
            getElectionPeriodYears,
            getAggYears,
            getAggTotals,
            getPartiesYears,
            getPartiesTotals,
            getCoalitionMembers,
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
