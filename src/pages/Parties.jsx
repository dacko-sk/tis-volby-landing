import { Link } from 'react-router-dom';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { sortAlphabetically } from '../helpers/helpers';
import { routes } from '../helpers/routes';

import useGovData from '../hooks/GovData';
import { useDonationsData } from '../hooks/Queries';

import Loading from '../components/general/Loading';
import Title from '../components/structure/Title';

// import '../components/general/Parties.scss';

function Parties() {
    const { data, isLoading, error } = useDonationsData();
    const { getPartiesTotals } = useGovData();

    if (isLoading || error) {
        return <Loading />;
    }

    const allParties = Array.from(
        new Set([...Object.keys(data), ...Object.keys(getPartiesTotals())])
    ).sort(sortAlphabetically());

    setTitle(t(labels.parties.navTitle));

    return (
        <section>
            <Title>{t(labels.parties.navTitle)}</Title>
            {/* <p className="mb-4">{t(labels.parties.list)}</p> */}
            {allParties.map((partyName) => (
                <div key={partyName}>
                    <Link
                        className="party-logo-link hover-bg d-flex align-items-center"
                        to={routes.party(partyName)}
                    >
                        <h3 className="my-2">{partyName}</h3>
                    </Link>
                </div>
            ))}
        </section>
    );
}

export default Parties;
