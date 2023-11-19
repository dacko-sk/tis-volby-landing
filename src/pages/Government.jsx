import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import { subsidyTypes } from '../context/GovDataContext';

import YearsChart from '../components/funding/YearsChart';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

function Government() {
    setTitle(t(labels.donations.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.government.pageTitle)}</Title>

            <FundingNav />

            <div id="government">
                <YearsChart subsidyTypes={subsidyTypes} />
            </div>
        </section>
    );
}

export default Government;
