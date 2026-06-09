import fs from 'fs';
import Papa from 'papaparse';

const accountsCsv = fs.readFileSync('public/euro2024/csv/online/accounts.csv', 'utf8');
const metaCsv = fs.readFileSync('public/euro2024/csv/online/Meta.csv', 'utf8');

const accountsData = Papa.parse(accountsCsv, { header: true, dynamicTyping: false, skipEmptyLines: true }).data;
const metaData = Papa.parse(metaCsv, { header: true, dynamicTyping: false, skipEmptyLines: true }).data;

const parties = {};
accountsData.forEach((row) => {
    parties[row['Skratka']] = {
        'FB Účty': row['FB Účty'] ?? false ? row['FB Účty'].replaceAll(' ', '').split(',') : [],
    };
});

const filterPoliticAccountsEuro24 = (parties) => (account) => {
    const pageId = account['Page ID'];
    if (pageId ?? false) {
        return !!Object.values(parties).find((party) => party['FB Účty']?.includes(pageId));
    }
    return false;
};

const metaAds = {
    '1721887200': metaData.filter(filterPoliticAccountsEuro24(parties))
};

const profiles = {};
Object.values(metaAds).forEach((week) => {
    week.forEach((profile) => {
        const pageId = profile['Page ID'];
        if (!(profiles[pageId] ?? false)) {
            profiles[pageId] = {
                name: profile['Page name'],
                outgoing: 0,
                amount: 0,
            };
        }
        profiles[pageId].outgoing += Number(profile['Amount spent (EUR)']) * 1.2;
        profiles[pageId].amount += Number(profile['Number of ads in Library']);
    });
});

console.log("Profiles count:", Object.keys(profiles).length);

const findPartyForFbAccount = (accountId) => {
    const found = Object.entries(parties).find(([, party]) =>
        party['FB Účty']?.includes(accountId)
    );
    return found ? found[0] : null;
};

const spendingAggr = {};
Object.entries(profiles).forEach(([pageId, pageProps]) => {
    const parentPartyName = findPartyForFbAccount(pageId);
    if (parentPartyName) {
        if (spendingAggr[parentPartyName] ?? false) {
            spendingAggr[parentPartyName]['o'] += pageProps.outgoing;
        } else {
            spendingAggr[parentPartyName] = {
                name: parentPartyName,
                ['o']: pageProps.outgoing,
            };
        }
    }
});

console.log("spendingAggr count:", Object.keys(spendingAggr).length);
console.log("spendingAggr data:", spendingAggr);
