import { Col, Row } from 'react-bootstrap';

import { labels, t } from '../../helpers/dictionary';
import {
    currencyFormat,
    fixNumber,
    wholeNumFormat,
} from '../../helpers/helpers';

import useAdsData, { csvConfig, csvFiles } from '../../hooks/AdsData';

import LastUpdateTag from '../general/LastUpdateTag';

function TotalAdsSpending({
    googleColumns = csvConfig[csvFiles.GOOGLE].columns,
    provider = null,
}) {
    const {
        sheetsData,
        mergedWeeksData,
        metaApiData,
        findPartyForFbAccount,
        findPartyForGoogleAccount,
        findCandidateForMetaAccount,
        findCandidateForGoogleAccount,
    } = useAdsData();

    // parse data
    let totalMeta = 0;
    let totalMetaAds = 0;
    let totalGoogle = 0;
    let totalGoogleAds = 0;
    const hasMeta =
        (!provider || provider === 'facebook') &&
        !!sheetsData.lastUpdateFb &&
        sheetsData.lastUpdateFb > 0;
    const hasGoogle =
        (!provider || provider === 'google') &&
        !!sheetsData.lastUpdateGgl &&
        sheetsData.lastUpdateGgl > 0;
    const hideCounts = !provider && hasMeta && hasGoogle;

    if (hasMeta) {
        Object.values(mergedWeeksData).forEach((pageData) => {
            totalMeta += pageData.outgoing;
        });
        if (metaApiData && metaApiData.loaded && metaApiData.pages) {
            Object.entries(metaApiData.pages).forEach(([pageId, pageProps]) => {
                if (
                    findPartyForFbAccount(pageId) ||
                    findCandidateForMetaAccount(pageId)
                ) {
                    totalMetaAds += pageProps.spend.num ?? 0;
                }
            });
        } else {
            Object.values(mergedWeeksData).forEach((pageData) => {
                totalMetaAds += pageData.amount ?? 0;
            });
        }
    }
    if (hasGoogle) {
        sheetsData.googleAds.forEach((pageData) => {
            if (
                findPartyForGoogleAccount(pageData[googleColumns.ID]) ||
                findCandidateForGoogleAccount(pageData[googleColumns.ID])
            ) {
                totalGoogle += fixNumber(pageData[googleColumns.SPENDING]);
                totalGoogleAds += fixNumber(pageData[googleColumns.AMOUNT]);
            }
        });
    }

    const count =
        (hasMeta ? (hideCounts ? 1 : 2) : 0) +
        (hasGoogle ? (hideCounts ? 1 : 2) : 0);
    const colWidth = count > 0 ? 12 / count : 12;

    return (
        <div className="total-spending mt-4">
            <Row className="gy-3 gy-lg-0 text-center mb-4 justify-content-center">
                {hasMeta && (
                    <>
                        <Col md={6} lg={colWidth}>
                            <h2>{t(labels.ads.meta.totalSpendingTitle)}</h2>
                            <div className="hero-number">
                                {currencyFormat(totalMeta)}
                                <LastUpdateTag
                                    timestamp={sheetsData.lastUpdateFb || null}
                                >
                                    {t(labels.ads.meta.totalDisclaimer)}
                                </LastUpdateTag>
                            </div>
                        </Col>
                        {!hideCounts && (
                            <Col md={6} lg={colWidth}>
                                <h2>{t(labels.ads.amount.title)} (Meta)</h2>
                                <div className="hero-number">
                                    {wholeNumFormat(totalMetaAds)}
                                    <LastUpdateTag
                                        timestamp={
                                            sheetsData.lastUpdateFb || null
                                        }
                                    >
                                        {t(labels.ads.amount.disclaimer)}
                                    </LastUpdateTag>
                                </div>
                            </Col>
                        )}
                    </>
                )}
                {hasGoogle && (
                    <>
                        <Col md={6} lg={colWidth}>
                            <h2>{t(labels.ads.google.totalSpendingTitle)}</h2>
                            <div className="hero-number">
                                {currencyFormat(totalGoogle)}
                                <LastUpdateTag
                                    timestamp={sheetsData.lastUpdateGgl || null}
                                >
                                    {t(labels.ads.google.totalDisclaimer)}
                                </LastUpdateTag>
                            </div>
                        </Col>
                        {!hideCounts && (
                            <Col md={6} lg={colWidth}>
                                <h2>{t(labels.ads.amount.title)} (Google)</h2>
                                <div className="hero-number">
                                    {wholeNumFormat(totalGoogleAds)}
                                    <LastUpdateTag
                                        timestamp={
                                            sheetsData.lastUpdateGgl || null
                                        }
                                    >
                                        {t(labels.ads.amount.disclaimer)}
                                    </LastUpdateTag>
                                </div>
                            </Col>
                        )}
                    </>
                )}
            </Row>
        </div>
    );
}

export default TotalAdsSpending;
