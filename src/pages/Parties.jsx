import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { sortAlphabetically } from '../helpers/helpers';

import useGovData from '../hooks/GovData';
import { allDonationsParties } from '../hooks/Queries';

import AlertWithIcon from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';
import PartiesTiles from '../components/parties/PartiesTiles';

function Parties() {
    const { allGovParties } = useGovData();

    const allParties = Array.from(
        new Set([...allDonationsParties(), ...allGovParties])
    ).sort(sortAlphabetically());

    setTitle(t(labels.parties.navTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.parties.pageTitle)}</Title>

            <AlertWithIcon className="my-4" variant="primary">
                {t(labels.parties.allDisclaimer)}
            </AlertWithIcon>

            <PartiesTiles parties={allParties} />
        </section>
    );
}

export default Parties;
