import { useState } from 'react';
import Button from 'react-bootstrap/Button';

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
                    {open ? 'Skryť nastavenia' : 'Rozbaliť nastavenia'}
                </Button>
                <div className="row gx-3 gy-2">
                    <aside
                        className={`col-12 ${
                            open ? 'col-lg-3 col-xxl-2' : 'd-none'
                        }`}
                    >
                        <Filters open={open} />
                    </aside>
                    <div
                        className={`col-12${
                            open ? ' col-lg-9 col-xxl-10' : ''
                        }`}
                    >
                        <SearchResults />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Donations;
