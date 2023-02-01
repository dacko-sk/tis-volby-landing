import { setTitle } from '../api/helpers';

import AlertWithIcon, { icons } from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';

const title = 'Zoznam sledovaných volieb';

function Elections() {
    setTitle(title);

    return (
        <section>
            <Title>{title}</Title>

            <AlertWithIcon className="mt-4" icon={icons.info} variant="primary">
                Stránka sa pripravuje.
            </AlertWithIcon>
        </section>
    );
}

export default Elections;
