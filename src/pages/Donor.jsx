import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { setTitle } from '../api/helpers';
import Title from '../components/structure/Title';
import { routes } from '../api/routes';

function Donor() {
    const params = useParams();
    const id = params.id ?? null;
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery([`donor_${id}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donors.php?id=${id}`
        ).then((response) => response.json())
    );

    useEffect(() => {
        if (!isLoading && !error && data && !(data.rows ?? false)) {
            // redirect to donations page in case of no data or invalid ID
            navigate(routes.donations());
        }
    }, [isLoading, error, data, navigate]);

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
