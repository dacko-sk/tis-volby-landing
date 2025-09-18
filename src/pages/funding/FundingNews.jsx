import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { categories } from '../../helpers/wp';

import Title from '../../components/structure/Title';
import Posts from '../../components/wp/Posts';

function FundingNews() {
    setTitle(t(labels.news.fundingTitle));

    return (
        <section>
            <Title>{t(labels.news.fundingTitle)}</Title>
            <Posts categories={[categories.funding]} />
        </section>
    );
}

export default FundingNews;
