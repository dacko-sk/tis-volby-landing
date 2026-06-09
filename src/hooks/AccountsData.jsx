import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import { useLocation } from 'react-router-dom';

import { contains, compareStr } from '../helpers/helpers';
import { getActiveSubsite } from '../helpers/languages';
import { parties, partyAlias } from '../helpers/parties';

// 1. Static aggregated CSV files imports
import aggregatedEuro24 from '../../public/euro2024/csv/transparent/aggregation_no_returns.csv';
import aggregatedPrezident24 from '../../public/prezident2024/csv/transparent/aggregation_no_returns.csv';
import aggregatedParlament23 from '../../public/parlament2023/csv/transparent/final_aggr_no_returns.csv';
import aggregatedSamosprava22 from '../../public/samosprava2022/csv/aggregation_no_returns_v2.csv';

// 2. Webpack require.context folders for accounts
const euro24AccountsFolder = require.context(
    '../../public/euro2024/csv/transparent/accounts',
    false,
    /\.csv$/
);
const prezident24AccountsFolder = require.context(
    '../../public/prezident2024/csv/transparent/accounts',
    false,
    /\.csv$/
);
const parlament23AccountsFolder = require.context(
    '../../public/parlament2023/csv/transparent/accounts',
    false,
    /\.csv$/
);
const samosprava22AccountsFolder = require.context(
    '../../public/samosprava2022/csv/accounts',
    false,
    /\.csv$/
);

export const municipalTypes = {
    regional: 'regional',
    local: 'local',
};

export const finalReportsTypes = {
    [municipalTypes.regional]: 'krajské',
    [municipalTypes.local]: 'miestne',
};

export const finalReportsKeys = {
    link: 'link',
    name: 'name',
    region: 'region',
    title: 'title',
};

export const aggregatedKeys = {
    account: 'url',
    balance: 'balance',
    incoming: 'sum_incoming',
    name: 'name',
    num_incoming: 'num_incoming',
    num_outgoing: 'num_outgoing',
    num_unique_donors: 'num_unique_donors',
    outgoing: 'sum_outgoing',
    timestamp: 'timestamp',
};

export const csvAggregatedKeys = {
    account: 'url',
    balance: 'balance',
    incoming: 'incoming',
    name: 'name',
    num_incoming: 'num_incoming',
    num_outgoing: 'num_outgoing',
    num_unique_donors: 'num_unique_donors',
    outgoing: 'outgoing',
    timestamp: 'timestamp',
};

export const accountKeys = {
    account_name: 'account_name',
    date: 'date',
    amount: 'amount',
    message: 'message',
    tx_type: 'tx_type',
    vs: 'vs',
    ss: 'ss',
};

export const tempExtraAccountKeys = {
    account: 'url',
    name: 'name',
    municipality: 'samosprava',
    party: 'PS',
    partyAccount: 'stranicky_ucet',
    partySupport: 'strana',
    region: 'label',
    result: 'vysledok',
    type: 'typ_volieb',
};

export const electedStatusKeys = {
    success: 'zvolený',
    failure: 'nezvolený',
};

const regions22 = {
    BB: 'Banskobystrický kraj',
    BA: 'Bratislavský kraj',
    KE: 'Košický kraj',
    NR: 'Nitriansky kraj',
    PO: 'Prešovský kraj',
    TN: 'Trenčiansky kraj',
    TT: 'Trnavský kraj',
    ZA: 'Žilinský kraj',
};

const replacements22 = {
    ...regions22,
    'Banskobystrický samosprávny kraj': 'BBSK',
    'Bratislavský samosprávny kraj': 'BSK',
    'Košický samosprávny kraj': 'KSK',
    'Nitriansky samosprávny kraj': 'NSK',
    'Prešovský samosprávny kraj': 'PSK',
    'Trenčiansky samosprávny kraj': 'TSK',
    'Trnavský samosprávny kraj': 'TTSK',
    'Žilinský samosprávny kraj': 'ŽSK',
    Banskobystrický: 'Banskobystrický samosprávny kraj',
    Bratislavský: 'Bratislavský samosprávny kraj',
    Košický: 'Košický samosprávny kraj',
    Nitriansky: 'Nitriansky samosprávny kraj',
    Prešovský: 'Prešovský samosprávny kraj',
    Trenčiansky: 'Trenčiansky samosprávny kraj',
    Trnavský: 'Trnavský samosprávny kraj',
    Žilinský: 'Žilinský samosprávny kraj',
};

