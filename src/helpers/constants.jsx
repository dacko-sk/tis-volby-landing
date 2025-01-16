import iconF from '../../public/img/icons/96money.png';
import iconE from '../../public/img/icons/96eu.png';
import iconN from '../../public/img/icons/96national.png';
import iconP from '../../public/img/icons/96president.png';
import iconR from '../../public/img/icons/96regional.png';

export const colorLightBlue = '#2bace2';
export const colorLightBlueDs = '#b9c6cc';
export const colorDarkBlue = '#1b335f';
export const colorDarkBlueDs = '#79869d';
export const colorOrange = '#f06c50';
export const colorOrangeDs = '#a9a4a4';
export const colorGrey = '#e9f2f9';

export const colors = {
    colorLightBlue,
    colorDarkBlue,
    colorOrange,
    colorLightBlueDs,
    colorDarkBlueDs,
    colorOrangeDs,
    colorGrey,
};

export const donationsColumns = {
    party: 'party',
    date: 'date',
    entity: 'entity',
    name: 'name',
    address: 'address',
    type: 'type',
    subtype: 'subtype',
    amount: 'amount',
    source: 'source',
    notes: 'notes',
    gender: 'gender',
    region: 'region',
    flag: 'flag',
};
export const transactionsColumns = {
    id: 'id', // 0
    ta: 'ta', // 1
    elections: 'elections', // 2
    year: 'year', // 3
    accountName: 'accountName', // 4
    date: 'date', // 5
    amount: 'amount', // 6
    currency: 'currency', // 7
    message: 'message', // 8
    txType: 'txType', // 9
    ks: 'ks', // 10
    vs: 'vs', // 11
    ss: 'ss', // 12
    note: 'note', // 13
};

export const elections = {
    e24: 'e24',
    p24: 'p24',
    n23: 'n23',
    s22: 's22',
    n20: 'n20',
    p19: 'p19',
};

export const icons = {
    // svg
    info: {
        alt: 'Info:',
        path: (
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        ),
    },
    warning: {
        alt: 'Upozornenie:',
        path: (
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        ),
    },
    // emoji
    entities: ['👨‍💼', '🏢'],
    payments: ['+', '-'],
    // img
    elections: { f: iconF, e: iconE, n: iconN, p: iconP, r: iconR },
    // css
};

export const links = {
    [elections.p19]: '/prezident2019/',
    [elections.n20]: '/parlament2020/',
    [elections.s22]: '/samosprava2022/',
    [elections.n23]: '/parlament2023/',
    [elections.e24]: '/euro2024/',
    [elections.p24]: '/prezident2024/',
    donateUrl: 'https://transparency.sk/volby',
};
