import {
    candidateChartLabel,
    chartKeys,
    columnVariants,
    partyChartLabel,
} from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { fixNumber, sortByNumericProp } from '../../helpers/helpers';
import { getActiveSubsite } from '../../helpers/languages';
import { routes, segments } from '../../helpers/routes';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

import TisBarChart from '../charts/TisBarChart';

function Top10Ads({ maxItems = 10 }) {
    const {
        findCandidateForGoogleAccount,
        findCandidateForMetaAccount,
        findPartyForFbAccount,
        findPartyForGoogleAccount,
        mergedWeeksData,
        sheetsData,
    } = useAdsData();

    const subsite = getActiveSubsite();
    const isCandidateElection = subsite === 'prezident2024';

    if (isCandidateElection) {
        // parse data
        const spending = {};
        if (sheetsData.lastUpdateFb) {
            Object.entries(mergedWeeksData).forEach(([pageId, pageProps]) => {
                const candidate = findCandidateForMetaAccount(pageId);
                if (candidate) {
                    if (!(spending[candidate] ?? false)) {
                        spending[candidate] = {
                            name: candidateChartLabel(
                                candidate,
                                segments.ONLINE
                            ),
                            [chartKeys.META]: 0,
                            [chartKeys.GOOGLE]: 0,
                            [chartKeys.TOTAL]: 0,
                        };
                    }
                    spending[candidate][chartKeys.META] += pageProps.outgoing;
                    spending[candidate][chartKeys.TOTAL] += pageProps.outgoing;
                }
            });
        }
        if (sheetsData.lastUpdateGgl) {
            sheetsData.googleAds.forEach((pageData) => {
                const candidate = findCandidateForGoogleAccount(
                    pageData[csvConfig.GOOGLE.columns.ID]
                );
                if (candidate) {
                    if (!(spending[candidate] ?? false)) {
                        spending[candidate] = {
                            name: candidateChartLabel(
                                candidate,
                                segments.ONLINE
                            ),
                            [chartKeys.META]: 0,
                            [chartKeys.GOOGLE]: 0,
                            [chartKeys.TOTAL]: 0,
                        };
                    }
                    spending[candidate][chartKeys.GOOGLE] +=
                        pageData[csvConfig.GOOGLE.columns.SPENDING];
                    spending[candidate][chartKeys.TOTAL] +=
                        pageData[csvConfig.GOOGLE.columns.SPENDING];
                }
            });
        }
        const columns = Object.values(spending)
            .sort(sortByNumericProp(chartKeys.TOTAL))
            .slice(0, maxItems);

        return (
            <div id="online-charts">
                <TisBarChart
                    bars={columnVariants.online}
                    buttonLink={routes.online()}
                    buttonText={t(labels.ads.showMore)}
                    currency
                    data={columns}
                    timestamp={Math.min(
                        sheetsData.lastUpdateFb,
                        sheetsData.lastUpdateGgl
                    )}
                    subtitle={t(labels.ads.topDisclaimer)}
                    title={t(labels.ads.topTitle)}
                    vertical
                />
            </div>
        );
    }

    // Party election
    const spendingFb = {};
    if (sheetsData.lastUpdateFb) {
        Object.entries(mergedWeeksData).forEach(([pageId, pageProps]) => {
            const party = findPartyForFbAccount(pageId);
            if (party) {
                if (!(spendingFb[party] ?? false)) {
                    spendingFb[party] = {
                        name: partyChartLabel(party, segments.ONLINE),
                        [chartKeys.OUTGOING]: 0,
                    };
                }
                spendingFb[party][chartKeys.OUTGOING] += pageProps.outgoing;
            }
        });
    }

    const spendingGgl = {};
    if (sheetsData.lastUpdateGgl) {
        sheetsData.googleAds.forEach((pageData) => {
            const party = findPartyForGoogleAccount(
                pageData[csvConfig.GOOGLE.columns.ID]
            );
            if (party) {
                if (!(spendingGgl[party] ?? false)) {
                    spendingGgl[party] = {
                        name: partyChartLabel(party, segments.ONLINE),
                        [chartKeys.OUTGOING]: 0,
                    };
                }
                spendingGgl[party][chartKeys.OUTGOING] += fixNumber(
                    pageData[csvConfig.GOOGLE.columns.SPENDING]
                );
            }
        });
    }

    const columnsFb = Object.values(spendingFb)
        .sort(sortByNumericProp(chartKeys.OUTGOING))
        .slice(0, maxItems);
    const columnsGgl = Object.values(spendingGgl)
        .sort(sortByNumericProp(chartKeys.OUTGOING))
        .slice(0, maxItems);

    return (
        <div id="online-charts">
            <TisBarChart
                bars={columnVariants.spending}
                currency
                data={columnsFb}
                subtitle={t(labels.ads.meta.spending.partiesDisclaimer)}
                timestamp={sheetsData.lastUpdateFb}
                title={t(labels.ads.meta.topTitle)}
                vertical
            />
            <TisBarChart
                bars={columnVariants.spending}
                buttonLink={routes.online()}
                buttonText={t(labels.ads.showMore)}
                currency
                data={columnsGgl}
                subtitle={t(labels.ads.google.spending.partiesDisclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                title={t(labels.ads.google.topTitle)}
                vertical
            />
        </div>
    );
}

export default Top10Ads;
