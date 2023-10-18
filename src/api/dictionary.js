import { donationsColumns as dc, elections as el } from './constants';
import { getCurrentLanguage, languages } from './routes';

export const labels = {
    all: ['Zobraziť všetko', 'Show all'],
    contact: ['Kontakt', 'Contact'],
    cookies: {
        accept: ['Prijať všetky', 'Accept all'],
        about: [
            'Táto webová stránka používa cookies, aby vám priniesla čo najlepší online zážitok.',
            'This website uses cookies to bring you the best online experience.',
        ],
        optional: ['Voliteľné cookies', 'Optional Cookies'],
        reject: ['Odmietnuť všetky', 'Reject all'],
        selected: ['Potvrdiť výber', 'Accept selected'],
        settings: ['Nastavenia cookies', 'Cookies settings'],
        types: {
            analytics: ['Analytické cookies', 'Analytics'],
            functional: ['Funkčné cookies', 'Functional'],
            necessary: ['Nevyhnutné cookies', 'Necessary'],
        },
    },
    donate: ['Darujte', 'Donate'],
    donateLong: [
        'Darujte na kontrolu volieb',
        'Donate for elections monitoring',
    ],
    donations: {
        aggAmount: ['Suma príspevkov', 'Sum of donations'],
        aggFlags: [
            'Kumulatívne mimoriadne príznaky',
            'Aggregated risk indicators',
        ],
        aggParties: ['Podporené strany', 'Supported parties'],
        allDonations: ['Jednotlivé príspevky', 'Donations'],
        columns: {
            [dc.party]: ['Strana', 'Party'],
            [dc.date]: ['Dátum', 'Date'],
            [dc.entity]: ['Typ darcu', 'Donor type'],
            [dc.name]: ['Meno / Názov firmy', 'Person / Company name'],
            [dc.address]: ['Adresa', 'Address'],
            [dc.type]: ['Typ príjmu', 'Income type'],
            [dc.subtype]: ['Typ plnenia', 'Type of fulfillment'],
            [dc.amount]: ['Výška príspevku', 'Amount'],
            [dc.source]: ['Zdroj', 'Source'],
            [dc.flag]: ['Mimoriadny príznak', 'Risk indicator'],
            [dc.notes]: ['Poznámka', 'Note'],
        },
        donorInfo: ['Údaje o darcovi', 'Donor details'],
        entities: [
            ['Fyzická osoba', 'Firma'],
            ['Person', 'Company'],
        ],
        entityIcons: [['👨‍💼', '🏢']],
        filters: {
            button: ['Filtre', 'Filters'],
            from: ['Od', 'From'],
            search: ['Hľadaný výraz', 'Search query'],
            to: ['Do', 'To'],
        },
        flags: [
            [
                'žiadne',
                'veľký dar', // 1
                'veľká pôžička', // 2
                'vysoké bezodplatné plnenie', // 3
            ],
            [
                'None',
                'Large donation', // 1
                'Large loan', // 2
                'Large in-kind contributions', // 3
            ],
        ],
        search: {
            advanced: ['Podrobné vyhľadávanie', 'Advanced search'],
            noDonations: [
                'Zvoleným filtrom nevyhovujú žiadne príspevky.',
                'There are no items matching the selected filters.',
            ],
            noDonors: [
                'Hľadanému výrazu nezodpovedá žiaden donor. Skúste podrobné vyhľadávanie',
                'No donor found, please try the Advanced search',
            ],
            placeholder: [
                'Zadajte meno donora alebo názov strany…',
                'Enter donor or party name…',
            ],
            title: [
                'Vyhľadávanie v databáze donorov',
                'Search in donors database',
            ],
        },
        settings: {
            button: ['Nastavenia', 'Settings'],
            columns: ['Voliteľné stĺpce', 'Optional columns'],
            rows: ['Počet riadkov', 'Number of rows'],
        },
        types: [
            [
                '',
                'bezodplatné plnenie', // 1
                'členský príspevok', // 2
                'finančný dar', // 3
                'nepeňažný dar', // 4
                'pôžička', // 5
                'úver', // 6
                'zmluvné dojednanie', // 7
            ],
            [
                '',
                'In-kind contribution', // 1
                'Membership contribution', // 2
                'Financial donation', // 3
                'Non-financial donation', // 4
                'Loan', // 5
                'Credit', // 6
                'Contractual donation', // 7
            ],
        ],
    },
    donor: ['Donor'],
    donors: {
        navTitle: ['Databáza donorov', 'Donors'],
        pageTitle: [
            'Financovanie politických strán\na databáza donorov',
            'Political parties funding\nand donors database',
        ],
    },
    download: ['Stiahnuť', 'Download'],
    elections: {
        [el.p19]: ['Prezidentské\nvoľby 2019', 'President\nelections 2019'],
        [el.n20]: ['Parlamentné\nvoľby 2020', 'Parliamentary\nelections 2020'],
        [el.s22]: ['Samosprávne\nvoľby 2022', 'Municipal\nelections 2022'],
        [el.n23]: ['Parlamentné\nvoľby 2023', 'Parliamentary\nelections 2023'],
        title: ['Voľby', 'Elections'],
    },
    errors: {
        loading: [
            'Chyba pri načítaní dát. Prosím načítajte stránku znovu.',
            'Data loading error. Please reload the page.',
        ],
    },
    fbFeed: [
        'Pre zobrazenie facebook vlákna je potrebné prijať ukladanie Funkčných cookies v Nastaveniach cookies',
        'Please accept Functional Cookies in Cookies Settings in order to show Facebook feed',
    ],
    followUs: ['Sledujte nás', 'Follow us'],
    home: {
        navTitle: ['Úvod', 'Home'],
        pageTitle: [
            'Monitoring\nvolebných kampaní',
            'Monitoring of\nelection campaigns',
        ],
    },
    learnMore: ['Zistiť viac', 'Learn more'],
    news: {
        latest: ['Najnovšie aktuality', 'Latest News'],
        navTitle: ['Aktuality', 'News'],
        noData: ['Neboli nájdené žiadne články.', 'No articles found.'],
        pageTitle: ['Aktuality', 'News\n(Slovak only)'],
    },
    newsletter: {
        title: ['Newsletter'],
        subscribe: ['Prihlásiť sa na newsletter', 'Subscribe to Newsletter'],
    },
    privacy: ['Ochrana súkromia', 'Privacy Policy'],
    readMore: ['Čítať ďalej…', 'Read more…'],
    tis: [
        'Transparency International Slovensko',
        'Transparency International Slovakia',
    ],
    search: {
        label: ['Vyhľadávanie', 'Search'],
        results: [
            'Výsledky vyhľadávania výrazu',
            'Search results for the query',
        ],
    },
    showMore: ['Zobraziť viac', 'Show more'],
    sponsors: ['Donori projektu', 'Project donors'],
    supportTis: ['Podporte Transparency', 'Support Transparency'],
    usefulInfo: ['Užitočné informácie', 'Useful information'],
    webDev: ['Webové riešenie', 'Web development'],
};

export const t = (label) => {
    if (Array.isArray(label)) {
        const fallback = label[0] ?? '';
        if (getCurrentLanguage() === languages.en) {
            return label[1] ?? fallback;
        }
        return fallback;
    }
    return label;
};
