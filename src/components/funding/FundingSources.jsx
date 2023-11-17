import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { colorDarkBlue, colorOrange } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { buildApiQuery, defaultBlocksize } from '../../helpers/dontaions';
import { currencyFormat } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import useGovData from '../../context/GovDataContext';

import TisPieChart from '../charts/TisPieChart';
import Loading from '../general/Loading';

function FundingSources({ party }) {
    const { getTotals, govData } = useGovData();

    const govSum = getTotals(null, null, party);

    const queryParams = buildApiQuery({ b: defaultBlocksize });
    const dq = useQuery([`donations_${queryParams}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donations.php?${queryParams}`
        ).then((response) => response.json())
    );

    if (dq.isLoading || dq.error) {
        return <Loading error={dq.error} />;
    }

    const donationsSum = dq.data?.sum ?? 0;

    const formatPie = {
        data: [
            {
                name: t(labels.donors.title),
                value: donationsSum,
                color: colorDarkBlue,
            },
            {
                name: t(labels.government.navTitle),
                value: govSum,
                color: colorOrange,
            },
        ],
        nameKey: 'name',
        dataKey: 'value',
        label: t(labels.charts.sum),
    };

    return (
        <Row>
            <Col xl={6}>
                <TisPieChart
                    currency
                    lastUpdate={false}
                    pie={formatPie}
                    percent={false}
                    subtitle={t(labels.funding.sourcesDisclaimer)}
                    title={t(labels.funding.sourcesTitle)}
                />
            </Col>
            <Col xl={6}>
                <div className="total-spending text-center">
                    <h2>{t(labels.donors.title)}</h2>
                    <div className="hero-number">
                        {currencyFormat(donationsSum)}
                        <em className="disclaimer">
                            {t(labels.government.totalDisclaimer)}
                        </em>
                    </div>
                    <div className="buttons mt-3">
                        <Button
                            as={Link}
                            to={routes.donations()}
                            variant="secondary"
                        >
                            {t(labels.learnMore)}
                        </Button>
                    </div>
                </div>
                <div className="total-spending text-center mt-4">
                    <h2>{t(labels.government.navTitle)}</h2>
                    <div className="hero-number">
                        {currencyFormat(govSum)}
                        <em className="disclaimer">
                            {t(labels.government.totalDisclaimer)}
                        </em>
                    </div>
                    <div className="buttons mt-3">
                        <Button
                            as={Link}
                            to={routes.government()}
                            variant="secondary"
                        >
                            {t(labels.learnMore)}
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default FundingSources;
