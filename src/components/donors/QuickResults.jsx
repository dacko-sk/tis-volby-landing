import { useQuery } from '@tanstack/react-query';

import { labels, t } from '../../helpers/dictionary';
import { apiEndpoints, apiParams } from '../../helpers/dontaions';
import { buildApiQuery } from '../../helpers/routes';

import DonorCard from './DonorCard';
import Loading from '../general/Loading';
import AlertWithIcon from '../general/AlertWithIcon';

const maxResults = 5;

function QuickResults({ query }) {
    const queryParams = buildApiQuery(apiParams, { b: maxResults, q: query });
    const aq = useQuery(
        [`donor_search_${queryParams}`],
        () =>
            fetch(`${apiEndpoints.donors}?${queryParams}`).then((response) =>
                response.json()
            ),
        {
            // run only if query is not empty
            enabled: !!query,
        }
    );

    if (query) {
        // isInitialLoading flag will be true if query is enabled, there are no data yet (isLoading) and isFetching
        if (aq.isInitialLoading || aq.error) {
            return <Loading className="my-5" error={aq.error} />;
        }
        const cards = [];
        (aq.data?.rows ?? []).forEach((donorData) => {
            cards.push(<DonorCard key={donorData.id} donorData={donorData} />);
        });
        return cards.length ? (
            cards
        ) : (
            <AlertWithIcon variant="danger">
                {t(labels.donations.search.noDonors)}
            </AlertWithIcon>
        );
    }

    return null;
}

export default QuickResults;
