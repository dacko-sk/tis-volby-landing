import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import ElectionPeriods from '../components/funding/ElectionPeriods';
import GovTotalsChart from '../components/funding/GovTotalsChart';
import GovYearsChart from '../components/funding/GovYearsChart';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

function Government() {
    setTitle(t(labels.government.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.government.pageTitle)}</Title>

            <FundingNav />

            <GovYearsChart />

            <GovTotalsChart />

            <ElectionPeriods />
        </section>
    );
}

export default Government;
