import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useQuery } from '@tanstack/react-query';

import { partyChartLabel } from '../../helpers/charts';
import { colorDarkBlue, colorOrange, colors } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { buildApiQuery } from '../../helpers/dontaions';
import { isCoalition } from '../../helpers/parties';
import { routes, segments } from '../../helpers/routes';

import useGovData from '../../context/GovDataContext';

import TisBarChart from '../charts/TisBarChart';
import TisPieChart from '../charts/TisPieChart';
import HeroNumber from '../general/HeroNumber';
import Loading from '../general/Loading';

function FundingSources({ party }) {
    const { getAggTotals, getCoalitionMembers } = useGovData();

    const coalition = isCoalition(party);
    const govSum = getAggTotals(null, null, party);

    const options = {};
    if (party) {
        options.p = party;
    }
    const queryParams = buildApiQuery(options);
    const dq = useQuery(
        [`donations_${party ? `party_${party}` : 'all_parties'}`],
        () =>
            fetch(
                `https://volby.transparency.sk/api/donors/donations.php?${queryParams}`
            ).then((response) => response.json())
    );

    if (dq.isLoading || dq.error) {
        return <Loading error={dq.error} />;
    }

    const donationsSum = dq.data?.sum ?? 0;

    let chart;
    if (coalition) {
        const palette = Object.values(colors);
        chart = Object.entries(getCoalitionMembers(party)).map(
            ([period, members]) => {
                return (
                    <TisBarChart
                        key={period}
                        bars={Object.keys(members).map((member, index) => ({
                            key: member + index,
                            name: member,
                            color: palette[index],
                            stackId: 'coalition',
                        }))}
                        data={Object.entries(members).map(
                            ([member, share], index) => ({
                                name: partyChartLabel(member),
                                [member + index]: govSum * share,
                            })
                        )}
                        currency
                        lastUpdate={false}
                        showSum={false}
                        title={t(labels.party.coalitionMembers, [period])}
                        vertical
                    />
                );
            }
        );
    } else {
        const sourcesPie = {
            data: [
                {
                    name: t(labels.donations.title),
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

        chart = (
            <TisPieChart
                currency
                lastUpdate={false}
                pie={sourcesPie}
                percent={false}
                subtitle={t(labels.funding.sourcesDisclaimer)}
                title={t(labels.funding.sourcesTitle)}
            />
        );
    }

    return (
        <Row>
            <Col xl={6}>{chart}</Col>
            <Col xl={6}>
                {!coalition && (
                    <HeroNumber
                        button={t(labels.donations.learnMore)}
                        disclaimer={t(labels.donations.totalDisclaimer)}
                        link={
                            party
                                ? routes.party(party, segments.DONATIONS)
                                : routes.donations()
                        }
                        number={donationsSum}
                        title={t(labels.donations.title)}
                    />
                )}
                <HeroNumber
                    className="mt-4"
                    button={govSum ? t(labels.government.learnMore) : null}
                    disclaimer={t(labels.government.totalDisclaimer)}
                    link={
                        party
                            ? routes.party(party, segments.GOVERNMENT)
                            : routes.government()
                    }
                    number={govSum}
                    title={t(labels.government.navTitle)}
                />
            </Col>
        </Row>
    );
}

export default FundingSources;
