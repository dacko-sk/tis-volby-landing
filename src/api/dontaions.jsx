import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import {
    currencyFormat,
    dateNumericFormat,
    generateRandomString,
} from './helpers';
import { separators } from './routes';

export const settings = {
    donations: {
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
        targetColumns: {
            party: 'Strana',
            date: 'Dátum',
            entity: 'Typ',
            name: 'Meno / Názov firmy',
            address: 'Adresa',
            type: 'Typ príjmu',
            subtype: 'Typ bezodpaltného plnenia',
            amount: 'Suma',
            source: 'Zdroj',
            flag: 'Rizikový príznak',
            notes: 'Poznámka',
        },
    },
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
                            {company ? 'Firma' : 'Fyzická osoba'}
                        </Tooltip>
                    }
                    placement="right"
                    delayShow={300}
                    delayHide={150}
                >
                    <span
                        className="entity-tooltip"
                        aria-label={company ? 'Firma' : 'Fyzická osoba'}
                    >
                        {company ? '🏢' : '👨‍💼'}
                    </span>
                </OverlayTrigger>
            );
        case 'name':
            return company ? sourceColumns[4] : sourceColumns[2];
        case 'address':
            return sourceColumns[5];
        case 'type':
            return settings.donations.types[Number(sourceColumns[6])] ?? '';
        case 'subtype':
            return sourceColumns[7];
        case 'amount':
            return (
                <div className="text-end">
                    {currencyFormat(sourceColumns[8])}
                </div>
            );
        case 'source':
            return (
                <a
                    href={sourceColumns[9]}
                    title="stiahnuť"
                    target="_blank"
                    rel="noreferrer"
                >
                    🖹
                </a>
            );
        case 'flag':
            return settings.donations.flags[Number(sourceColumns[10])] ?? '';
        case 'notes':
            return sourceColumns[14];
        default:
            return null;
    }
};

export const buildApiQuery = (options) => {
    const filters = [];
    Object.entries(options).forEach(([param, value]) => {
        filters.push(`${param}=${value}`);
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
