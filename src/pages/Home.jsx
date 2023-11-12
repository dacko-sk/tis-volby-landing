import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { elections as el, links, newsCategories } from '../helpers/constants';
import { labels, t } from '../helpers/dictionary';
import { nl2r, secondarySentenceEnding as se } from '../helpers/helpers';

import QuickSearch from '../components/donors/QuickSearch';
import Top10Donors from '../components/donors/Top10Donors';
import ElectionsPreview from '../components/elections/ElectionsPreview';
import Title from '../components/structure/Title';
import Posts, { templates } from '../components/wp/Posts';

import img22 from '../../public/img/samospravy_color_3_1920_900.png';
import img23 from '../../public/img/parlament_2_color_1920_900.png';

function Home() {
    setTitle(t(labels.home.pageTitle));

    return (
        <section>
            <Title secondaryWords={2} uppercase>
                {t(labels.home.pageTitle)}
            </Title>

            <QuickSearch />

            <Top10Donors
                file="top10individual"
                title={labels.donors.top10individual}
                disclaimer={labels.donors.disclaimer}
            />

            <Top10Donors
                file="top10donors"
                title={labels.donors.top10donors}
                disclaimer={labels.donors.disclaimer}
            />

            <Row className="justify-content-center my-4">
                <Col className="col-container d-flex" md={9} lg={6}>
                    <ElectionsPreview
                        img={img23}
                        link={links[el.n23]}
                        title={t(labels.elections[el.n23])}
                        date="2023-09-30"
                    >
                        {se(nl2r(t(labels.elections[el.n23])))}
                    </ElectionsPreview>
                </Col>
                <Col className="col-container d-flex" md={9} lg={6}>
                    <ElectionsPreview
                        img={img22}
                        link={links[el.s22]}
                        title={t(labels.elections[el.s22])}
                        date="2022-10-29"
                    >
                        {se(nl2r(t(labels.elections[el.s22])))}
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
