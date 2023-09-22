import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../api/helpers';

import QuickSearch from '../components/donors/QuickSearch';
import ElectionsPreview from '../components/elections/ElectionsPreview';
import Title from '../components/structure/Title';

import img22 from '../../public/img/samosprava22.jpg';
import img23 from '../../public/img/parlament23.jpg';

function Home() {
    setTitle('Úvod');

    return (
        <section>
            <Title uppercase secondary="kampaní">
                Monitoring
                <br />
                volebných
            </Title>

            <QuickSearch />

            <Row>
                <Col xxl={6}>
                    <h2 className="my-3">Nasledujúce voľby</h2>
                </Col>
                <Col xxl={6} className="d-none d-xxl-block">
                    <h2 className="my-3">Predchádzajúce voľby</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-container d-flex" md={9} lg={12} xxl={6}>
                    <ElectionsPreview
                        img={img23}
                        link="https://volby.transparency.sk/parlament2023/"
                        title="Parlamentné voľby 2023"
                        start="2023-09-30T07:00:00"
                        end="2023-09-30T20:00:00"
                    />
                </Col>
                <Col className="d-xxl-none">
                    <h2 className="my-3">Predchádzajúce voľby</h2>
                </Col>
                <Col className="col-container d-flex" md={9} lg={12} xxl={6}>
                    <ElectionsPreview
                        img={img22}
                        link="https://volby.transparency.sk/samosprava2022/"
                        title="Samosprávne voľby 2022"
                        start="2022-10-29T07:00:00"
                        end="2022-10-29T20:00:00"
                    />
                </Col>
            </Row>
            {/* <div className="buttons text-center mt-3">
                <Button as={Link} to={routes.elections} variant="secondary">
                    Všetky sledované voľby
                </Button>
            </div> */}

            {/* <h2 className="mt-4">Najnovšie aktuality</h2>
            <Posts
                categories={newsCategories}
                limit={2}
                section={segments.NEWS}
                template={templates.condensed}
            /> */}
        </section>
    );
}

export default Home;
