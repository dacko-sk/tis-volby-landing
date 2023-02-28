import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../api/helpers';

import ElectionsPreview from '../components/elections/ElectionsPreview';
import Title from '../components/structure/Title';

import img19 from '../../public/img/caputova2019.jpg';
import img20 from '../../public/img/olano2020.jpg';
import img22 from '../../public/img/samosprava22.jpg';
import img23 from '../../public/img/parlament23.jpg';

function Elections() {
    setTitle('Prehľad sledovaných volieb');

    return (
        <section>
            <Title secondary="volieb">
                Prehľad
                <br />
                sledovaných
            </Title>

            <Accordion
                className="my-3 elections"
                alwaysOpen
                defaultActiveKey={['n', 'p', 's']}
            >
                <Accordion.Item key="n" eventKey="n">
                    <Accordion.Header>Parlamentné voľby</Accordion.Header>
                    <Accordion.Body>
                        <Row className="justify-content-center">
                            <Col
                                className="col-container d-flex"
                                md={9}
                                lg={12}
                                xxl={6}
                            >
                                <ElectionsPreview
                                    img={img23}
                                    link="https://volby.transparency.sk/parlament2023/"
                                    title="Parlamentné voľby 2023"
                                    start="2023-09-30T07:00:00"
                                    end="2023-09-30T20:00:00"
                                />
                            </Col>
                            <Col
                                className="col-container d-flex"
                                md={9}
                                lg={12}
                                xxl={6}
                            >
                                <ElectionsPreview
                                    img={img20}
                                    fadeImg
                                    link="https://volby.transparency.sk/parlament2020/"
                                    title="Parlamentné voľby 2020"
                                    end="2020-02-28T20:00:00"
                                />
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item key="p" eventKey="p">
                    <Accordion.Header>Prezidentské voľby</Accordion.Header>
                    <Accordion.Body>
                        <Row className="justify-content-center">
                            <Col
                                className="col-container"
                                md={9}
                                lg={12}
                                // xxl={6}
                            >
                                <ElectionsPreview
                                    img={img19}
                                    fadeImg
                                    link="https://volby.transparency.sk/prezident2019/"
                                    title="Prezidentské voľby 2019"
                                    end="2019-03-30T20:00:00"
                                />
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item key="s" eventKey="s">
                    <Accordion.Header>Komunálne a župné voľby</Accordion.Header>
                    <Accordion.Body>
                        <Row className="justify-content-center">
                            <Col
                                className="col-container"
                                md={9}
                                lg={12}
                                // xxl={6}
                            >
                                <ElectionsPreview
                                    img={img22}
                                    link="https://volby.transparency.sk/samosprava2022/"
                                    title="Samosprávne voľby 2022"
                                    start="2022-10-29T07:00:00"
                                    end="2022-10-29T20:00:00"
                                />
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </section>
    );
}

export default Elections;
