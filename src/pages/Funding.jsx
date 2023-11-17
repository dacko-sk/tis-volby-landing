import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import FundingSources from '../components/funding/FundingSources';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

function Funding() {
    setTitle(t(labels.donations.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.funding.pageTitle)}</Title>

            <FundingNav />

            <div id="funding">
                <FundingSources />
            </div>
        </section>
    );
}

export default Funding;
