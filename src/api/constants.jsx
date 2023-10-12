export const categories = {
    news22: 858,
    news23: 877,
    newsGlobal: 875,
};

export const colorLightBlue = '#2bace2';
export const colorDarkBlue = '#1b335f';
export const colorOrange = '#f06c50';
export const colorGrey = '#e9f2f9';

export const colors = {
    colorLightBlue,
    colorDarkBlue,
    colorOrange,
    colorGrey,
};

export const icons = {
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
};

export const errors = {
    loading: 'Chyba pri načítaní dát. Prosím načítajte stránku znovu.',
};

export const labels = {
    all: 'Zobraziť všetko',
    donate: 'Darujte',
    donateLong: 'Darujte na kontrolu volieb',
    donations: {
        aggFlags: 'Kumulatívne rizikové príznaky',
        allDonations: 'Jednotlivé príspevky',
        donorInfo: 'Údaje o darcovi',
        filters: {
            button: 'Filtre',
            from: 'Od',
            search: 'Hľadaný výraz',
            to: 'Do',
        },
        search: {
            advanced: 'Podrobné vyhľadávanie',
            noDonations: 'Zvoleným filtrom nevyhovujú žiadne príspevky.',
            noDonors:
                'Hľadanému výrazu nezodpovedá žiaden donor. Skúste podrobné vyhľadávanie',
            placeholder: 'Zadajte meno donora alebo názov strany',
            title: 'Vyhľadávanie v databáze donorov',
        },
        settings: {
            button: 'Nastavenia',
            columns: 'Voliteľné stĺpce',
            rows: 'Počet riadkov',
        },
    },
    news: {
        noData: 'Neboli nájdené žiadne články.',
    },
    tis: 'Transparency International Slovensko',
    search: 'Vyhľadávanie',
    showMore: 'Zobraziť viac',
    websiteTitle: 'Voľby',
};

export const settings = {
    donateUrl: 'https://transparency.sk/volby',
};

export const constants = {
    categories,
    colors,
    errors,
    icons,
    labels,
    settings,
};

export default constants;
