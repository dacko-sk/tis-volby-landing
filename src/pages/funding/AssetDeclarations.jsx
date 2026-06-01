import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';

import FundingNav from '../../components/structure/FundingNav';
import Title from '../../components/structure/Title';
import AssetDeclarationsSearch from '../../components/assets/AssetDeclarationsSearch';

function AssetDeclarations() {
    setTitle(t(labels.assetDeclarations.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>
                {t(labels.assetDeclarations.pageTitle)}
            </Title>

            <FundingNav />

            <AssetDeclarationsSearch />
        </section>
    );
}

export default AssetDeclarations;
