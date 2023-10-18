import { newsCategories } from '../api/constants';
import { labels, t } from '../api/dictionary';
import { setTitle } from '../api/helpers';

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
