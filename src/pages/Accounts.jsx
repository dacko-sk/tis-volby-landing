import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

function Accounts() {
    setTitle(t(labels.donations.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.accounts.pageTitle)}</Title>

            <FundingNav />

            <div id="accounts">accounts</div>
        </section>
    );
}

export default Accounts;
