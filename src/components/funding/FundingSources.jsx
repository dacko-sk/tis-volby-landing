import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useQuery } from '@tanstack/react-query';

import { colorDarkBlue, colorOrange } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { buildApiQuery, defaultBlocksize } from '../../helpers/dontaions';
import { routes } from '../../helpers/routes';

import useGovData from '../../context/GovDataContext';

import TisPieChart from '../charts/TisPieChart';
import HeroNumber from '../general/HeroNumber';
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

    const sourcesPie = {
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
        label: t(labels.charts.amount),
    };

    return (
        <Row>
            <Col xl={6}>
                <TisPieChart
                    currency
                    lastUpdate={false}
                    pie={sourcesPie}
                    percent={false}
                    subtitle={t(labels.funding.sourcesDisclaimer)}
                    title={t(labels.funding.sourcesTitle)}
                />
            </Col>
            <Col xl={6}>
                <HeroNumber
                    button={t(labels.learnMore)}
                    disclaimer={t(labels.donors.totalDisclaimer)}
                    link={routes.donations()}
                    number={donationsSum}
                    title={t(labels.donors.title)}
                />
                <HeroNumber
                    className="mt-4"
                    button={t(labels.learnMore)}
                    disclaimer={t(labels.government.totalDisclaimer)}
                    link={routes.government()}
                    number={govSum}
                    title={t(labels.government.navTitle)}
                />
            </Col>
        </Row>
    );
}

export default FundingSources;
