import { createContext, useContext, useMemo, useState } from 'react';
import { usePapaParse } from 'react-papaparse';

// import all csv files from the govfunds folder via webpack
const govFiles = require.context('../../public/csv/govfunds', false, /\.csv$/);
const govFile = (key) => govFiles(key);

const initialState = {
    error: null,
    electionPeriods: {},
};

export const csvKeys = {
    VOTE_PRICE: 'CENA HLASU',
    SUBSIDY_VOTES: 'PRÍSPEVKY ZA HLASY',
    SUBSIDY_OPERATION: 'PRÍSPEVKY NA ČINNOSŤ',
    SUBSIDY_MANDATE: 'PRÍSPEVKY NA MANDÁT',
    COALITIONS: 'KOALÍCIE',
};

export const processElectionPeriod = (csv) => {
    if (csv.data ?? false) {
        const ep = {};
        let currentDataSet = null;
        let currentYears = [];
        csv.data.forEach((row) => {
            switch (row[0]) {
                case csvKeys.VOTE_PRICE:
                    ep[csvKeys.VOTE_PRICE] = row[1];
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
                        const partyName = row[0];
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

    const getTotals = (party) => {
        const years = {};
        Object.values(govData.electionPeriods).forEach((ep) => {
            [
                csvKeys.SUBSIDY_MANDATE,
                csvKeys.SUBSIDY_OPERATION,
                csvKeys.SUBSIDY_VOTES,
            ].forEach((type) => {
                let parties;
                if (party) {
                    parties = ep[type][party] ?? [];
                } else {
                    parties = Object.values(ep[type]);
                }
                parties.forEach((party) => {
                    Object.entries(party).forEach(([year, subsidy]) => {
                        years[year] = (years[year] ?? 0) + subsidy;
                    });
                });
            });
        });
        return years;
    };

    const value = useMemo(
        () => ({
            govData,
            setGovData,
            loadAllElections,
            getTotals,
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
