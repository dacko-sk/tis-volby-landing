import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useQuery } from '@tanstack/react-query';

import { apiEndpoints, apiParams } from '../../helpers/accounts';
import { icons, transactionsColumns as tc } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { currencyFormat } from '../../helpers/helpers';
import { buildApiQuery, routes } from '../../helpers/routes';

import { defaultBlocksize } from '../datatables/TableSettings';
import HeroNumber from '../general/HeroNumber';
import Loading from '../general/Loading';

function AccountOverview({ accName, elType, elYear }) {
    const defaultOptions = { i: accName, t: elType, y: elYear };
    const queryParams = buildApiQuery(apiParams, {
        ...defaultOptions,
        b: defaultBlocksize,
    });
    const tq = useQuery([`transactions_${queryParams}`], () =>
        fetch(`${apiEndpoints.transactions}?${queryParams}`).then((response) =>
            response.json()
        )
    );

    if (tq.isLoading || tq.error) {
        return <Loading error={tq.error} />;
    }

    return (
        <Row className="gy-3 gy-lg-0">
            <Col lg={6}>
                <h2 className="text-lg-center">{t(labels.accounts.info)}</h2>
                <Table responsive hover>
                    <tbody>
                        <tr>
                            <td>{t(labels.accounts.columns[tc.type])}</td>
                            <td className="text-end">
                                <span className="el-icon">
                                    <img src={icons.elections[elType]} />
                                    <span>
                                        {`${t(labels.elections.types[elType])} ${elYear}`}
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>{t(labels.charts.incoming)}</td>
                            <td className="text-end">
                                {currencyFormat(tq.data.sum?.in ?? 0)}
                            </td>
                        </tr>
                        <tr>
                            <td>{t(labels.charts.outgoing)}</td>
                            <td className="text-end">
                                {currencyFormat(tq.data.sum?.out ?? 0)}
                            </td>
                        </tr>
                        <tr>
                            <td>{t(labels.accounts.transactionsAmount)}</td>
                            <td className="text-end">{tq.data.total ?? 0}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            <Col lg={6}>
                <HeroNumber
                    button={t(labels.accounts.back)}
                    disclaimer={t(labels.accounts.totalSpendingDisclaimer)}
                    link={routes.accounts()}
                    number={tq.data.sum?.out ?? 0}
                    title={t(labels.charts.outgoing)}
                />
            </Col>
        </Row>
    );
}

export default AccountOverview;
