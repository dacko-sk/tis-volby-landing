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

export const errors = {
    loading: 'Chyba pri načítaní dát. Prosím načítajte stránku znovu.',
};

export const labels = {
    donate: 'Darujte',
    donateLong: 'Darujte na kontrolu volieb',
    donors: {
        search: {
            advanced: 'Podrobné vyhľadávanie',
            placeholder: 'Zadajte meno donora alebo názov strany',
            title: 'Vyhľadávanie v databáze donorov',
        },
    },
    tis: 'Transparency International Slovensko',
    search: 'Vyhľadávanie',
    showMore: 'Zobraziť viac',
    websiteTitle: 'Voľby',
};

export const settings = {
    donateUrl: 'https://transparency.sk/volby',
    donations: {
        allowedColumns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 14],
        headers: [
            'Strana', // 0: Party
            'Dátum', // 1: Date
            'Meno a priezvisko', // 2: Person name
            'ID', // 3: ID
            'Firma', // 4: Company name
            'Adresa', // 5: Location
            'Typ', // 6: Type
            'Typ bezodpaltného plnenia', // 7: Subtype
            'Výška príspevku', // 8: Amount
            'Zdroj', // 9: Link
            'Príznak', // 10: Flag
            'Príznak-finančný dar (kumulatívne)', // 11: Flag 1 cumulative
            'Príznak-pôžička (kumulatívne)', // 12: Flag 2 cumulative
            'Príznak-bezodplatné plnenie (kumulatívne)', // 13: Flag 3 cumulative
            'Poznámka', // 14: Note
        ],
        flags: [
            '',
            'veľký dar', // 1
            'veľká pôžička', // 2
            'vysoké bezodplatné plnenie', // 3
        ],
        types: [
            '',
            'bezodplatné plnenie', // 1
            'členský príspevok', // 2
            'finančný dar', // 3
            'nepeňažný dar', // 4
            'pôžička', // 5
            'úver', // 6
            'zmluvné dojednanie', // 7
        ],
    },
};

export const constants = {
    categories,
    colors,
    errors,
    labels,
    settings,
};

export default constants;
