import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { elections as el, links } from '../helpers/constants';
import { labels, t } from '../helpers/dictionary';
import { nl2r, secondarySentenceEnding as se } from '../helpers/helpers';
import { getCurrentLanguage, languages } from '../helpers/routes';
import { newsCategories } from '../helpers/wp';

import QuickSearch from '../components/donors/QuickSearch';
import Top10Donors from '../components/donors/Top10Donors';
import ElectionsCountdown from '../components/elections/ElectionsCountdown';
import ElectionsPreview from '../components/elections/ElectionsPreview';
import PartiesFundingChart from '../components/funding/PartiesFundingChart';
import Title from '../components/structure/Title';
import Posts, { templates } from '../components/wp/Posts';

import imgE24 from '../../public/img/foto_europarlament_tasr_duotone_1920_1026.jpg';
import imgP24 from '../../public/img/foto_palac_okraje_duotone_8_1920_900.jpg';

function Home() {
    setTitle(t(labels.home.pageTitle));

    return (
        <section>
            <Title secondaryWords={2} uppercase>
                {t(labels.home.pageTitle)}
            </Title>

            <Alert variant="primary">
                <Row className="text-center">
                    <Col lg={6}>
                        <h2>{t(labels.elections[el.p24])}</h2>
                        <p>
                            {getCurrentLanguage() === languages.sk
                                ? 'Spustili sme novú podstránku venovanú Prezidentským voľbám 2024.'
                                : 'We launched new subpage dedicated to President elections in 2024.'}
                        </p>
                        <ElectionsCountdown
                            start="2024-04-06T07:00:00"
                            end="2024-04-06T22:00:00"
                            noHeader
                        />
                        <div className="buttons mt-3">
                            <Button href={links[el.p24]} variant="secondary">
                                {t(labels.elections[el.p24])}
                            </Button>
                        </div>
                    </Col>
                    <Col className="mt-4 mt-lg-0" lg={6}>
                        <h2>{t(labels.elections[el.e24])}</h2>
                        <p>
                            {getCurrentLanguage() === languages.sk
                                ? 'Spustili sme novú podstránku venovanú Európskym voľbám 2024.'
                                : 'We launched new subpage dedicated to European elections in 2024.'}
                        </p>
                        <ElectionsCountdown
                            start="2024-06-08T07:00:00"
                            end="2024-06-08T22:00:00"
                            noHeader
                        />
                        <div className="buttons mt-3">
                            <Button href={links[el.e24]} variant="secondary">
                                {t(labels.elections[el.e24])}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Alert>

            <QuickSearch />

            <PartiesFundingChart limit={10} />

            <Top10Donors
                // https://volby.transparency.sk/api/donors/donors.php?c=0&b=10
                file="top10individual"
                title={labels.donations.top10individual}
                disclaimer={labels.donations.disclaimer}
            />

            <Top10Donors
                // https://volby.transparency.sk/api/donors/donors.php?c=0&b=10&t=2-3-4
                file="top10donors"
                title={labels.donations.top10donors}
                disclaimer={labels.donations.disclaimer}
            />

            <Row className="justify-content-center my-4">
                <Col className="col-container d-flex" md={9} lg={6}>
                    <ElectionsPreview
                        img={imgP24}
                        link={links[el.p24]}
                        title={t(labels.elections[el.p24])}
                        date="2024-04-06"
                    >
                        {se(nl2r(t(labels.elections[el.p24])))}
                    </ElectionsPreview>
                </Col>
                <Col className="col-container d-flex" md={9} lg={6}>
                    <ElectionsPreview
                        img={imgE24}
                        link={links[el.e24]}
                        title={t(labels.elections[el.e24])}
                        date="2024-06-08"
                    >
                        {se(nl2r(t(labels.elections[el.e24])))}
                    </ElectionsPreview>
                </Col>
            </Row>

            <h2 className="mt-4 text-center">{t(labels.news.latest)}</h2>
            <Posts
                categories={newsCategories}
                limit={2}
                template={templates.condensed}
            />
        </section>
    );
}

export default Home;
