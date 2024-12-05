import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { hiddenPartyColumns } from '../../helpers/dontaions';
import { routes, segments } from '../../helpers/routes';

import DonationsSearch from '../../components/donors/DonationsSearch';

function PartyDonations() {
    const partyName = useOutletContext();

    setTitle(`${partyName} : ${t(labels.donations.navTitle)}`);

    return (
        <DonationsSearch
            hiddenColumns={hiddenPartyColumns}
            parties={[]}
            route={routes.party(partyName, segments.DONATIONS)}
            routeOptions={{ p: partyName }}
        />
    );
}

export default PartyDonations;
