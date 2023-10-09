import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../api/helpers';

import QuickSearch from '../components/donors/QuickSearch';
import ElectionsPreview from '../components/elections/ElectionsPreview';
import Title from '../components/structure/Title';

import img22 from '../../public/img/samospravy_color_3_1920_900.png';
import img23 from '../../public/img/parlament_2_color_1920_900.png';

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

            <Row className="justify-content-center">
                <Col className="col-container d-flex" md={9} lg={8} xxl={6}>
                    <ElectionsPreview
                        img={img23}
                        link="https://volby.transparency.sk/parlament2023/"
                        title="Parlamentné voľby 2023"
                        date="2023-09-30"
                    >
                        Parlamentné
                        <br />
                        voľby <span className="text-secondary">2023</span>
                    </ElectionsPreview>
                </Col>
                <Col className="col-container d-flex" md={9} lg={8} xxl={6}>
                    <ElectionsPreview
                        img={img22}
                        link="https://volby.transparency.sk/samosprava2022/"
                        title="Samosprávne voľby 2022"
                        date="2022-10-29"
                    >
                        Samosprávne
                        <br />
                        voľby <span className="text-secondary">2022</span>
                    </ElectionsPreview>
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
