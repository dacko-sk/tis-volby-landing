import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { labels, t } from '../../helpers/dictionary';

import useGovData, {
    csvKeys,
    subsidyColors,
    subsidyTypes,
} from '../../context/GovDataContext';

import TisPieChart from '../charts/TisPieChart';
import HeroNumber from '../general/HeroNumber';
import Loading from '../general/Loading';

function ElectionPeriods() {
    const { getElectionPeriods, getElectionPeriodYears, getTotals, govData } =
        useGovData();

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

        let epContent;
        if (open.includes(period)) {
            const sourcesData = subsidyTypes.map((type) => ({
                name: t(labels.government[type]),
                value: getTotals(period, type),
                color: subsidyColors[type],
            }));
            const sourcesPie = {
                data: sourcesData,
                nameKey: 'name',
                dataKey: 'value',
                label: t(labels.charts.amount),
            };
            epContent = (
                <Row>
                    <Col xl={6} className="order-xl-last">
                        <HeroNumber
                            className="mt-0 mt-xl-5"
                            disclaimer={t(
                                labels.government.totalPeriodDisclaimer
                            )}
                            number={getTotals(period)}
                            title={t(labels.government.totalPeriodTitle)}
                        />
                    </Col>
                    <Col xl={6}>
                        <TisPieChart
                            currency
                            lastUpdate={false}
                            pie={sourcesPie}
                            percent={false}
                        />
                    </Col>
                </Row>
            );
        } else {
            epContent = null;
        }

        return (
            <Accordion.Item key={period} eventKey={period}>
                <Accordion.Header>
                    {t(labels.government.electionPeriod, [period, ...fromTo])}
                </Accordion.Header>
                <Accordion.Body>{epContent}</Accordion.Body>
            </Accordion.Item>
        );
    });

    const onSelect = (activeKeys) => {
        // open/close accordion
        setOpen(activeKeys);
    };

    return (
        <div>
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
