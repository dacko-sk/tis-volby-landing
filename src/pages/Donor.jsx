import { useParams } from 'react-router-dom';

import { setTitle } from '../api/helpers';
import Title from '../components/structure/Title';

function Donor() {
    const params = useParams();
    const id = params.id ?? null;

    setTitle(`Donor ${id}`);

    return (
        <section>
            <Title secondary={id}>
                Donor
                <br />
            </Title>
            ID: {id}
        </section>
    );
}

export default Donor;
