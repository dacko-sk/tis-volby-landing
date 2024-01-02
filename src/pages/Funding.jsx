import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import PartiesDonationsChart from '../components/donors/PartiesDonationsChart';
import FundingSources from '../components/funding/FundingSources';
import PartiesFundingChart from '../components/funding/PartiesFundingChart';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';
import UniqueDonorsChart from '../components/donors/UniqueDonorsChart';

function Funding() {
    setTitle(t(labels.funding.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.funding.pageTitle)}</Title>

            <FundingNav />

            <FundingSources />

            <PartiesFundingChart />

            <PartiesDonationsChart />

            <UniqueDonorsChart />
        </section>
    );
}

export default Funding;
