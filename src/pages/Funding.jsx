import { setTitle } from '../api/helpers';

import AlertWithIcon, { icons } from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';

function Funding() {
    setTitle('Financovanie politických strán a databáza donorov');

    return (
        <section>
            <Title secondary="donorov">
                Financovanie politických strán
                <br />a databáza
            </Title>

            <AlertWithIcon className="mt-4" icon={icons.info} variant="primary">
                Stránka sa pripravuje.
            </AlertWithIcon>
        </section>
    );
}

export default Funding;
