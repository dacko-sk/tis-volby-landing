import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';

import ElectionPeriods from '../../components/funding/ElectionPeriods';
import GovYearsChart from '../../components/funding/GovYearsChart';

function PartyGovernment() {
    const partyName = useOutletContext();

    setTitle(`${partyName} : ${t(labels.government.navTitle)}`);

    return (
        <>
            <GovYearsChart party={partyName} />
            <ElectionPeriods party={partyName} />
        </>
    );
}

export default PartyGovernment;
