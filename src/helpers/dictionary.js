import {
    donationsColumns as dc,
    elections as el,
    transactionsColumns as tc,
} from './constants';
import { getCurrentLanguage, languages } from './languages';

import { csvKeys as gst } from '../hooks/GovData';

export const labels = {
    accounts: {
        back: ['Späť na všetky účty', 'Return to all accounts'],
        columns: {
            [tc.ta]: ['Transparentný účet', 'Transparent Account'],
            [tc.type]: ['Voľby', 'Elections'],
            [tc.year]: ['Volebný rok', 'Elections year'],
            [tc.accountName]: ['Názov účtu', 'Account Name'],
            [tc.date]: ['Dátum', 'Date'],
            [tc.amount]: ['Suma', 'Amount'],
            [tc.message]: ['Informácia o platbe', 'Message'],
            [tc.txType]: ['Druh platby', 'Transaction Type'],
            [tc.ks]: ['KS', 'Constant Symbol'],
            [tc.vs]: ['VS', 'VS'],
            [tc.ss]: ['ŠS', 'SS'],
            [tc.note]: ['Poznámka', 'Note'],
        },
        info: ['Detail účtu', 'Account details'],
        navTitle: ['Transparentné účty', 'Transparent accounts'],
        navTitleShort: ['Účty', 'Accounts'],
        noTransactions: [
            'Zvoleným filtrom nevyhovujú žiadne platby.',
            'There are no payments matching the selected filters.',
        ],
        pageTitle: [
            'Archív\ntransparentných účtov',
            'Transparentaccounts archive',
        ],
        paymentType: ['Typ obratu', 'Payment type'],
        paymentTypes: [
            ['Príjmy', 'Výdavky'],
            ['Incoming', 'Outgoing'],
        ],
        transactionsAmount: ['Počet platieb', 'Payments amount'],
        totalSpendingDisclaimer: [
            'Súčet všetkých výdavkov na transparentnom účte vedenom pre dané voľby',
            'Sum of all outgoing payments on the transparent account for the elections',
        ],
    },
    all: ['Zobraziť všetko', 'Show all'],
    charts: {
        amount: ['Suma', 'Amount'],
        demographyTitle: [
            'Demografické rozloženie darcov',
            'Demographics structure of donors',
        ],
        gendersTitle: [
            'Výška darov podľa pohlavia',
            'Donations amount by gender',
        ],
        gendersUniqueTitle: [
            'Počet darcov podľa pohlavia',
            'Donors amount by gender',
        ],
        incoming: ['Príjmy', 'Incomes'],
        navTitle: ['Grafy', 'Charts'],
        pageTitle: ['Štatistiky\na grafy', 'Stats\n& Charts'],
        outgoing: ['Výdavky', 'Expenses'],
        regionsDisclaimer: [
            'Súčet príspevkov od individuálnych darcov v kraji rokoch 2002 - 2023.',
            'Sum of donations from individual donors in the region in years 2002 - 2023.',
        ],
        regionsTitle: [
            'Výška darov podľa krajov',
            'Sum of donations in each region',
        ],
        regionsUniqueTitle: [
            'Unikátni darcovia v krajoch',
            'Unique donors in each region',
        ],
        showMore: ['Ďalšie grafy a štatistiky', 'More charts & statistics'],
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
            [dc.address]: ['Miesto pobytu', 'Address'],
            [dc.type]: ['Typ príjmu', 'Income type'],
            [dc.subtype]: ['Typ plnenia', 'Type of fulfillment'],
            [dc.amount]: ['Výška príspevku', 'Amount'],
            [dc.source]: ['Zdroj', 'Source'],
            [dc.notes]: ['Poznámka', 'Note'],
            [dc.gender]: ['Pohlavie', 'Gender'],
            [dc.region]: ['Kraj', 'Region'],
            [dc.flag]: ['Mimoriadny príznak', 'Risk indicator'],
        },
        credits: ['Úvery a pôžičky', 'Credits & loans'],
        disclaimer: [
            'Zdroj: Výročné správy politických strán 2002 - 2023',
            'Source: Annual reports of political parties 2002 - 2023',
        ],
        disclaimerNoCredits: [
            'Zdroj: Výročné správy politických strán 2002 - 2023, neobsahuje úvery a pôžičky',
            'Source: Annual reports of political parties 2002 - 2023, excludes credits & loans',
        ],
        donorInfo: ['Údaje o darcovi', 'Donor details'],
        dac: ['Dary, úvery a pôžičky', 'Donations, credits & loans'],
        donations: ['Dary', 'Donations'],
        entities: [
            ['Fyzická osoba', 'Firma'],
            ['Person', 'Company'],
        ],
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
        navTitle: ['Knižnica darcov', 'Donors database'],
        navTitleShort: ['Darcovia', 'Donors'],
        noData: [
            'Pre túto stranu sme doposiaľ nespracovali dáta o darcoch z výročných správ.',
            `Donors data haven't been analysed for this party yet.`,
        ],
        pageTitle: [
            'Vyhľadávanie\nv knižnici darcov',
            'Search\nin donors database',
        ],
        search: {
            advanced: ['Podrobné vyhľadávanie', 'Advanced search'],
            noDonations: [
                'Zvoleným filtrom nevyhovujú žiadne príspevky.',
                'There are no items matching the selected filters.',
            ],
            noDonors: [
                'Hľadanému výrazu nezodpovedá žiaden darca. Skúste podrobné vyhľadávanie',
                'No donor found, please try the Advanced search',
            ],
            placeholder: [
                'Zadajte meno darcu alebo názov strany…',
                'Enter donor or party name…',
            ],
            title: [
                'Vyhľadávanie v knižnici darcov',
                'Search in donors database',
            ],
        },
        settings: {
            button: ['Nastavenia', 'Settings'],
            columns: ['Voliteľné stĺpce', 'Optional columns'],
            rows: ['Počet riadkov', 'Number of rows'],
        },
        top10donors: [
            'Top 10 darcov (iba dary a členské)',
            'Top 10 donors (donations & membership contributions only)',
        ],
        top10sponsors: [
            'Top 10 sponzorov (vrátane pôžičiek)',
            'Top 10 sponsors (includes loans)',
        ],
        topParties: [
            'Rebríček politických strán podľa výšky neštátnych príjmov',
            'Political parties ranking by non-government incomes',
        ],
        topPartiesDisclaimer: [
            'Súčet príspevkov od individuálnych darcov v rokoch 2002 - 2023.',
            'Sum of donations from individual donors in the years 2002 - 2023.',
        ],
        totalDisclaimer: [
            'Súčet príspevkov od individuálnych darcov všetkých strán v rokoch 2002 - 2023.',
            'Sum of donations from individual donors to all political parties in the years 2002 - 2023.',
        ],
        totalDisclaimerParty: [
            'Súčet príspevkov od individuálnych darcov strany v rokoch 2002 - 2023.',
            'Sum of donations from individual donors of political party in the years 2002 - 2023.',
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
        uniqueDonors: [
            'Počet unikátnych darcov a veriteľov',
            'Amount of unique donors & creditors',
        ],
        uniqueDonorsDisclaimer: [
            'Unikátni individuálni darcovia a veriteľia všetkých strán v rokoch 2002 - 2023.',
            'Unique individual donors & creditors of political parties in the years 2002 - 2023.',
        ],
    },
    donor: {
        amount: ['Suma príspevkov', 'Sum of donations'],
        flags: [
            'Kumulatívne mimoriadne príznaky',
            'Cummulative risk indicators',
        ],
        pageTitle: ['Darca', 'Donor'],
        parties: ['Podporené strany', 'Supported parties'],
    },
    download: ['Stiahnuť', 'Download'],
    elections: {
        [el.p19]: ['Prezidentské\nvoľby 2019', 'President\nelections 2019'],
        [el.n20]: ['Parlamentné\nvoľby 2020', 'Parliamentary\nelections 2020'],
        [el.s22]: ['Samosprávne\nvoľby 2022', 'Municipal\nelections 2022'],
        [el.n23]: ['Parlamentné\nvoľby 2023', 'Parliamentary\nelections 2023'],
        [el.e24]: ['Európske\nvoľby 2024', 'European\nelections 2024'],
        [el.p24]: ['Prezidentské\nvoľby 2024', 'President\nelections 2024'],
        over: ['Voľby sa skončili', 'Elections ended'],
        timeTillstart: ['Zostávajúci čas do volieb', 'Time to elections start'],
        timeTillend: [
            'Zostávajúci čas do konca volieb',
            'Time to elections end',
        ],
        title: ['Voľby', 'Elections'],
        types: {
            e: ['Európske voľby', 'European elections'],
            n: ['Parlamentné voľby', 'Parliamentary elections'],
            p: ['Prezidentské voľby', 'President elections'],
            r: ['Samosprávne voľby', 'Municipal elections'],
        },
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
        learnMore: [
            'Zistiť viac o financovaní',
            'Find out more about subsidies',
        ],
        navTitle: ['Ďalšie témy', 'More topics'],
        overview: ['Prehľad', 'Overview'],
        pageTitle: [
            'Financovanie\npolitických strán',
            'Political\nparties funding',
        ],
        partiesTotal: [
            'Top %i politických strán podľa príjmov',
            'Top %i political parties by subsidies',
        ],
        partiesTotalAll: [
            'Rebríček politických strán podľa príjmov',
            'Political parties ranking by subsidies',
        ],
        partiesTotalDisclaimer: [
            'Príjmy politických strán zo súkromných a štátnych zdrojov od %i. do %i. volebného obdobia (%i - %i). Za aktuálne volebné obdobie uvádzame odhad budúcich štátnych príspevkov.',
            'Incomes of political parties from donations and government subsidies between election periods no. %i & %i (%i - %i). In current election period we show estimate of future government subsidies.',
        ],
        sourcesDisclaimer: [
            'Pomer príjmov všetkých politických strán medzi súkromnými a štátnymi zdrojmi od %i. do %i. volebného obdobia (%i - %i). Za aktuálne volebné obdobie uvádzame odhad budúcich štátnych príspevkov.',
            'All parties incomes distribution between dontations and government subsidies between election periods no. %i & %i (%i - %i). In current election period we show estimate of future government subsidies.',
        ],
        sourcesDisclaimerParty: [
            'Pomer príjmov medzi súkromnými a štátnymi zdrojmi strany od %i. do %i. volebného obdobia (%i - %i). Za aktuálne volebné obdobie uvádzame odhad budúcich štátnych príspevkov.',
            'Party incomes distribution between dontations and government subsidies between election periods no. %i & %i (%i - %i). In current election period we show estimate of future government subsidies.',
        ],
        sourcesTitle: ['Zdroje financovania', 'Funding sources'],
    },
    gender: {
        M: ['Muž', 'Male'],
        F: ['Žena', 'Female'],
    },
    genders: {
        M: ['Muži', 'Male'],
        F: ['Ženy', 'Female'],
    },
    government: {
        [gst.SUBSIDY_MANDATE]: {
            short: ['Mandát', 'Mandate'],
            long: ['Príspevky na mandát', 'Mandate subsidy'],
            est: ['Mandát (odhad)', 'Mandate (estimate)'],
            estLong: [
                'Mandát (odhad budúcich príspevkov)',
                'Mandate (estimate of future subsidies)',
            ],
        },
        [gst.SUBSIDY_OPERATION]: {
            short: ['Činnosť', 'Operations'],
            long: ['Príspevky na činnosť', 'Operations subsidy'],
            est: ['Činnosť (odhad)', 'Operations (estimate)'],
            estLong: [
                'Činnosť (odhad budúcich príspevkov)',
                'Operations (estimate of future subsidies)',
            ],
        },
        [gst.SUBSIDY_VOTES]: {
            short: ['Hlasy', 'Votes'],
            long: ['Príspevky za hlasy', 'Subsidy for votes'],
            est: ['Hlasy (odhad)', 'Votes (estimate)'],
            estLong: [
                'Hlasy (odhad budúcich príspevkov)',
                'Votes (estimate of future subsidies)',
            ],
        },
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
        epTotalDisclaimerParty: [
            'Súčet príspevkov vyplatených strane vo volebnom období.',
            'Sum of subsidies paid to the party in the election period.',
        ],
        estimate: ['Št. príspevky (odhad)', 'Gov. subsidies (estimate)'],
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
            'Top %i politických strán financovaných zo štátnych príspevkov',
            'Top %i political parties funded by government subsidies',
        ],
        partiesTotalAll: [
            'Rebríček politických strán podľa výšky štátnych príspevkov',
            'Ranking of political parties by government subsidies',
        ],
        partiesTotalDisclaimer: [
            'Súhrnný objem príspevkov zo štátneho rozpočtu vyplatených jednotlivým politickým stranám od %i. do %i. volebného obdobia (%i - %i). Za aktuálne volebné obdobie uvádzame odhad budúcich štátnych príspevkov.',
            'Aggregated amount of subsidies paid by the government to the particular political party between election periods no. %i & %i (%i - %i). In current election period we show estimate of future government subsidies.',
        ],
        partiesTotalPeriod: [
            'Rozdelenie príspevkov medzi politické strany',
            'Distribution of subsidies between political parties',
        ],
        partiesTotalPeriodDisclaimer: [
            'Súhrnný objem príspevkov vyplatených jednotlivým politickým stranám za celé volebné obdobie.',
            'Aggregated amount of subsidies paid to the particular political party in the election period.',
        ],
        subsidyTypes: ['Druhy príspevkov', 'Types of subsidies'],
        totalDisclaimer: [
            'Súčet štátnych príspevkov vyplatených všetkým politickým stranám od %i. do %i. volebného obdobia.',
            'Sum of government subsidies paid to all political parties between election periods no. %i & %i.',
        ],
        totalDisclaimerParty: [
            'Súčet štátnych príspevkov vyplatených politickej strane od %i. do %i. volebného obdobia.',
            'Sum of government subsidies paid to the political party between election periods no. %i & %i.',
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
        yearsDisclaimer: [
            'Súčet štátnych príspevkov vyplácaných všetkým politickým stranám v jednotlivých kalendárnych rokoch volebného obdobia (odhad na základe počtu mesiacov volebného obdobia v danom roku).',
            'Sum of government subsidies paid to all political parties in the particular year of the election period (estimate based on amount of months in the election period).',
        ],
        yearsDisclaimerAll: [
            'Súčet štátnych príspevkov vyplatených všetkým politickým stranám v jednotlivých kalendárnych rokoch od %i. do %i. volebného obdobia. Za aktuálne volebné obdobie uvádzame odhad budúcich štátnych príspevkov.',
            'Sum of government subsidies paid to all political parties in the particular year between election periods no. %i & %i. In current election period we show estimate of future government subsidies.',
        ],
        yearsDisclaimerParty: [
            'Súčet štátnych príspevkov vyplatených politickej strane v jednotlivých kalendárnych rokoch volebného obdobia.',
            'Sum of government subsidies paid to the party in the particular year of the election period.',
        ],
        yearsDisclaimerPartyAll: [
            'Súčet štátnych príspevkov vyplatených politickej strane v jednotlivých kalendárnych rokoch od %i. do %i. volebného obdobia. Za aktuálne volebné obdobie uvádzame odhad budúcich štátnych príspevkov.',
            'Sum of government subsidies paid to the party in the particular year between election periods no. %i & %i. In current election period we show estimate of future government subsidies.',
        ],
        yearsTitle: ['Príspevky po rokoch', 'Subsidies by years'],
    },
    home: {
        navTitle: ['Financovanie politiky', 'Political finance'],
        navTitleShort: ['Financovanie', 'Financing'],
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
    parties: {
        allDisclaimer: [
            'Abecedný zoznam strán a koalícií, pre ktoré sú dostupné dáta o financovaní zo štátneho rozpočtu alebo máme spracované dáta o darcoch v knižnici darcov.',
            'Parties & coalitions with available data of government subsidies or with processed donor database. The list is sorted alphabetically.',
        ],
        coalition: ['Koalícia', 'Coalition'],
        coalitionMembers: [
            'Zloženie koalície v %i. volebnom období',
            'Coalition members in election period no. %i',
        ],
        navTitle: ['Zoznam strán', 'Parties list'],
        pageTitle: ['Strany a koalície', 'Parties & coalitions'],
        party: ['Strana', 'Party'],
    },
    privacy: ['Ochrana súkromia', 'Privacy Policy'],
    readMore: ['Čítať ďalej…', 'Read more…'],
    regions: {
        BA: ['Brativlavský', 'Bratislava'],
        BB: ['Banskobystrický', 'Banská Bystrica'],
        KE: ['Košický', 'Košice'],
        NR: ['Nitriansky', 'Nitra'],
        PO: ['Prešovský', 'Prešov'],
        TN: ['Trenčiansky', 'Trenčín'],
        TT: ['Trnavský', 'Trnava'],
        ZA: ['Žilinský', 'Žilina'],
    },
    search: {
        label: ['Vyhľadávanie', 'Search'],
        results: [
            'Výsledky vyhľadávania výrazu',
            'Search results for the query',
        ],
    },
    showMore: ['Zobraziť viac', 'Show more'],
    sites: {
        root: ['Financovanie\npolitiky', 'Political\nfinance'],
        european: ['Európske\nvoľby', 'European\nelections'],
        national: ['Parlamentné\nvoľby', 'Parliament\nelections'],
        president: ['Prezidentské\nvoľby', 'President\nelections'],
        regional: ['Samosprávne\nvoľby', 'Municipal\nelections'],
    },
    sitesTitle: [
        'Ktorú oblasť politiky chcete preskúmať?',
        'Which political topic are you interested in?',
    ],
    sponsors: ['Donori projektu', 'Project donors'],
    supportTis: ['Podporte Transparency', 'Support Transparency'],
    tis: [
        'Transparency International Slovensko',
        'Transparency International Slovakia',
    ],
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
