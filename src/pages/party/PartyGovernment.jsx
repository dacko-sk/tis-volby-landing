import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';

import YearsChart from '../../components/funding/YearsChart';
import ElectionPeriods from '../../components/funding/ElectionPeriods';

function PartyGovernment() {
    const partyName = useOutletContext();

    setTitle(`${partyName} : ${t(labels.government.navTitle)}`);

    return (
        <>
            <YearsChart party={partyName} />
            <ElectionPeriods party={partyName} />
        </>
    );
}

export default PartyGovernment;
