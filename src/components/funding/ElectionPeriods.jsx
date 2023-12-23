import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { labels, t } from '../../helpers/dictionary';

import useGovData, {
    csvKeys,
    subsidyColors,
    subsidyTypes,
} from '../../hooks/GovData';

import GovTotalsChart from './GovTotalsChart';
import GovYearsChart from './GovYearsChart';
import TisPieChart from '../charts/TisPieChart';
import HeroNumber from '../general/HeroNumber';
import Loading from '../general/Loading';

function ElectionPeriods({ party }) {
    const {
        getElectionPeriods,
        getElectionPeriodYears,
        getExtremes,
        getAggTotals,
        govData,
    } = useGovData();

    const [open, setOpen] = useState([]);

    // make last elections accordion opened once data are loaded
    const { lastEP } = getExtremes();
    useEffect(() => {
        if (lastEP) {
            setOpen([lastEP]);
        }
    }, [lastEP]);

    if (!lastEP || govData.error) {
        // waiting for data or error in loding
        return <Loading error={govData.error} />;
    }

    const accordions = getElectionPeriods().map((ep) => {
        const period = ep[csvKeys.ELECTION_PERIOD];
        const fromTo = getElectionPeriodYears(period);
        const { paid, est } = getAggTotals(period, null, party);
        const epTotal = paid + est;

        if (epTotal) {
            let epContent = null;
            if (open.includes(period)) {
                const sourcesData = subsidyTypes.map((type) =>
                    ep[csvKeys.ESTIMATE]
                        ? {
                              name: t(labels.government[type].est),
                              longName: t(labels.government[type].estLong),
                              value: getAggTotals(period, type, party).est,
                              color: subsidyColors[type].est,
                          }
                        : {
                              name: t(labels.government[type].short),
                              longName: t(labels.government[type].long),
                              value: getAggTotals(period, type, party).paid,
                              color: subsidyColors[type].paid,
                          }
                );
                const sourcesPie = {
                    data: sourcesData,
                    nameKey: 'name',
                    dataKey: 'value',
                    label: t(labels.charts.amount),
                };

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

                        {!party && <GovTotalsChart period={period} />}

                        <GovYearsChart
                            className="mt-4"
                            party={party}
                            period={period}
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
