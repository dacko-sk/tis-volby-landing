import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet, useParams } from 'react-router-dom';

import { labels, t } from '../helpers/dictionary';
import { isCoalition } from '../helpers/parties';
import { routes, segments, separators } from '../helpers/routes';

import useGovData from '../context/GovDataContext';

import Title from '../components/structure/Title';

function Party() {
    const params = useParams();
    const partyName = (params.slug ?? '').replaceAll(separators.space, ' ');
    const coalition = isCoalition(partyName);

    const { getAggTotals } = useGovData();

    return (
        <section>
            <Title secondary={partyName}>
                {t(coalition ? labels.party.coalition : labels.party.pageTitle)}
                <br />
            </Title>

            <div className="tabs-scrollable">
                <Nav variant="tabs">
                    <Nav.Link as={NavLink} to={routes.party(partyName)} end>
                        {t(labels.funding.overview)}
                    </Nav.Link>
                    {!coalition && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.party(partyName, segments.DONATIONS)}
                        >
                            {t(labels.donations.navTitle)}
                        </Nav.Link>
                    )}
                    {getAggTotals(null, null, partyName) > 0 && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.party(partyName, segments.GOVERNMENT)}
                        >
                            {t(labels.government.navTitle)}
                        </Nav.Link>
                    )}
                </Nav>
            </div>

            <div className="tab-content my-4">
                <Outlet context={partyName} />
            </div>
        </section>
    );
}

export default Party;
