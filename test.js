import fs from 'fs';
import Papa from 'papaparse';

const accountsCsv = fs.readFileSync('public/euro2024/csv/online/accounts.csv', 'utf8');
const metaCsv = fs.readFileSync('public/euro2024/csv/online/Meta.csv', 'utf8');

const accountsData = Papa.parse(accountsCsv, { header: true, dynamicTyping: false, skipEmptyLines: true }).data;
const metaData = Papa.parse(metaCsv, { header: true, dynamicTyping: false, skipEmptyLines: true }).data;

const parties = {};
accountsData.forEach((row) => {
    parties[row['Skratka']] = {
        'Plný názov strany': row['Plný názov strany'] ?? null,
        'FB Účty': row['FB Účty'] ?? false
            ? row['FB Účty'].replaceAll(' ', '').split(',')
            : [],
    };
});

const filterPoliticAccountsEuro24 = (parties) => (account) => {
    const pageId = account['Page ID'];
    if (pageId ?? false) {
        return !!Object.values(parties).find((party) =>
            party['FB Účty']?.includes(pageId)
        );
    }
    return false;
};

const filtered = metaData.filter(filterPoliticAccountsEuro24(parties));
console.log('Filtered Meta count:', filtered.length);
if (filtered.length === 0) {
    console.log(metaData[0]['Page ID'], 'vs', parties['SMER']['FB Účty']);
}
