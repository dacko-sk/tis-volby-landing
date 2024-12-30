import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';

import { getColumnIndex } from '../../helpers/accounts';
import { icons, transactionsColumns as tc } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { currencyFormat, generateRandomString } from '../../helpers/helpers';
import { routes, rwq, separators } from '../../helpers/routes';

function TransactionCard({ tData, q }) {
    const ta = tData[getColumnIndex(tc.ta)];
    const type = tData[getColumnIndex(tc.type)];
    const year = tData[getColumnIndex(tc.year)];
    return (
        <Link
            to={rwq.searchAndFilter(
                routes.account([ta, type, year].join(separators.value)),
                { q, s: separators.numbers + tc.amount }
            )}
            className="donor-card d-block bg-light text-dark text-decoration-none p-3"
        >
            <Stack className="flex-wrap" direction="horizontal">
                <div className="el-icon">
                    <OverlayTrigger
                        overlay={
                            <Tooltip id={generateRandomString()}>
                                {t(labels.elections.types[type])}
                            </Tooltip>
                        }
                        placement="top"
                        delayShow={300}
                        delayHide={150}
                    >
                        <img src={icons.elections[type]} />
                    </OverlayTrigger>
                    <span>{year}</span>
                </div>
                <div>{tData[getColumnIndex(tc.accountName)]}</div>
                <div className="fw-bold">
                    {currencyFormat(tData[getColumnIndex(tc.amount)])}
                </div>
                <div>
                    <Badge bg="secondary">{ta.toUpperCase()}</Badge>
                </div>
            </Stack>
        </Link>
    );
}

export default TransactionCard;
