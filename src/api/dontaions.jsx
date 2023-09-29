import { Link, useParams } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import {
    currencyFormat,
    dateNumericFormat,
    generateRandomString,
} from './helpers';
import { routes, separators } from './routes';

export const donations = {
    apiParams: [
        'o', // offset (page number - 1)
        'b', // block size
        'c', // 1=company, 0=person, unset=all
        'a_min', // min amount
        'a_max', // max amount
        't_min', // min timestamp
        't_max', // max timestamp
        't', // type
        'f', // flag
        'i', // ID / unqId
        'p', // party
        'q', // search query
        's', // sort
    ],
    settingsParams: ['v'],
    entities: ['Fyzická osoba', 'Firma'],
    entityIcons: ['👨‍💼', '🏢'],
    flags: [
        '',
        'veľký dar', // 1
        'veľká pôžička', // 2
        'vysoké bezodplatné plnenie', // 3
    ],
    parties: [
        'ALIANCIA',
        'DOBRÁ VOĽBA',
        'HLAS',
        'KDH',
        'KRESŤANSKÁ ÚNIA',
        'ĽSNS',
        'MKO',
        'MOST HÍD',
        'OĽANO',
        'PS',
        'REPUBLIKA',
        'SAS',
        'SIEŤ',
        'SME RODINA',
        'SMER',
        'SMK',
        'SNS',
        'SPOLU',
        'TEAM BRATISLAVA',
        'TEAM KRAJ NITRA',
        'ZA ĽUDÍ',
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
    aggColumns: {
        amount: 'Suma príspevkov',
        parties: 'Podporené strany',
    },
    allColumns: {
        party: 'Strana',
        date: 'Dátum',
        entity: 'Typ darcu',
        name: 'Meno / Názov firmy',
        address: 'Adresa',
        type: 'Typ príjmu',
        subtype: 'Typ plnenia',
        amount: 'Výška príspevku',
        source: 'Zdroj',
        flag: 'Rizikový príznak',
        notes: 'Poznámka',
    },
    hiddenDonorColumns: ['entity', 'name', 'address'],
    optionalColumns: ['address', 'type', 'subtype', 'source', 'notes'],
};

export const isCompany = (sourceColumns) => {
    return (
        sourceColumns[3].substr(0, 1) === 'Y' || sourceColumns[4].trim().length
    );
};

export const getDonationsColumn = (sourceColumns, targetColumn) => {
    const company = isCompany(sourceColumns);
    switch (targetColumn) {
        case 'party':
            return sourceColumns[0];
        case 'date':
            return (
                <div className="text-end text-nowrap">
                    {sourceColumns[1]
                        ? dateNumericFormat(sourceColumns[1])
                        : ''}
                </div>
            );
        case 'entity':
            return (
                <OverlayTrigger
                    overlay={
                        <Tooltip id={generateRandomString()}>
                            {donations.entities[Number(company)]}
                        </Tooltip>
                    }
                    placement="right"
                    delayShow={300}
                    delayHide={150}
                >
                    <div
                        className="text-center fs-5"
                        aria-label={donations.entities[Number(company)]}
                    >
                        {donations.entityIcons[Number(company)]}
                    </div>
                </OverlayTrigger>
            );
        case 'name':
            return sourceColumns[3] ? (
                <Link to={routes.donor(sourceColumns[3])}>
                    {company ? sourceColumns[4] : sourceColumns[2]}
                </Link>
            ) : (
                <span>{company ? sourceColumns[4] : sourceColumns[2]}</span>
            );
        case 'address':
            return sourceColumns[5];
        case 'type':
            return donations.types[Number(sourceColumns[6])] ?? '';
        case 'subtype':
            return sourceColumns[7];
        case 'amount':
            return (
                <div className="text-end text-nowrap">
                    {currencyFormat(sourceColumns[8])}
                </div>
            );
        case 'source':
            return (
                <div className="text-center">
                    <a
                        href={sourceColumns[9]}
                        className="text-decoration-none fs-4"
                        title="stiahnuť"
                        target="_blank"
                        rel="noreferrer"
                    >
                        🖹
                    </a>
                </div>
            );
        case 'flag':
            // return donations.flags[Number(sourceColumns[10])] ?? '';
            if (sourceColumns[10]) {
                const f = donations.flags[Number(sourceColumns[10])];
                return (
                    <div className="text-center">
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={generateRandomString()}>
                                    {f}
                                </Tooltip>
                            }
                            placement="right"
                            delayShow={300}
                            delayHide={150}
                        >
                            <Badge
                                bg="light"
                                pill
                                className={`flag-${sourceColumns[10]} border bg-opacity-25 fs-6`}
                            >
                                🏴
                            </Badge>
                        </OverlayTrigger>
                    </div>
                );
            }
            return null;
        case 'notes':
            return sourceColumns[14];
        default:
            return null;
    }
};

export const parseQueryOptions = () => {
    const params = useParams();
    const options = {};
    if ((params.query ?? false) && params.query.length) {
        const allowed = [...donations.apiParams, ...donations.settingsParams];
        params.query.split(separators.parts).forEach((pair) => {
            const [filter, value] = pair.split(separators.value);
            if (allowed.includes(filter)) {
                options[filter] = value;
            }
        });
    }
    return options;
};

export const buildApiQuery = (options) => {
    const filters = [];
    Object.entries(options).forEach(([param, value]) => {
        if (donations.apiParams.includes(param)) {
            filters.push(`${param}=${value}`);
        }
    });
    return filters.join('&');
};

export const buildUrlQuery = (options) => {
    const filters = [];
    Object.entries(options).forEach(([param, value]) => {
        filters.push(param + separators.value + value);
    });
    return filters.join(separators.parts);
};
