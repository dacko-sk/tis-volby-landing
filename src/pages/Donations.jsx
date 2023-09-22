import { setTitle } from '../api/helpers';

import Filters from '../components/donors/Filters';
import SearchResults from '../components/donors/SearchResults';
import Title from '../components/structure/Title';

function Donations() {
    setTitle('Financovanie politických strán a databáza donorov');

    return (
        <section>
            <Title secondary="donorov">
                Financovanie politických strán
                <br />a databáza
            </Title>

            <Filters />

            <SearchResults />
        </section>
    );
}

export default Donations;