const substitute22 = (value) => replacements22[value] ?? value;

const accountFile = (filename, subsite = getActiveSubsite()) => {
    if (subsite === 'samosprava2026') {
        return `https://raw.githubusercontent.com/matusv/samospravne-volby-2026/refs/heads/main/accounts/${encodeURIComponent(filename)}`;
    }
    let folder = null;
    if (subsite === 'euro2024') folder = euro24AccountsFolder;
    else if (subsite === 'prezident2024') folder = prezident24AccountsFolder;
    else if (subsite === 'parlament2023') folder = parlament23AccountsFolder;
    else if (subsite === 'samosprava2022') folder = samosprava22AccountsFolder;

    if (folder) {
        let found = null;
        folder.keys().some((key) => {
            if (key.endsWith(filename)) {
                found = key;
                return true;
            }
            return false;
        });
        return found ? folder(found) : null;
    }
    return null;
};

export const getFileName = (accountData, subsite = getActiveSubsite()) => {
    if (!accountData) return null;
    const name = accountData.name;
    const url = accountData.url;
    if (!name || !url) return null;

    const match = url.match(/.*(?:SK\d{12})?(\d{10}).*/);
    if (match && match.length > 1) {
        return accountFile(`${name} ${match[1]}.csv`, subsite);
    }
    if (url.length > 9) {
        const last10 = url.substr(-10);
        return accountFile(`${name} ${last10}.csv`, subsite);
    }
    return null;
};

