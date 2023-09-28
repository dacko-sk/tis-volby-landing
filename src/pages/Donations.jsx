import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { labels } from '../api/constants';
import { setTitle } from '../api/helpers';

import Filters from '../components/donors/Filters';
import SearchResults from '../components/donors/SearchResults';
import Settings from '../components/donors/Settings';
import Title from '../components/structure/Title';

function Donations() {
    const [openFilters, setOpenFilters] = useState(window.screen.width > 991);
    const [openSettings, setOpenSettings] = useState(false);

    const toggleFilter = () => {
        setOpenFilters(!openFilters);
    };

    const toggleSettings = () => {
        setOpenSettings(!openSettings);
    };

    const tableSize = 12 - (openFilters ? 3 : 0) - (openSettings ? 2 : 0);

    setTitle('Financovanie politických strán a databáza donorov');

    return (
        <section>
            <Title secondary="donorov">
                Financovanie politických strán
                <br />a databáza
            </Title>

            <div id="donations">
                <div className="d-flex mb-2">
                    <Button
                        onClick={toggleFilter}
                        variant={`${openFilters ? '' : 'outline-'}primary`}
                    >
                        {labels.donations.filters.button}
                    </Button>
                    <Button
                        className="ms-auto"
                        onClick={toggleSettings}
                        variant={`${openSettings ? '' : 'outline-'}primary`}
                    >
                        {labels.donations.settings.button}
                    </Button>
                </div>
                <div className="row gx-3 gy-2">
                    <aside
                        className={`col-12 ${
                            openFilters ? 'col-lg-3' : 'd-none'
                        }`}
                    >
                        <Filters />
                    </aside>
                    <aside
                        className={`col-12 ${
                            openSettings ? 'col-lg-2 order-lg-last' : 'd-none'
                        }`}
                    >
                        <Settings />
                    </aside>
                    <div className={`col-12 col-lg-${tableSize}`}>
                        <SearchResults />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Donations;
