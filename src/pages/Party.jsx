import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { buildApiQuery, hiddenDonorColumns } from '../helpers/dontaions';
import { separators } from '../helpers/routes';

import DonationsTable from '../components/donors/DonationsTable';
import FundingSources from '../components/funding/FundingSources';
import Title from '../components/structure/Title';

function Party() {
    const params = useParams();
    const partyName = (params.slug ?? '').replaceAll(separators.space, ' ');
    const navigate = useNavigate();

    const options = {
        p: partyName,
    };
    const queryParams = buildApiQuery(options);
    const dq = useQuery([`donations_party_${partyName}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donations.php?${queryParams}`
        ).then((response) => response.json())
    );

    setTitle(`${t(labels.party.pageTitle)} ${partyName}`);

    return (
        <section>
            <Title secondary={partyName}>
                {t(labels.party.pageTitle)}
                <br />
            </Title>

            <FundingSources party={partyName} />

            {dq.data?.rows.length > 0 && (
                <h2 className="mt-4">{t(labels.donations.allDonations)}</h2>
            )}

            <DonationsTable
                className="mt-4"
                donationsQuery={dq}
                hiddenColumns={hiddenDonorColumns}
            />
        </section>
    );
}

export default Party;
