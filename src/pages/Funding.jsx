import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import FundingSources from '../components/funding/FundingSources';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';
import PartiesFundingChart from '../components/funding/PartiesFundingChart';

function Funding() {
    setTitle(t(labels.funding.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.funding.pageTitle)}</Title>

            <FundingNav />

            <FundingSources />

            <PartiesFundingChart />
        </section>
    );
}

export default Funding;
