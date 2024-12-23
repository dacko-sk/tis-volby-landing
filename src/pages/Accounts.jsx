import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import TransactionsSearch from '../components/accounts/TransactionsSearch';
import Title from '../components/structure/Title';

function Accounts() {
    setTitle(t(labels.accounts.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.accounts.pageTitle)}</Title>

            <TransactionsSearch />
        </section>
    );
}

export default Accounts;
