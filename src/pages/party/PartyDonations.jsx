import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { buildApiQuery, hiddenDonorColumns } from '../../helpers/dontaions';

import DonationsTable from '../../components/donors/DonationsTable';

function PartyDonations() {
    const partyName = useOutletContext();

    const options = {
        p: partyName,
    };
    const queryParams = buildApiQuery(options);
    const dq = useQuery([`donations_party_${partyName}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donations.php?${queryParams}`
        ).then((response) => response.json())
    );

    setTitle(`${partyName} : ${t(labels.donations.navTitle)}`);

    return (
        <>
            {dq.data?.rows.length > 0 && (
                <h2 className="mt-4">{t(labels.donations.allDonations)}</h2>
            )}
            <DonationsTable
                className="mt-4"
                donationsQuery={dq}
                hiddenColumns={hiddenDonorColumns}
            />
        </>
    );
}

export default PartyDonations;
