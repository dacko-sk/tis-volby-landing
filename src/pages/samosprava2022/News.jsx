import { setTitle } from '../../helpers/helpers';
import { segments } from '../../helpers/routes';

import Title from '../../components/structure/Title';
import Posts from '../../components/wp/Posts';

export const newsCategories = [858];

const title = 'Aktuality';

function News() {
    setTitle(title);

    return (
        <section>
            <Title>{title}</Title>
            <Posts categories={newsCategories} section={segments.NEWS} />
        </section>
    );
}

export default News;
