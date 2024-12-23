import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import DonationsGendersChart from '../components/charts/DonationsGendersChart';
import DonationsGendersUniqueChart from '../components/charts/DonationsGendersUniqeChart';
import DonationsRegionsChart from '../components/charts/DonationsRegionsChart';
import DonationsRegionsUniqueChart from '../components/charts/DonationsRegionsUniqueChart';
import PartiesFundingChart from '../components/charts/PartiesFundingChart';
import PartiesDonationsChart from '../components/charts/PartiesDonationsChart';
import PartiesUniqueChart from '../components/charts/PartiesUniqueChart';
import FundingSources from '../components/funding/FundingSources';
import Title from '../components/structure/Title';

const ACC_KEYS = {
    PARTIES: 'p',
    PARTIES_DONATIONS: 'pd',
    PARTIES_UNIQUE: 'pu',
    REGIONS: 'r',
    REGIONS_UNUQUE: 'ru',
    DEMOGRAPHY: 'd',
};

function Charts() {
    setTitle(t(labels.charts.pageTitle));

    const [open, setOpen] = useState([]);
    const [loaded, setLoaded] = useState([]);

    const onSelect = (activeKeys) => {
        // open/close accordion
        setOpen(activeKeys);
        // remember if chart was already loaded
        const newTabs = activeKeys.filter((tab) => !loaded.includes(tab));
        if (newTabs) {
            setLoaded([...loaded, ...newTabs]);
        }
    };

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.charts.pageTitle)}</Title>

            <FundingSources />

            <Accordion
                activeKey={open}
                alwaysOpen
                onSelect={onSelect}
                className="mt-4"
            >
                <Accordion.Item
                    key={ACC_KEYS.PARTIES}
                    eventKey={ACC_KEYS.PARTIES}
                >
                    <Accordion.Header>
                        {t(labels.funding.partiesTotalAll)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {loaded.includes(ACC_KEYS.PARTIES) && (
                            <PartiesFundingChart />
                        )}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                    key={ACC_KEYS.PARTIES_DONATIONS}
                    eventKey={ACC_KEYS.PARTIES_DONATIONS}
                >
                    <Accordion.Header>
                        {t(labels.donations.topParties)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {loaded.includes(ACC_KEYS.PARTIES_DONATIONS) && (
                            <PartiesDonationsChart />
                        )}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                    key={ACC_KEYS.PARTIES_UNIQUE}
                    eventKey={ACC_KEYS.PARTIES_UNIQUE}
                >
                    <Accordion.Header>
                        {t(labels.donations.uniqueDonors)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {loaded.includes(ACC_KEYS.PARTIES_UNIQUE) && (
                            <PartiesUniqueChart />
                        )}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                    key={ACC_KEYS.REGIONS}
                    eventKey={ACC_KEYS.REGIONS}
                >
                    <Accordion.Header>
                        {t(labels.charts.regionsTitle)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {loaded.includes(ACC_KEYS.REGIONS) && (
                            <DonationsRegionsChart />
                        )}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                    key={ACC_KEYS.REGIONS_UNUQUE}
                    eventKey={ACC_KEYS.REGIONS_UNUQUE}
                >
                    <Accordion.Header>
                        {t(labels.charts.regionsUniqueTitle)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {loaded.includes(ACC_KEYS.REGIONS_UNUQUE) && (
                            <DonationsRegionsUniqueChart />
                        )}
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                    key={ACC_KEYS.DEMOGRAPHY}
                    eventKey={ACC_KEYS.DEMOGRAPHY}
                >
                    <Accordion.Header>
                        {t(labels.charts.demographyTitle)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {loaded.includes(ACC_KEYS.DEMOGRAPHY) && (
                            <Row className="gy-3">
                                <Col xl={6}>
                                    <DonationsGendersChart />
                                </Col>
                                <Col xl={6}>
                                    <DonationsGendersUniqueChart />
                                </Col>
                            </Row>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </section>
    );
}

export default Charts;
