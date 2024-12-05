import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { icons, transactionsColumns as tc } from './constants';
import { labels, t } from './dictionary';
import {
    currencyFormat,
    dateNumericFormat,
    generateRandomString,
} from './helpers';
import { routes, separators } from './routes';

import { settingsParams } from '../components/datatables/TableSettings';

export const apiEndpoints = {
    transactions: 'https://volby.transparency.sk/api/accounts/search.php',
};
export const apiParams = [
    'o', // offset (page number - 1)
    'b', // block size
    'w', // direction
    'y', // year
    'a', // amount
    'd', // date (timestamp)
    'q', // search query
    's', // sort
    't', // type
    'i', // transparent account
];
export const allowedParams = [...apiParams, ...settingsParams];

export const hiddenColumnsDefault = [tc.year, tc.currency];
export const hiddenColumnsParty = [...hiddenColumnsDefault, tc.ta, tc.type];
export const optionalColumns = [
    tc.currency,
    tc.txType,
    tc.ks,
    tc.vs,
    tc.ss,
    tc.note,
];
export const defaultSort = `${separators.numbers}date`;
export const electionsYears = [2020, 2022, 2023, 2024];

export const amountSettings = {
    min: 0,
    max: 1000000,
    step: 100,
};

export const getColumnIndex = (targetColumn) =>
    Object.keys(tc).findIndex((colKey) => colKey === targetColumn);

export const columnAlign = (key) => {
    switch (key) {
        case tc.amount:
        case tc.date:
            return 'text-end';
        default:
            return '';
    }
};
export const columnLabel = (key) =>
    Object.keys(labels.accounts.columns).includes(key)
        ? t(labels.accounts.columns[key])
        : '';
export const columnContent = (sourceColumns, targetColumn) => {
    const val = sourceColumns[getColumnIndex(targetColumn)];
    const direction = Number(sourceColumns[getColumnIndex(tc.amount)] <= 0);
    switch (targetColumn) {
        case tc.ta:
            return (
                <Link
                    to={routes.account(
                        [
                            val,
                            sourceColumns[getColumnIndex(tc.type)],
                            sourceColumns[getColumnIndex(tc.year)],
                        ].join(separators.value)
                    )}
                >
                    {val}
                </Link>
            );
        case tc.type:
            return (
                <div className="el-icon">
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={generateRandomString()}>
                                {t(labels.elections.types[val])}
                            </Tooltip>
                        }
                        placement="left"
                        delayShow={300}
                        delayHide={150}
                    >
                        <img src={icons.elections[val]} />
                    </OverlayTrigger>
                    <span>{sourceColumns[getColumnIndex(tc.year)]}</span>
                </div>
            );
        case tc.date:
            return (
                <div className="text-end text-nowrap">
                    {val.length > 4 ? dateNumericFormat(val) : val}
                </div>
            );
        case tc.amount:
            return (
                <div className="d-flex align-items-center justify-content-between">
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={generateRandomString()}>
                                {t(labels.accounts.paymentTypes[direction])}
                            </Tooltip>
                        }
                        placement="left"
                        delayShow={300}
                        delayHide={150}
                    >
                        <div className={`payment-${direction}`}>
                            {icons.payments[direction]}
                        </div>
                    </OverlayTrigger>

                    <div className="text-end text-nowrap">
                        {currencyFormat(val)}
                    </div>
                </div>
            );
        default:
            return <div>{val}</div>;
    }
};
