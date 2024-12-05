import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { newsCategories } from '../helpers/wp';

import QuickSearch from '../components/donors/QuickSearch';
import Top10Donors from '../components/donors/Top10Donors';
import PartiesFundingChart from '../components/funding/PartiesFundingChart';
import SiteNavigator from '../components/structure/SiteNavigator';
import Title from '../components/structure/Title';
import BannerNews from '../components/wp/BannerNews';
import Posts, { templates } from '../components/wp/Posts';

function Home() {
    setTitle(t(labels.home.pageTitle));

    return (
        <section>
            <Title secondaryWords={2} uppercase>
                {t(labels.home.pageTitle)}
            </Title>

            <div id="search-container">
                <SiteNavigator />
                <QuickSearch />
            </div>

            <BannerNews />

            <PartiesFundingChart limit={10} />

            <Top10Donors
                // https://volby.transparency.sk/api/donors/donors.php?c=0&b=10
                file="top10individual"
                title={labels.donations.top10sponsors}
                disclaimer={labels.donations.disclaimer}
            />

            <Top10Donors
                // https://volby.transparency.sk/api/donors/donors.php?c=0&b=10&t=1-2-3-4
                file="top10donors"
                title={labels.donations.top10donors}
                disclaimer={labels.donations.disclaimerNoCredits}
            />

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