export const processAccountsData = (data, subsite) => {
    if (!data || !data.data) return data;
    const pd = data;

    if (subsite === 'samosprava2026') {
        let lastUpdate = 1705266940;
        pd.data.forEach((row, index) => {
            lastUpdate = Math.max(lastUpdate, row.timestamp ?? 0);

            // trim certain columns
            [tempExtraAccountKeys.account, tempExtraAccountKeys.name].forEach(
                (column) => {
                    pd.data[index][column] = (row[column] ?? '').trim();
                }
            );

            // fix errors in account numbers
            if (
                contains(
                    pd.data[index][tempExtraAccountKeys.account],
                    'transparentneucty.sk/?1/#/'
                )
            ) {
                pd.data[index][tempExtraAccountKeys.account] = pd.data[index][
                    tempExtraAccountKeys.account
                ].replace('/?1/#/', '/#/');
            }

            // parse numbers
            pd.data[index].sum_incoming = row.sum_incoming ?? 0;
            pd.data[index].sum_outgoing = Math.abs(row.sum_outgoing ?? 0);
            pd.data[index].incoming = row.sum_incoming ?? 0;
            pd.data[index].outgoing = Math.abs(row.sum_outgoing ?? 0);
            pd.data[index].balance = row.balance ?? 0;
            pd.data[index].num_incoming = row.num_incoming ?? 0;
            pd.data[index].num_outgoing = row.num_outgoing ?? 0;
            pd.data[index].num_unique_donors = row.num_unique_donors ?? 0;

            // properties expected by 2022/2026 components
            const parties2026 = [
                'Hlas - sociálna demokracia',
                'Kresťanskodemokratické hnutie',
                'Hnutie Slovensko',
                'Progresívne Slovensko',
                'Republika',
                'Sloboda a Solidarita',
                'Smer - SD',
                'Demokrati',
                'Maďarská aliancia',
                'Team Bratislava',
                'Tím Kraj Nitra',
                'Pirátska strana Slovensko',
                'Dunaj',
            ];
            pd.data[index].isParty = parties2026.includes(
                pd.data[index][tempExtraAccountKeys.name]
            );
            const metadata2026 = {
                'Dana Čahojová': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava',
                },
                'Matúš Vallo': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava',
                },
                'Martin Winkler': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava',
                },
                'Zuzana Šubová': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava',
                },
                'Juraj Droba': {
                    label: 'BA',
                    typ_volieb: 'krajské',
                    samosprava: 'Bratislavský kraj',
                },
                'Jaroslav Polaček': {
                    label: 'KE',
                    typ_volieb: 'miestne',
                    samosprava: 'Košice',
                },
                'Ladislav Lörinc': {
                    label: 'KE',
                    typ_volieb: 'miestne',
                    samosprava: 'Košice',
                },
                'Martin Mudrák': {
                    label: 'KE',
                    typ_volieb: 'miestne',
                    samosprava: 'Košice',
                },
                'Marián Porvažník': {
                    label: 'KE',
                    typ_volieb: 'krajské',
                    samosprava: 'Košický kraj',
                },
                'Igor Šimko': {
                    label: 'KE',
                    typ_volieb: 'krajské',
                    samosprava: 'Košický kraj',
                },
                'Lucia Gurbáľová': {
                    label: 'KE',
                    typ_volieb: 'krajské',
                    samosprava: 'Košický kraj',
                },
                'Peter Cibulka': {
                    label: 'ZA',
                    typ_volieb: 'miestne',
                    samosprava: 'Žilina',
                },
                'Peter Fiabáne': {
                    label: 'ZA',
                    typ_volieb: 'miestne',
                    samosprava: 'Žilina',
                },
                'Diana Javorčíková': {
                    label: 'BB',
                    typ_volieb: 'miestne',
                    samosprava: 'Banská Bystrica',
                },
                'Matúš Molitoris': {
                    label: 'BB',
                    typ_volieb: 'miestne',
                    samosprava: 'Banská Bystrica',
                },
                'Ondrej Lunter': {
                    label: 'BB',
                    typ_volieb: 'krajské',
                    samosprava: 'Banskobystrický kraj',
                },
                'Roman Malatinec': {
                    label: 'BB',
                    typ_volieb: 'krajské',
                    samosprava: 'Banskobystrický kraj',
                },
                'Rastislav Mochacký': {
                    label: 'PO',
                    typ_volieb: 'miestne',
                    samosprava: 'Prešov',
                },
                'František Oľha': {
                    label: 'PO',
                    typ_volieb: 'miestne',
                    samosprava: 'Prešov',
                },
                'Milan Majerský': {
                    label: 'PO',
                    typ_volieb: 'krajské',
                    samosprava: 'Prešovský kraj',
                },
                'Samuel Migaľ': {
                    label: 'PO',
                    typ_volieb: 'krajské',
                    samosprava: 'Prešovský kraj',
                },
                'Branislav Baroš': {
                    label: 'TT',
                    typ_volieb: 'miestne',
                    samosprava: 'Trnava',
                },
                'Eva Nemčovská': {
                    label: 'TT',
                    typ_volieb: 'miestne',
                    samosprava: 'Trnava',
                },
                'Marek Hattas': {
                    label: 'NR',
                    typ_volieb: 'miestne',
                    samosprava: 'Nitra',
                },
                'Igor Kršiak': {
                    label: 'NR',
                    typ_volieb: 'miestne',
                    samosprava: 'Nitra',
                },
                'Henrich Varga': {
                    label: 'NR',
                    typ_volieb: 'krajské',
                    samosprava: 'Nitriansky kraj',
                },
                'Ján Forgáč': {
                    label: 'TN',
                    typ_volieb: 'miestne',
                    samosprava: 'Trenčín',
                },
                'Natália Svítková': {
                    label: 'TN',
                    typ_volieb: 'krajské',
                    samosprava: 'Trenčiansky kraj',
                },
                'Igor Petrovčík': {
                    label: 'KE',
                    typ_volieb: 'miestne',
                    samosprava: 'Košice - Staré Mesto',
                },
                'Igor Holéczy': {
                    label: 'KE',
                    typ_volieb: 'miestne',
                    samosprava: 'Košice - Staré Mesto',
                },
                'Rudolf Kusý': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava - Nové Mesto',
                },
                'Martin Chren': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava - Ružinov',
                },
                'Zuzana Aufrichtová': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava - Staré Mesto',
                },
                'Ľuboš Krajčír': {
                    label: 'BA',
                    typ_volieb: 'miestne',
                    samosprava: 'Bratislava - Devínka Nová Ves',
                },
            };

            const meta =
                metadata2026[pd.data[index][tempExtraAccountKeys.name]] || {};

            pd.data[index].isTransparent = !!row[tempExtraAccountKeys.account];
            pd.data[index].isRegional = (meta.typ_volieb ?? '').includes(
                finalReportsTypes[municipalTypes.regional]
            );
            pd.data[index].isElected =
                !pd.data[index].isParty &&
                row[tempExtraAccountKeys.result] === electedStatusKeys.success;
            pd.data[index].samosprava = meta.samosprava ?? '';
            pd.data[index].municipalityShortName = substitute22(
                pd.data[index].samosprava
            );
            pd.data[index].label = meta.label || '';
        });
        return { ...pd, lastUpdate, loaded: true };
    }

    if (subsite === 'samosprava2022') {
        let lastUpdate = 1669068712;
        pd.data.forEach((row, index) => {
            lastUpdate = Math.max(lastUpdate, row.timestamp ?? 0);

            // trim certain columns
            [
                tempExtraAccountKeys.account,
                tempExtraAccountKeys.name,
                tempExtraAccountKeys.municipality,
                tempExtraAccountKeys.type,
            ].forEach((column) => {
                pd.data[index][column] = (row[column] ?? '').trim();
            });

            // fix errors in account numbers
            if (
                contains(
                    pd.data[index][tempExtraAccountKeys.account],
                    'transparentneucty.sk/?1/#/'
                )
            ) {
                pd.data[index][tempExtraAccountKeys.account] = pd.data[index][
                    tempExtraAccountKeys.account
                ].replace('/?1/#/', '/#/');
            }

            // helper properties
            pd.data[index].isParty =
                row[tempExtraAccountKeys.region] === tempExtraAccountKeys.party;
            pd.data[index].isTransparent = !!row[tempExtraAccountKeys.account];
            pd.data[index].isRegional = (
                row[tempExtraAccountKeys.type] ?? ''
            ).includes(finalReportsTypes[municipalTypes.regional]);
            pd.data[index].isElected =
                !pd.data[index].isParty &&
                row[tempExtraAccountKeys.result] === electedStatusKeys.success;

            // additional names
            pd.data[index].municipalityShortName =
                substitute22(
                    pd.data[index][tempExtraAccountKeys.municipality]
                ) || '…';

            // parse numbers
            pd.data[index].sum_incoming = row.sum_incoming ?? 0;
            pd.data[index].sum_outgoing = Math.abs(row.sum_outgoing ?? 0);
            pd.data[index].balance = row.balance ?? 0;
            pd.data[index].num_incoming = row.num_incoming ?? 0;
            pd.data[index].num_outgoing = row.num_outgoing ?? 0;
            pd.data[index].num_unique_donors = row.num_unique_donors ?? 0;

            // special exceptions for certain candidates
            if (pd.data[index][tempExtraAccountKeys.name] === 'Rudolf Kusý') {
                const extra =
                    99731.89 -
                    17672.69 +
                    35000 +
                    40000 +
                    30000 +
                    50000 +
                    30000 +
                    25000;
                pd.data[index].sum_incoming += extra;
                pd.data[index].sum_outgoing += extra;
                pd.data[index].duplicateExpenses = extra;
                pd.data[index].num_incoming += 7;
                pd.data[index].num_outgoing += 7;
                pd.data[index].num_unique_donors += 3;
            }
        });
        return { ...pd, lastUpdate };
    }

    if (subsite === 'parlament2023') {
        let lastUpdate = 1669068712;
        pd.data.forEach((row, index) => {
            lastUpdate = Math.max(lastUpdate, row.timestamp ?? 0);

            // trim columns
            [tempExtraAccountKeys.account, tempExtraAccountKeys.name].forEach(
                (column) => {
                    pd.data[index][column] = (row[column] ?? '').trim();
                }
            );

            // fix errors in account numbers
            if (
                contains(
                    pd.data[index][tempExtraAccountKeys.account],
                    'transparentneucty.sk/?1/#/'
                )
            ) {
                pd.data[index][tempExtraAccountKeys.account] = pd.data[index][
                    tempExtraAccountKeys.account
                ].replace('/?1/#/', '/#/');
            }

            // parse numbers
            pd.data[index].incoming = row.incoming ?? 0;
            pd.data[index].outgoing = Math.abs(row.outgoing ?? 0);
            pd.data[index].sum_incoming = row.incoming ?? 0;
            pd.data[index].sum_outgoing = Math.abs(row.outgoing ?? 0);
            pd.data[index].balance = row.balance ?? 0;
            pd.data[index].num_incoming = row.num_incoming ?? 0;
            pd.data[index].num_outgoing = row.num_outgoing ?? 0;
            pd.data[index].num_unique_donors = row.num_unique_donors ?? 0;

            // copy full name & slug from account key as default
            pd.data[index] = {
                ...pd.data[index],
                fbName: pd.data[index][tempExtraAccountKeys.name],
                fullName: pd.data[index][tempExtraAccountKeys.name],
                slug: pd.data[index][tempExtraAccountKeys.name],
                share: 0,
            };

            // merge data with party config
            const alias = partyAlias(pd.data[index][tempExtraAccountKeys.name]);
            if (alias && parties[alias]) {
                pd.data[index] = {
                    ...pd.data[index],
                    ...parties[alias],
                };
            }
        });
        return { ...pd, lastUpdate };
    }

    // Default for euro2024 and prezident2024
    let lastUpdate = 1705266940;
    pd.data.forEach((row, index) => {
        lastUpdate = Math.max(lastUpdate, row.timestamp ?? 0);

        // trim certain columns
        [tempExtraAccountKeys.account, tempExtraAccountKeys.name].forEach(
            (column) => {
                pd.data[index][column] = (row[column] ?? '').trim();
            }
        );

        // fix errors in account numbers
        if (
            contains(
                pd.data[index][tempExtraAccountKeys.account],
                'transparentneucty.sk/?1/#/'
            )
        ) {
            pd.data[index][tempExtraAccountKeys.account] = pd.data[index][
                tempExtraAccountKeys.account
            ].replace('/?1/#/', '/#/');
        }

        // parse numbers
        pd.data[index].sum_incoming = row.sum_incoming ?? 0;
        pd.data[index].sum_outgoing = Math.abs(row.sum_outgoing ?? 0);

        pd.data[index].incoming = row.sum_incoming ?? 0;
        pd.data[index].outgoing = Math.abs(row.sum_outgoing ?? 0);

        pd.data[index].balance = row.balance ?? 0;
        pd.data[index].num_incoming = row.num_incoming ?? 0;
        pd.data[index].num_outgoing = row.num_outgoing ?? 0;
        pd.data[index].num_unique_donors = row.num_unique_donors ?? 0;
    });

    return {
        ...pd,
        lastUpdate,
        loaded: true,
    };
};

