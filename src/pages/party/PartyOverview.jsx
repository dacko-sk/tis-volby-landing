import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';

import FundingSources from '../../components/funding/FundingSources';

function PartyOverview() {
    const partyName = useOutletContext();

    setTitle(partyName);

    return <FundingSources party={partyName} />;
}

export default PartyOverview;
