import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { labels } from '../api/constants';
import { setTitle } from '../api/helpers';

import Filters from '../components/donors/Filters';
import SearchResults from '../components/donors/SearchResults';
import Title from '../components/structure/Title';

function Donations() {
    const [open, setOpen] = useState(window.screen.width > 991);

    const toggleFilter = () => {
        setOpen(!open);
    };

    setTitle('Financovanie politických strán a databáza donorov');

    return (
        <section>
            <Title secondary="donorov">
                Financovanie politických strán
                <br />a databáza
            </Title>

            <div id="donations">
                <Button className="mb-2" onClick={toggleFilter}>
                    {open
                        ? labels.donations.filters.hide
                        : labels.donations.filters.show}
                </Button>
                <div className="row gx-3 gy-2">
                    <aside className={`col-12 ${open ? 'col-lg-3' : 'd-none'}`}>
                        <Filters open={open} />
                    </aside>
                    <div className="col-12 col-lg">
                        <SearchResults />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Donations;