export const findByProperty = (accountsData, property, value) => {
    if (accountsData.data ?? false) {
        return accountsData.data.find((row) => row[property] === value) ?? null;
    }
    return null;
};

export const findRow = (csvData, name, mun) => {
    let matchedRow = null;
    if (csvData?.data) {
        csvData.data.some((row) => {
            if (
                (compareStr(mun, row[tempExtraAccountKeys.municipality]) ||
                    compareStr(mun, row.municipalityShortName)) &&
                compareStr(name, row[tempExtraAccountKeys.name])
            ) {
                matchedRow = row;
                return true;
            }
            return false;
        });
    }
    return matchedRow;
};

export const buildParserConfig = (processCallback, storeDataCallback) => {
    return {
        worker: false, // local files
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
            const data =
                typeof processCallback === 'function'
                    ? processCallback(results)
                    : results;
            storeDataCallback(data);
        },
    };
};

const initialState = {
    lastUpdate: 0,
    loaded: false,
};

const AccountsDataContext = createContext(initialState);

export const AccountsDataProvider = function ({ children }) {
    const [accountsData, setAccountsData] = useState(initialState);
    const { readRemoteFile } = usePapaParse();
    const location = useLocation();

    const activeSubsite = getActiveSubsite(location.pathname);

    useEffect(() => {
        let fileToLoad = null;
        let baseDate = 1705266940;

        if (activeSubsite === 'samosprava2026') {
            fileToLoad =
                'https://raw.githubusercontent.com/matusv/samospravne-volby-2026/refs/heads/main/aggregation_no_returns.csv';
            baseDate = 1705266940;
        } else if (activeSubsite === 'euro2024') {
            fileToLoad = aggregatedEuro24;
            baseDate = 1705266940;
        } else if (activeSubsite === 'prezident2024') {
            fileToLoad = aggregatedPrezident24;
            baseDate = 1705266940;
        } else if (activeSubsite === 'parlament2023') {
            fileToLoad = aggregatedParlament23;
            baseDate = 1669068712;
        } else if (activeSubsite === 'samosprava2022') {
            fileToLoad = aggregatedSamosprava22;
            baseDate = 1669068712;
        }

        if (fileToLoad) {
            setAccountsData({ lastUpdate: baseDate, loaded: false });
            readRemoteFile(
                fileToLoad,
                buildParserConfig(
                    (results) => processAccountsData(results, activeSubsite),
                    (data) => {
                        setAccountsData({
                            ...data,
                            loaded: true,
                        });
                    }
                )
            );
        } else {
            setAccountsData({ lastUpdate: 0, loaded: false });
        }
    }, [activeSubsite]);

    // Selectors
    const getAllAccountsNames = () =>
        accountsData.loaded
            ? accountsData.data.map((row) => row.name ?? null)
            : null;

    const getPartyAccountData = (name) =>
        accountsData.loaded
            ? (findByProperty(accountsData, 'name', name) ?? false)
            : null;

    const allTransparentCandidatesNames = () =>
        accountsData.loaded
            ? accountsData.data.map((row) => row.name ?? null)
            : null;

    const candidateAccountData = (name) =>
        accountsData.loaded
            ? (findByProperty(accountsData, 'name', name) ?? false)
            : null;

    const findPartyByFbName = (fbName) =>
        findByProperty(accountsData, 'fbName', fbName);

    const findPartyByWpTags = (tags) => {
        let party = null;
        if (accountsData.data) {
            tags.some((tag) => {
                party = findByProperty(accountsData, 'tag', tag);
                if (party) return true;
                return false;
            });
        }
        return party;
    };

    const findInCsvData = (name, mun) => findRow(accountsData, name, mun);

    const value = useMemo(
        () => ({
            accountsData,
            setAccountsData,
            csvData: accountsData,
            setCsvData: setAccountsData,
            allAccountsNames: getAllAccountsNames,
            getPartyAccountData,
            allTransparentCandidatesNames: allTransparentCandidatesNames,
            candidateAccountData,
            findPartyByFbName,
            findPartyByWpTags,
            findInCsvData,
        }),
        [accountsData]
    );

    return (
        <AccountsDataContext.Provider value={value}>
            {children}
        </AccountsDataContext.Provider>
    );
};

export const useAccountsData = () => {
    const context = useContext(AccountsDataContext);
    if (context === undefined) {
        throw new Error(
            'useAccountsData must be used within an AccountsDataProvider'
        );
    }
    return context;
};

// Export useData compatibility hook pointing to the same context
export const useData = () => {
    const context = useContext(AccountsDataContext);
    if (context === undefined) {
        throw new Error('useData must be used within an AccountsDataProvider');
    }
    return context;
};

export default useAccountsData;
