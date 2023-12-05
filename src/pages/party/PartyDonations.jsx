import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { hiddenPartyColumns } from '../../helpers/dontaions';
import { routes, segments } from '../../helpers/routes';

import SearchResults from '../../components/donors/SearchResults';

function PartyDonations() {
    const partyName = useOutletContext();

    setTitle(`${partyName} : ${t(labels.donations.navTitle)}`);

    return (
        <SearchResults
            hiddenColumns={hiddenPartyColumns}
            queryOptions={{ p: partyName }}
            route={routes.party(partyName, segments.DONATIONS)}
        />
    );
}

export default PartyDonations;
