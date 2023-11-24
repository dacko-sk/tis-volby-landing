import { donationsColumns as dc, elections as el } from './constants';
import { getCurrentLanguage, languages } from './routes';

import { csvKeys as gst } from '../context/GovDataContext';

export const labels = {
    accounts: {
        navTitle: ['Transparentné účty', 'Transparent accounts'],
        navTitleShort: ['Účty', 'Accounts'],
        pageTitle: [
            'Archív\ntransparentných účtov',
            'Transparentaccounts archive',
        ],
    },
    all: ['Zobraziť všetko', 'Show all'],
    charts: {
        amount: ['Suma', 'Amount'],
        incoming: ['Príjmy', 'Incomes'],
        outgoing: ['Výdavky', 'Expenses'],
        sum: ['Spolu', 'Total'],
    },
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
    donate: {
        buttonShort: ['Darujte', 'Donate'],
        buttonLong: [
            'Darujte na kontrolu volieb',
            'Donate for elections monitoring',
        ],
        modalTitle: [
            'Nenechajme voľby bez kontroly!',
            `Don't let the elections without watch!`,
        ],
        modalText: [
            'Darujte už od 20 €, aby sme ustrážili férovosť volieb.\nĎakujeme.',
            'Donate from 20 € to support elections transparency.\nThank you.',
        ],
    },
    donations: {
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
        disclaimer: [
            'Zdroj: Výročné správy politických strán 2002 - 2022',
            'Source: Annual reports of political parties 2002 - 2022',
        ],
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
        flagsAggregated: [
            [
                'žiadne',
                'veľké dary súhrnne', // 1
                'veľké pôžičky súhrnne', // 2
                'vysoké súhrnné bezodplatné plnenie', // 3
            ],
            [
                'None',
                'Cummulative large donations', // 1
                'Cummulative large loans', // 2
                'Cummulative large in-kind contributionss', // 3
            ],
        ],
        learnMore: ['Zistiť viac o darcoch', 'Find out more about donors'],
        navTitle: ['Databáza donorov', 'Donors database'],
        navTitleShort: ['Donori', 'Donors'],
        pageTitle: [
            'Vyhľadávanie\nv databáze donorov',
            'Search\nin donors database',
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
        title: ['Darcovia a veritelia', 'Donors & creditors'],
        top10donors: [
            'Top 10 individuálnych darcov politických strán (2002-2022)',
            'Top 10 individual political party donors (2002 - 2022)',
        ],
        top10individual: [
            'Top 10 individuálnych veriteľov a darcov politických strán (2002 - 2022)',
            'Top 10 individual political party donors & creditors (2002 - 2022)',
        ],
        totalDisclaimer: [
            'Súčet príspevkov od individuálnych darcov všetkých strán v rokoch 2002 - 2023.',
            'Sum of donations from individual donors to all political parties in the years 2002 - 2023.',
        ],
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
        typesPlural: [
            [
                '',
                'bezodplatné plnenia', // 1
                'členské príspevky', // 2
                'finančné dary', // 3
                'nepeňažné dary', // 4
                'pôžičky', // 5
                'úvery', // 6
                'zmluvné dojednania', // 7
            ],
            [
                '',
                'In-kind contributions', // 1
                'Membership contributions', // 2
                'Financial donations', // 3
                'Non-financial donations', // 4
                'Loans', // 5
                'Credits', // 6
                'Contractual donations', // 7
            ],
        ],
    },
    donor: {
        amount: ['Suma príspevkov', 'Sum of donations'],
        flags: [
            'Kumulatívne mimoriadne príznaky',
            'Cummulative risk indicators',
        ],
        pageTitle: ['Donor'],
        parties: ['Podporené strany', 'Supported parties'],
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
    funding: {
        navTitle: ['Financovanie', 'Funding'],
        overview: ['Prehľad', 'Overview'],
        pageTitle: [
            'Financovanie\npolitických strán',
            'Political\nparties funding',
        ],
        sourcesDisclaimer: [
            'Pomer financovania politických strán medzi súkromným a štátnym financovaním v rokoch 2002 - 2023',
            'Political parties funding distribution between dontations and government subsidies in years 2002 - 2023.',
        ],
        sourcesTitle: ['Zdroje financovania', 'Funding sources'],
    },
    government: {
        [gst.SUBSIDY_MANDATE]: ['Príspevky na mandát', 'Mandate subsidy'],
        [gst.SUBSIDY_OPERATION]: ['Príspevky na činnosť', 'Operations subsidy'],
        [gst.SUBSIDY_VOTES]: ['Príspevky za hlasy', 'Subsidy for votes'],
        electionPeriod: [
            'Volebné obdobie č. %i (%i - %i)',
            'Election period no. %i (%i - %i)',
        ],
        electionPeriods: ['Volebné obdobia', 'Election periods'],
        epTotal: ['Suma príspevkov', 'Sum of subsidies'],
        epTotalDisclaimer: [
            'Súčet príspevkov vyplatených všetkým stranám vo volebnom období.',
            'Sum of subsidies paid to all parties in the election period.',
        ],
        learnMore: [
            'Zistiť viac o štátnych príspevkoch',
            'Find out more about government subsidies',
        ],
        navTitle: ['Štátne príspevky', 'Government subsidies'],
        navTitleShort: ['Štát', 'Government'],
        pageTitle: [
            'Financovanie\nzo štátnych príspevkov',
            'Government subsidies',
        ],
        partiesTotal: [
            'Rozdelenie príspevkov medzi politické strany',
            'Distribution of subsidies between political parties',
        ],
        partiesTotalDisclaimer: [
            'Súhrnný objem príspevkov pre jednotlivé politické strany za celé volebné obdobie',
            'Amount of subsidies in the election period for the particular political party',
        ],
        subsidyTypes: ['Druhy príspevkov', 'Types of subsidies'],
        totalDisclaimer: [
            'Súčet štátnych príspevkov vyplatených všetkým politickým stranám od 3. do 8. volebného obdobia.',
            'Sum of government subsidies paid to all political parties between 3rd & 8th election periods.',
        ],
        votePrice: ['Cena jedného hlasu', 'Single vote price'],
        votePriceDisclaimer: [
            '1 % z priemernej mesačnej mzdy za rok %i',
            '1 % of average monthly salary in year %i.',
        ],
        votePriceDisclaimerOld: [
            '60 SKK / 1,99 € za 1 hlas (do roku 2006 alebo konca 3. volebného obdobia)',
            '60 SKK / €1.99 per 1 vote (until 2006 or end of 3rd election period)',
        ],
        yearsAllDisclaimer: [
            'Súčet štátnych príspevkov vyplatených všetkým politickým stranám v jednotlivých kalendárnych rokoch od 3. do 8. volebného obdobia.',
            'Sum of government subsidies paid to all political parties in the particular year between 3rd & 8th election periods.',
        ],
        yearsDisclaimer: [
            'Súčet štátnych príspevkov vyplatených všetkým politickým stranám v jednotlivých kalendárnych rokoch volebného obdobia.',
            'Sum of government subsidies paid to all political parties in the particular year of the election period.',
        ],
        yearsTitle: ['Príspevky po rokoch', 'Subsidies by years'],
    },
    home: {
        navTitle: ['Úvod', 'Home'],
        pageTitle: [
            'Monitoring volebných\nkampaní a financovania strán',
            'Monitoring of elections campaigns and political parties funding',
        ],
    },
    learnMore: ['Zistiť viac', 'Learn more'],
    lastUpdate: ['Naposledy aktualizované', 'Last updated on'],
    news: {
        latest: ['Najnovšie aktuality', 'Latest News (Slovak only)'],
        navTitle: ['Aktuality', 'News'],
        noData: ['Neboli nájdené žiadne články.', 'No articles found.'],
        pageTitle: ['Aktuality', 'News\n(Slovak only)'],
    },
    newsletter: {
        title: ['Newsletter'],
        subscribe: ['Prihlásiť sa na newsletter', 'Subscribe to Newsletter'],
    },
    party: {
        pageTitle: ['Strana', 'Party'],
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

export const t = (label, replacements) => {
    let tl = label;
    if (Array.isArray(label)) {
        tl = label[0] ?? '';
        if (getCurrentLanguage() === languages.en) {
            tl = label[1] ?? tl;
        }
    } else if (labels[label] ?? false) {
        return t(labels[label], replacements);
    }
    if (Array.isArray(replacements)) {
        // Use a regular expression to match placeholders (%s or %i)
        tl = tl.replace(/%[dfis]/g, (match) => {
            // Replace %s with the next string from the array
            // Return the placeholder if no replacement is available
            return replacements.length > 0 ? replacements.shift() : match;
        });
    }
    return tl;
};
