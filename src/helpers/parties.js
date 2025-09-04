import { isNumeric } from './helpers';
import { separators } from './routes';

const parties = {
    ALIANCIA: {
        accounts: { e24: 'aefea5d295', n23: 'aae53e5f23', r22: 5193282528 },
        aliases: [
            'SPOLUPATRIČNOSŤ',
            'SZÖVETSÉG - ALIANCIA',
            'MAĎARSKÁ ALIANCIA',
            'MKO',
        ],
    },
    APS: {
        accounts: { e24: 2602594351, n23: 2602594351 },
        aliases: ['ALTERNATÍVA PRE SLOVENSKO'],
        fullName: 'ALTERNATÍVA PRE SLOVENSKO',
    },
    DEMOKRATI: {
        accounts: { e24: 2946166297, n23: 5200777415 },
        fullName: 'DEMOKRATI',
    },
    'DOBRÁ VOĽBA': {
        accounts: { n20: '2020-dv', r22: 5193555063 },
        aliases: ['DOBRA VOLBA'],
    },
    DS: {
        accounts: { n20: '2020-ds' },
        fullName: 'DEMOKRATICKÁ STRANA',
    },
    HLAS: {
        accounts: { e24: 5213487943, n23: 5201155706, r22: 5192332474 },
        fullName: 'HLAS',
    },
    KARMA: {
        accounts: { n23: '1db9f729c5' },
    },
    KDH: {
        accounts: {
            e24: 5213419510,
            n20: '2020-kdh',
            n23: 5202509350,
            r22: 5191733399,
        },
        fullName: 'KRESŤANSKO DEMOKRATICKÉ HNUTIE',
    },
    KÚ: {
        accounts: { e24: 5213785166, n23: 5204564329 },
        aliases: ['KRESŤANSKÁ ÚNIA'],
        fullName: 'KRESŤANSKÁ ÚNIA',
    },
    KSS: {
        accounts: { e24: 5214083457, n23: 5173959220, r22: 5193974137 },
        fullName: 'KOMUNISTICKÁ STRANA SLOVENSKA',
    },
    'ĽS-HZDS': { aliases: ['LS-HZDS', 'LS - HZDS', 'HZDS'] },
    ĽSNS: {
        accounts: {
            e24: 5213275473,
            n20: '2020-lsns',
            n23: 5200763670,
            r22: 5187339874,
        },
        aliases: [
            'LSNS',
            'KOTLEBOVCI - ĽS NAŠE SLOVENSKO',
            'KOTLEBA - ĽS NAŠE SLOVENSKO',
        ],
    },
    MF: {
        accounts: { n23: '5917b3b1b7' },
        fullName: 'MAĎARSKÉ FÓRUM',
    },
    'MOST-HÍD': {
        accounts: { n20: '2020-mh', n23: '504c1be5d6' },
        aliases: ['MOST HID', 'MOST - HID', 'MOST - HÍD'],
    },
    MKO: {},
    MKS: {
        accounts: { n20: '2020-mks' },
    },
    MYSLOVENSKO: {
        accounts: { e24: 5214774274, n23: 5204179906 },
    },
    NK: {
        accounts: { r22: 5190807640 },
        fullName: 'NÁRODNÁ KOALÍCIA - NEZÁVISLÍ KANDIDÁTI',
    },
    ODS: { accounts: { r22: 5190700640 } },
    PS: {
        accounts: {
            e24: 2947164568,
            n20: '2020-ps',
            n23: 2942147187,
            r22: 5192786986,
        },
        fullName: 'PROGRESÍVNE SLOVENSKO',
    },
    'PS A SPOLU': { aliases: ['KOALÍCIA PROGRESÍVNE SLOVENSKO A SPOLU'] },
    'PIRÁTSKA STRANA': {
        accounts: { e24: 2202814976, n23: 2401881936 },
        aliases: ['PIRÁTSKA STRANA - SLOVENSKO'],
    },
    PRINCÍP: {
        accounts: { n23: 5186956723, r22: 5186956723 },
    },
    REPUBLIKA: {
        accounts: { e24: 4917050358, n23: 4786046155, r22: 4570401656 },
    },
    SAS: {
        accounts: {
            e24: 5212248959,
            n20: '2020-sas',
            n23: 5199496092,
            r22: 5178313461,
        },
        aliases: ['SLOBODA A SOLIDARITA'],
    },
    SDKÚ: {
        accounts: { n23: 2943155496 },
        aliases: ['SDKU', 'SDKÚ-DS', 'SDKU-DS', 'SDKÚ - DS', 'SDKU - DS'],
    },
    SHO: {
        accounts: { n23: 2502606052 },
        aliases: ['SLOVENSKÉ HNUTIE OBRODY'],
        fullName: 'SLOVENSKÉ HNUTIE OBRODY',
    },
    SIEŤ: { aliases: ['#SIEŤ'] },
    SLOVENSKO: {
        accounts: {
            e24: 5213087085,
            n20: '2020-olano',
            n23: 5198311615,
            r22: 5188927504,
        },
        aliases: ['OĽANO', 'OĽANO - NOVA'],
        fullName: 'SLOVENSKO (OĽANO)',
    },
    'SME RODINA': {
        accounts: { n20: '2020-sr', n23: 5200310540, r22: 5189770449 },
        aliases: ['SME RODINA - BORIS KOLLÁR'],
    },
    SMER: {
        accounts: {
            e24: 5212781753,
            n20: '2020-smer',
            n23: 5200055607,
            r22: 5191226290,
        },
        aliases: ['SMER - SD'],
    },
    SMK: { aliases: ['SMK - MKP'] },
    SNS: {
        accounts: { e24: 5212432254, n20: '2020-sns', n23: 5201011948 },
    },
    SOCIALISTI: {
        accounts: { e24: 2949169530, r22: 5194064389 },
        aliases: ['SOCIALISTI.SK'],
    },
    SOM: {
        accounts: { r22: 5195176737 },
        fullName: 'STRANA OBCÍ A MIEST - SOM SLOVENSKO',
    },
    SOS: {
        accounts: { e24: 5215267565, n23: 5203740781 },
        aliases: ['SPOLOČNE OBČANIA SLOVENSKA'],
        fullName: 'SPOLOČNE OBČANIA SLOVENSKA',
    },
    SOSK: {
        accounts: { e24: 4942326053 },
    },
    SP: {
        accounts: { e24: 2802819121 },
        aliases: ['SLOVENSKÝ PATRIOT'],
        fullName: ['SLOVENSKÝ PATRIOT'],
    },
    SPOLU: {
        accounts: { n20: '2020-spolu', r22: 5188974466 },
    },
    SPRAVODLIVOSŤ: {
        accounts: { n23: 2945151763 },
    },
    SRDCE: {
        accounts: { e24: 5213928091, n23: 5204184430 },
    },
    'TEAM BRATISLAVA': { accounts: { r22: 5191923301 } },
    'TEAM KRAJ NITRA': { accounts: { r22: 5194268541 } },
    VLASŤ: {
        accounts: { n20: '2020-vlast' },
    },
    VB: {
        accounts: { n23: 5204130889 },
        aliases: ['VLASTENECKÝ BLOK'],
        fullName: 'VLASTENECKÝ BLOK',
    },
    VOLT: {
        accounts: { e24: 2947168454 },
        aliases: ['VOLT SLOVENSKO'],
    },
    'ZA ĽUDÍ': {
        accounts: { n20: '2020-zl', n23: 2945150584, r22: 5190694287 },
        aliases: ['ZA LUDI'],
    },
    ZR: {
        accounts: { e24: 5214182586 },
        aliases: ['ZDRAVÝ ROZUM'],
        fullName: 'ZDRAVÝ ROZUM',
    },
};

export const partyAliases = (party) => {
    const upperParty = party.toUpperCase();
    const foundParty = Object.entries(parties).find(
        ([key, value]) =>
            key === upperParty || (value.aliases ?? []).includes(upperParty)
    );
    return foundParty
        ? [foundParty[0], ...(foundParty[1].aliases ?? [])]
        : [party];
};

export const partyAlias = (party) => (party ? partyAliases(party)[0] : '');

export const partyFullName = (party) =>
    parties[partyAlias(party)]?.fullName ?? party;

export const findPartyByAccount = (account) => {
    const accId = isNumeric(account) ? Number(account) : account;
    return (
        Object.entries(parties).find(
            ([, value]) =>
                value.accounts && Object.values(value.accounts).includes(accId)
        )?.[0] ?? null
    );
};

export const partyAccounts = (party) =>
    Array.from(
        new Set(Object.values(parties[partyAlias(party)]?.accounts ?? {}))
    ).join(separators.array);

export const hasAccounts = (party) => !!parties[partyAlias(party)]?.accounts;

export const partiesWithAccounts = Object.keys(parties).filter(hasAccounts);
