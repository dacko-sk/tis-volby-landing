import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import TransactionsSearch from '../components/accounts/TransactionsSearch';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

function Accounts() {
    setTitle(t(labels.accounts.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.accounts.pageTitle)}</Title>

            <FundingNav />

            <TransactionsSearch />
        </section>
    );
}

export default Accounts;
