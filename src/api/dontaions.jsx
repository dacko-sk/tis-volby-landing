import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useParams } from 'react-router-dom';

import {
    currencyFormat,
    dateNumericFormat,
    generateRandomString,
} from './helpers';
import { separators } from './routes';

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
        'p', // party
        'q', // search query
        's', // sort
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
    allColumns: {
        party: 'Strana',
        date: 'Dátum',
        name: 'Meno / Názov firmy',
        entity: 'Typ',
        address: 'Adresa',
        type: 'Typ príjmu',
        subtype: 'Typ plnenia',
        amount: 'Suma',
        source: 'Zdroj',
        flag: 'Rizikový príznak',
        notes: 'Poznámka',
    },
    optionalColumns: [
        'address',
        // 'party',
        'type',
        'subtype',
        'source',
        'flag',
        'notes',
    ],
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
                <div className="text-nowrap">
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
                            {company ? 'Firma' : 'Fyzická osoba'}
                        </Tooltip>
                    }
                    placement="right"
                    delayShow={300}
                    delayHide={150}
                >
                    <div
                        className="entity-tooltip text-center fs-4"
                        aria-label={company ? 'Firma' : 'Fyzická osoba'}
                    >
                        {company ? '🏢' : '👨‍💼'}
                    </div>
                </OverlayTrigger>
            );
        case 'name':
            return company ? sourceColumns[4] : sourceColumns[2];
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
                        className="text-decoration-none fs-3"
                        title="stiahnuť"
                        target="_blank"
                        rel="noreferrer"
                    >
                        🖹
                    </a>
                </div>
            );
        case 'flag':
            return donations.flags[Number(sourceColumns[10])] ?? '';
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
        params.query.split(separators.parts).forEach((pair) => {
            const [filter, value] = pair.split(separators.value);
            options[filter] = value;
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
