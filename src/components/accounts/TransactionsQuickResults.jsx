import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { apiEndpoints, apiParams } from '../../helpers/accounts';
import { transactionsColumns as tc } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { generateRandomString } from '../../helpers/helpers';
import { buildApiQuery, routes, rwq, separators } from '../../helpers/routes';

import TransactionCard from './TransactionCard';
import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';

function TransactionsQuickResults({ maxResults = 3, q }) {
    const queryParams = buildApiQuery(apiParams, {
        b: maxResults,
        q,
        s: separators.numbers + tc.amount,
    });
    const aq = useQuery(
        [`transactions_${queryParams}`],
        () =>
            fetch(`${apiEndpoints.transactions}?${queryParams}`).then(
                (response) => response.json()
            ),
        {
            // run only if q is not empty
            enabled: !!q,
        }
    );

    if (q) {
        // isInitialLoading flag will be true if query is enabled, there are no data yet (isLoading) and isFetching
        if (aq.isInitialLoading || aq.error) {
            return <Loading className="my-5" error={aq.error} />;
        }
        const cards = (aq.data?.rows ?? []).map((tData) => (
            <TransactionCard key={generateRandomString()} tData={tData} q={q} />
        ));
        return (
            <>
                <h4 className="my-3">{t(labels.accounts.navTitle)}</h4>
                {cards.length ? (
                    cards
                ) : (
                    <AlertWithIcon variant="danger">
                        {t(labels.donations.search.noDonors)}
                    </AlertWithIcon>
                )}
                <Button
                    as={Link}
                    to={rwq.searchAndFilter(routes.accounts(), { q })}
                    variant="secondary"
                    className="mt-4"
                >
                    {t(labels.accounts.search.advanced)}
                </Button>
            </>
        );
    }

    return null;
}

export default TransactionsQuickResults;
