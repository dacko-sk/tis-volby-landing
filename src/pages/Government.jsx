import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

function Government() {
    setTitle(t(labels.donations.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.government.pageTitle)}</Title>

            <FundingNav />

            <div id="government">government</div>
        </section>
    );
}

export default Government;
