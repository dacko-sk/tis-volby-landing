import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import ElectionPeriods from '../components/funding/ElectionPeriods';
import YearsChart from '../components/funding/YearsChart';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

function Government() {
    setTitle(t(labels.government.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.government.pageTitle)}</Title>

            <FundingNav />

            <div id="government">
                <YearsChart />

                <ElectionPeriods />
            </div>
        </section>
    );
}

export default Government;
