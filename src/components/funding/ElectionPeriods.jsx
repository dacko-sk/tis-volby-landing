import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { partyChartLabel } from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp, sumOfValues } from '../../helpers/helpers';

import useGovData, {
    csvKeys,
    subsidyColors,
    subsidyTypes,
} from '../../context/GovDataContext';

import YearsChart from './YearsChart';
import TisBarChart, { subsidyBars } from '../charts/TisBarChart';
import TisPieChart from '../charts/TisPieChart';
import HeroNumber from '../general/HeroNumber';
import Loading from '../general/Loading';

function ElectionPeriods({ party }) {
    const {
        getElectionPeriods,
        getElectionPeriodYears,
        getAggTotals,
        getPartiesTotals,
        govData,
    } = useGovData();

    const [open, setOpen] = useState([]);

    // make last elections accordion opened once data are loaded
    useEffect(() => {
        if (govData.lastElection) {
            setOpen([govData.lastElection]);
        }
    }, [govData.lastElection]);

    if (!govData.lastElection || govData.error) {
        // waiting for data or error in loding
        return <Loading error={govData.error} />;
    }

    const accordions = getElectionPeriods().map((ep) => {
        const period = ep[csvKeys.ELECTION_PERIOD];
        const fromTo = getElectionPeriodYears(period);
        const epTotal = getAggTotals(period, null, party);

        if (epTotal) {
            let epContent = null;
            if (open.includes(period)) {
                const sourcesData = subsidyTypes.map((type) => ({
                    name: t(labels.government[type]),
                    value: getAggTotals(period, type, party),
                    color: subsidyColors[type],
                }));
                const sourcesPie = {
                    data: sourcesData,
                    nameKey: 'name',
                    dataKey: 'value',
                    label: t(labels.charts.amount),
                };

                let epParties;
                if (!party) {
                    const parties = {};
                    Object.entries(getPartiesTotals(period)).forEach(
                        ([partyName, st]) => {
                            if (!(parties[partyName] ?? false)) {
                                parties[partyName] = {
                                    ...st,
                                    name: partyChartLabel(partyName),
                                    total: sumOfValues(st),
                                };
                            }
                        }
                    );
                    epParties = Object.values(parties).sort(
                        sortByNumericProp('total')
                    );
                }

                epContent = (
                    <>
                        <Row>
                            <Col xl={6} className="mb-4 mb-xl-0 order-xl-last">
                                <HeroNumber
                                    disclaimer={t(
                                        party
                                            ? labels.government
                                                  .epTotalDisclaimerParty
                                            : labels.government
                                                  .epTotalDisclaimer
                                    )}
                                    number={epTotal}
                                    title={t(labels.government.epTotal)}
                                />
                                <HeroNumber
                                    className="mt-4"
                                    disclaimer={t(
                                        period > 3
                                            ? labels.government
                                                  .votePriceDisclaimer
                                            : labels.government
                                                  .votePriceDisclaimerOld,
                                        [fromTo[0] - 1]
                                    )}
                                    number={ep[csvKeys.VOTE_PRICE]}
                                    title={t(labels.government.votePrice)}
                                />
                            </Col>
                            <Col xl={6} className="text-center">
                                <TisPieChart
                                    currency
                                    lastUpdate={false}
                                    pie={sourcesPie}
                                    percent={false}
                                    title={t(labels.government.subsidyTypes)}
                                />
                            </Col>
                        </Row>

                        {epParties && (
                            <TisBarChart
                                className="mt-4"
                                bars={subsidyBars(true)}
                                currency
                                data={epParties}
                                lastUpdate={false}
                                subtitle={t(
                                    labels.government
                                        .partiesTotalPeriodDisclaimer
                                )}
                                title={t(labels.government.partiesTotalPeriod)}
                                vertical
                            />
                        )}

                        <YearsChart
                            className="mt-4"
                            electionPeriod={period}
                            party={party}
                        />
                    </>
                );
            }

            return (
                <Accordion.Item key={period} eventKey={period}>
                    <Accordion.Header>
                        {t(labels.government.electionPeriod, [
                            period,
                            ...fromTo,
                        ])}
                    </Accordion.Header>
                    <Accordion.Body>{epContent}</Accordion.Body>
                </Accordion.Item>
            );
        }
    });

    const onSelect = (activeKeys) => {
        // open/close accordion
        setOpen(activeKeys);
    };

    return (
        <div className="mt-4">
            <h2>{t(labels.government.electionPeriods)}</h2>
            <Accordion
                className="mt-4"
                activeKey={open}
                alwaysOpen
                onSelect={onSelect}
            >
                {accordions}
            </Accordion>
        </div>
    );
}

export default ElectionPeriods;
