import { Link, useParams } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';

import { donationsColumns as dc } from './constants';
import { labels, t } from './dictionary';
import {
    currencyFormat,
    dateNumericFormat,
    generateRandomString,
} from './helpers';
import { routes, separators } from './routes';

export const apiParams = [
    'o', // offset (page number - 1)
    'b', // block size
    'c', // 1=company, 0=person, unset=all
    'a', // amount
    'd', // date (timestamp)
    't', // type
    'f', // flag
    'i', // ID / unqId
    'p', // party
    'q', // search query
    's', // sort
];
export const settingsParams = [
    'v', // visible optional columns
];

export const hiddenDonorColumns = [dc.entity, dc.name, dc.address];
export const optionalColumns = [dc.address, dc.subtype, dc.source, dc.notes];
export const blocksizes = [10, 25, 50, 100];
export const defaultSort = `${separators.space}date`;

export const columnLabel = (key) =>
    Object.keys(labels.donations.columns).includes(key)
        ? t(labels.donations.columns[key])
        : '';
export const typeLabel = (i, plural) =>
    t(plural ? labels.donations.typesPlural : labels.donations.types)[i] ?? '';
export const flagLabel = (i) => t(labels.donations.flags)[i] ?? '';
export const entityLabel = (i) => t(labels.donations.entities)[i] ?? '';
export const entityIcon = (i) => t(labels.donations.entityIcons)[i] ?? '';

export const amountSettings = {
    min: 0,
    max: 1500000,
    step: 100,
};

export const allParties = {
    ALIANCIA: 'ALIANCIA',
    'DOBRA VOLBA': 'DOBRÁ VOĽBA',
    HLAS: 'HLAS',
    KDH: 'KDH',
    'Kresťanská Únia': 'KRESŤANSKÁ ÚNIA',
    LSNS: 'ĽSNS',
    MKO: 'MKO',
    'MOST HID': 'MOST HÍD',
    OĽANO: 'OĽANO',
    PS: 'PS',
    REPUBLIKA: 'REPUBLIKA',
    SAS: 'SAS',
    Sieť: 'SIEŤ',
    'SME RODINA': 'SME RODINA',
    SMER: 'SMER',
    SMK: 'SMK',
    SNS: 'SNS',
    SPOLU: 'SPOLU',
    'TEAM BRATISLAVA': 'TEAM BRATISLAVA',
    'TEAM KRAJ NITRA': 'TEAM KRAJ NITRA',
    'ZA LUDI': 'ZA ĽUDÍ',
};

export const isCompany = (sourceColumns) => {
    return (
        sourceColumns[3].substr(0, 1) === 'Y' || sourceColumns[4].trim().length
    );
};

export const getDonationsColumn = (sourceColumns, targetColumn) => {
    const company = isCompany(sourceColumns);
    const name = sourceColumns[company ? 4 : 2].trim();
    switch (targetColumn) {
        case dc.party:
            return allParties[sourceColumns[0]] ?? sourceColumns[0];
        case dc.date:
            return (
                <div className="text-end text-nowrap">
                    {sourceColumns[1].length > 4
                        ? dateNumericFormat(sourceColumns[1])
                        : sourceColumns[1]}
                </div>
            );
        case dc.entity:
            return name ? (
                <OverlayTrigger
                    overlay={
                        <Tooltip id={generateRandomString()}>
                            {entityLabel(Number(company))}
                        </Tooltip>
                    }
                    placement="right"
                    delayShow={300}
                    delayHide={150}
                >
                    <div
                        className="text-center fs-5"
                        aria-label={entityLabel(Number(company))}
                    >
                        {entityIcon(Number(company))}
                    </div>
                </OverlayTrigger>
            ) : (
                ''
            );
        case dc.name:
            return sourceColumns[3] ? (
                <Link to={routes.donor(sourceColumns[3])}>{name || '-'}</Link>
            ) : (
                <span>{name || '-'}</span>
            );
        case dc.address:
            return sourceColumns[5];
        case dc.type:
            return typeLabel(Number(sourceColumns[6])) ?? '';
        case dc.subtype:
            return sourceColumns[7];
        case dc.amount:
            return (
                <div className="text-end text-nowrap">
                    {currencyFormat(sourceColumns[8])}
                </div>
            );
        case dc.source:
            return (
                <div className="text-center">
                    <a
                        href={sourceColumns[9]}
                        className="text-decoration-none fs-4"
                        title={t(labels.download)}
                        target="_blank"
                        rel="noreferrer"
                    >
                        🖹
                    </a>
                </div>
            );
        case dc.flag:
            if (sourceColumns[10]) {
                return (
                    <div className="text-center">
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={generateRandomString()}>
                                    {flagLabel(Number(sourceColumns[10]))}
                                </Tooltip>
                            }
                            placement="right"
                            delayShow={300}
                            delayHide={150}
                        >
                            <Badge
                                bg="white"
                                pill
                                className={`flag-${sourceColumns[10]} border fs-6`}
                            >
                                🏴
                            </Badge>
                        </OverlayTrigger>
                    </div>
                );
            }
            return null;
        case dc.notes:
            return sourceColumns[14];
        default:
            return null;
    }
};

