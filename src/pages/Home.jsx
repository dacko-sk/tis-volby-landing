import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { setTitle } from '../api/helpers';
import { routes, segments } from '../api/routes';

import { newsCategories } from './News';
import ElectionPreview from '../components/elections/ElectionPreview';
import Title from '../components/structure/Title';
import Posts, { templates } from '../components/wp/Posts';

import elections22img from '../../public/img/samosprava22.jpg';
import elections23img from '../../public/img/parlament23.jpg';

function Home() {
    setTitle('Úvod');

    return (
        <section>
            <Title uppercase secondary="kampaní">
                Monitoring
                <br />
                volebných
            </Title>

            <Row className="justify-content-center">
                <Col className="mb-3" md={9} lg={12} xxl={6}>
                    <h2>Nasledujúce voľby</h2>
                    <ElectionPreview
                        img={elections23img}
                        link="https://volby.transparency.sk/parlament2023/"
                        title="Parlamentné voľby 2023"
                        start="2023-09-30T07:00:00"
                        end="2023-09-30T20:00:00"
                    />
                </Col>
                <Col className=" mb-3" md={9} lg={12} xxl={6}>
                    <h2>Predchádzajúce voľby</h2>
                    <ElectionPreview
                        img={elections22img}
                        link="https://volby.transparency.sk/samosprava2022/"
                        title="Samosprávne voľby 2022"
                        start="2022-10-29T07:00:00"
                        end="2022-10-29T20:00:00"
                    />
                </Col>
            </Row>
            <div className="buttons text-center">
                <Button as={Link} to={routes.elections} variant="secondary">
                    Všetky sledované voľby
                </Button>
            </div>

            <h2 className="mt-4">Najnovšie aktuality</h2>
            <Posts
                categories={newsCategories}
                limit={2}
                section={segments.NEWS}
                template={templates.condensed}
            />
        </section>
    );
}

export default Home;
