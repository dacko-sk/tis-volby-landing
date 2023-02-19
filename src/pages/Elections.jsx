import { setTitle } from '../api/helpers';

import AlertWithIcon, { icons } from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';

function Elections() {
    setTitle('Prehľad sledovaných volieb');

    return (
        <section>
            <Title secondary="volieb">
                Prehľad
                <br />
                sledovaných
            </Title>

            <AlertWithIcon className="mt-4" icon={icons.info} variant="primary">
                Stránka sa pripravuje.
            </AlertWithIcon>
        </section>
    );
}

export default Elections;
