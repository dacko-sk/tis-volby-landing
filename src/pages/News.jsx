import { setTitle } from '../helpers/browser';
import { newsCategories } from '../helpers/constants';
import { labels, t } from '../helpers/dictionary';

import Title from '../components/structure/Title';
import Posts from '../components/wp/Posts';

function News() {
    setTitle(t(labels.news.navTitle));

    return (
        <section>
            <Title>{t(labels.news.pageTitle)}</Title>
            <Posts categories={newsCategories} />
        </section>
    );
}

export default News;
