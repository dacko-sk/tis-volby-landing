import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// import { partyChartLabel } from '../../helpers/charts';
import {
    colorDarkBlue,
    colorOrange,
    // colors,
    links,
} from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
// import { partyAlias } from '../../helpers/parties';
import { routes, segments } from '../../helpers/routes';

import useGovData from '../../hooks/GovData';
import { useDonationsData } from '../../hooks/Queries';

// import TisBarChart from '../charts/TisBarChart';
import TisPieChart from '../charts/TisPieChart';
import HeroNumber from '../general/HeroNumber';
import Loading from '../general/Loading';
import PartiesTiles from '../parties/PartiesTiles';

function FundingSources({ party }) {
    const { data, isLoading, error } = useDonationsData();
    const { getAggTotals, getCoalitionMembers, getExtremes, isCoalition } =
        useGovData();

    if (isLoading || error) {
        return <Loading error={error} />;
    }

    const coalition = isCoalition(party);
    const govSum = getAggTotals(null, null, party);

    const donationsSum = Object.entries(data).reduce(
        (sum, [partyName, donationsSum]) => {
            if (!party || party === partyName) {
                return sum + donationsSum;
            }
            return sum;
        },
        0
    );

    let chart;
    if (coalition) {
        // const palette = Object.values(colors);
        chart = Object.entries(getCoalitionMembers(party)).map(
            ([period, members]) => {
                return (
                    <div key={period}>
                        <h2 className="mb-3">
                            {t(labels.parties.coalitionMembers, [period])}
                        </h2>
                        <PartiesTiles
                            parties={Object.keys(members)}
                            compact={false}
                        />
                        {/* <TisBarChart
                            className="mt-4"
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
                            vertical
                        /> */}
                    </div>
                );
            }
        );
    } else if (donationsSum) {
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
                subtitle={t(
                    labels.funding[`sourcesDisclaimer${party ? 'Party' : ''}`],
                    Object.values(getExtremes())
                )}
                title={t(labels.funding.sourcesTitle)}
            />
        );
    } else {
        chart = (
            <HeroNumber
                button={t(labels.donate.buttonLong)}
                disclaimer={t(labels.donations.noData)}
                link={links.donateUrl}
                number="N/A"
                title={t(labels.donations.title)}
            />
        );
    }

    return (
        <Row>
            <Col xl={6}>{chart}</Col>
            <Col xl={6} className="mt-4 mt-xl-0">
                {!coalition && donationsSum > 0 && (
                    <HeroNumber
                        className="mb-4"
                        button={t(labels.donations.learnMore)}
                        disclaimer={t(
                            labels.donations[
                                `totalDisclaimer${party ? 'Party' : ''}`
                            ]
                        )}
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
                    button={govSum ? t(labels.government.learnMore) : null}
                    disclaimer={t(
                        labels.government[
                            `totalDisclaimer${party ? 'Party' : ''}`
                        ],
                        Object.values(getExtremes())
                    )}
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
