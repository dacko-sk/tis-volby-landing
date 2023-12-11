import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { sortAlphabetically } from '../helpers/helpers';
import { isCoalition } from '../helpers/parties';
import { routes } from '../helpers/routes';

import useGovData from '../hooks/GovData';
import { useDonationsData } from '../hooks/Queries';

import AlertWithIcon from '../components/general/AlertWithIcon';
import Loading from '../components/general/Loading';
import Title from '../components/structure/Title';

function Parties() {
    const { data, isLoading, error } = useDonationsData();
    const { getPartiesTotals } = useGovData();

    if (isLoading || error) {
        return <Loading error={error} />;
    }

    const allParties = Array.from(
        new Set([...Object.keys(data), ...Object.keys(getPartiesTotals())])
    ).sort(sortAlphabetically());

    setTitle(t(labels.parties.navTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.parties.pageTitle)}</Title>

            <AlertWithIcon className="my-4" variant="primary">
                {t(labels.parties.allDisclaimer)}
            </AlertWithIcon>

            <Row className="tiles gx-4 gy-4">
                {allParties.map((partyName) => {
                    const coalition = isCoalition(partyName);
                    return (
                        <Col key={partyName} className="d-flex" sm>
                            <Link
                                to={routes.party(partyName)}
                                className={`d-flex flex-column justify-content-center w-100 cat-${
                                    coalition ? 'regional' : 'local'
                                }`}
                            >
                                <div className="type">
                                    {t(
                                        coalition
                                            ? labels.parties.coalition
                                            : ''
                                    )}
                                </div>
                                <h3 className="m-0">{partyName}</h3>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </section>
    );
}

export default Parties;
