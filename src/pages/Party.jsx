import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { labels, t } from '../helpers/dictionary';
import { buildApiQuery } from '../helpers/dontaions';
import { routes, segments, separators } from '../helpers/routes';

import useGovData from '../hooks/GovData';

import Title from '../components/structure/Title';

function Party() {
    const params = useParams();
    const { getAggTotals, isCoalition } = useGovData();

    const partyName = (params.slug ?? '').replaceAll(separators.space, ' ');
    const coalition = isCoalition(partyName);

    const options = {
        p: partyName,
    };
    const queryParams = buildApiQuery(options);
    const { data: dqData } = useQuery([`donations_party_${partyName}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donations.php?${queryParams}`
        ).then((response) => response.json())
    );
    const donationsSum = dqData?.sum ?? 0;
    const { paid, est } = getAggTotals(null, null, partyName);

    return (
        <section>
            <Title secondary={partyName}>
                {t(coalition ? labels.parties.coalition : labels.parties.party)}
                <br />
            </Title>

            <div className="tabs-scrollable">
                <Nav variant="tabs">
                    <Nav.Link as={NavLink} to={routes.party(partyName)} end>
                        {t(labels.funding.overview)}
                    </Nav.Link>
                    {!coalition && donationsSum > 0 && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.party(partyName, segments.DONATIONS)}
                        >
                            {t(labels.donations.navTitle)}
                        </Nav.Link>
                    )}
                    {paid + est > 0 && (
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
