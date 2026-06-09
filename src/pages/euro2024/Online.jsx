import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { labels, t } from '../../helpers/dictionary';

import Meta from '../../components/ads/Meta';
import TotalAdsSpending from '../../components/ads/TotalAdsSpending';
import AlertWithIcon from '../../components/general/AlertWithIcon';
import Title from '../../components/structure/Title';

function Online() {
    return (
        <section className="charts-page">
            <Title>{t(labels.ads.pageTitle)}</Title>
            <AlertWithIcon className="my-4" variant="primary">
                {t(labels.ads.meta.disclaimer)}
            </AlertWithIcon>
            <TotalAdsSpending />
            <Tab.Container id="providers" defaultActiveKey="facebook">
                <div className="tabs-scrollable">
                    <Nav variant="tabs">
                        <Nav.Link eventKey="facebook">
                            {t(labels.ads.meta.title)}
                        </Nav.Link>
                    </Nav>
                </div>

                <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="facebook">
                        <Meta />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </section>
    );
}

export default Online;
