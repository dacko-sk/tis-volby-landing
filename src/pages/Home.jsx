import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { elections as el, links } from '../helpers/constants';
import { labels, t } from '../helpers/dictionary';
import { nl2r, secondarySentenceEnding as se } from '../helpers/helpers';
import { newsCategories } from '../helpers/wp';

import QuickSearch from '../components/donors/QuickSearch';
import Top10Donors from '../components/donors/Top10Donors';
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

            <QuickSearch />

            <PartiesFundingChart limit={10} />

            <Top10Donors
                // https://volby.transparency.sk/api/donors/donors_noflags.php?c=0&b=10
                file="top10individual_noflags"
                title={labels.donations.top10individual}
                disclaimer={labels.donations.disclaimer}
            />

            <Top10Donors
                // https://volby.transparency.sk/api/donors/donors_noflags.php?c=0&b=10&t=1-2-3-4
                file="top10donors_noflags"
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
