import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { partyFullName } from '../../helpers/parties';

import FundingSources from '../../components/funding/FundingSources';

function PartyOverview() {
    const partyName = useOutletContext();

    setTitle(partyFullName(partyName));

    return <FundingSources party={partyName} />;
}

export default PartyOverview;