export const parseQueryOptions = () => {
    const params = useParams();
    const options = {};
    if ((params.query ?? false) && params.query.length) {
        const allowed = [...apiParams, ...settingsParams];
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
        if (apiParams.includes(param)) {
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

export function FlagBadge({ compact = false, flag }) {
    const i = Number(flag);
    return (
        <>
            <Badge
                bg="white"
                pill
                className={`flag-${flag} border${compact ? '' : ' fs-2'}`}
            >
                {i ? '🏴' : '✔️'}
            </Badge>
            {!compact && <h5 className="mt-2">{flagLabel(i)}</h5>}
        </>
    );
}

export function DonorFlags({ compact = false, flags = [] }) {
    const flagsKeys = !Object.values(flags).includes(true)
        ? [0]
        : Object.entries(flags)
              .map(([flag, enabled]) => {
                  if (!enabled) {
                      return null;
                  }
                  return flag;
              })
              .filter((flag) => flag !== null);
    return compact ? (
        <Stack direction="horizontal" gap={2}>
            {flagsKeys.map((flag) => {
                return <FlagBadge key={flag} compact={compact} flag={flag} />;
            })}
        </Stack>
    ) : (
        <Row className="text-center mt-5">
            {flagsKeys.map((flag) => {
                return (
                    <Col key={flag}>
                        <FlagBadge compact={compact} flag={flag} />
                    </Col>
                );
            })}
        </Row>
    );
}

export function DonorParties({
    className = '',
    compact = false,
    parties = [],
}) {
    if (compact) {
        return parties.map((party, index) => {
            return (
                <Badge
                    key={party}
                    bg="secondary"
                    className={index > 0 ? 'ms-2' : ''}
                >
                    {allParties[party] ?? party}
                </Badge>
            );
        });
    }
    return (
        <Stack
            className={`flex-wrap ${className}`}
            direction="horizontal"
            gap={2}
        >
            {parties.map((party) => {
                return (
                    <Link
                        key={party}
                        to={routes.donations(
                            buildUrlQuery({
                                p: party,
                            })
                        )}
                    >
                        <Badge bg="secondary">
                            {allParties[party] ?? party}
                        </Badge>
                    </Link>
                );
            })}
        </Stack>
    );
}

export function SortLink({ column, children }) {
    const options = parseQueryOptions();

    // copy all options except s & o
    const { s, o, ...linkOpt } = options;
    let currentClass = 'text-decoration-none';
    let targetSort;
    switch (options.s ?? defaultSort) {
        // current column is sorted ascending, target is descending
        case column:
            currentClass += ' s-a';
            targetSort = separators.space + column;
            break;
        // current column is sorted descending, target is no sort
        case separators.space + column:
            currentClass += ' s-d';
            targetSort = separators.space;
            break;
        // other unsorted columns, target is ascending
        default:
            targetSort = column;
    }
    if (targetSort !== defaultSort) {
        linkOpt.s = targetSort;
    }
    return (
        <Link
            className={currentClass}
            to={routes.donations(buildUrlQuery(linkOpt))}
        >
            {children}
        </Link>
    );
}
