import { dates } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import {
    chartKeys,
    columnVariants,
    partyChartLabel,
    candidateChartLabel,
} from '../../helpers/charts';
import {
    getTimestampFromIsoDate,
    sortByNumericProp,
} from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import useAccountsData, {
    aggregatedKeys as agk,
} from '../../hooks/AccountsData';
import useAdsData, { csvConfig } from '../../hooks/AdsData';
import { getActiveSubsite } from '../../helpers/languages';

import TisBarChart from '../charts/TisBarChart';

import Loading from '../general/Loading';

function Top10FinalReports({ maxItems = 10 }) {
    const {
        findPartyByName,
        getAllPartiesNames,
        getPartyAdsData,
        allCandidatesNames,
        candidateAdsData,
    } = useAdsData();

    const subsite = getActiveSubsite();
    const finalReports =
        subsite === 'euro2024' ||
        subsite === 'prezident2024' ||
        subsite === 'parlament2023';

    if (finalReports) {
        const isPrezident = subsite === 'prezident2024';
        const names = isPrezident ? allCandidatesNames() : getAllPartiesNames();
        const columns = (names ?? []).map((name) => {
            const adsData = isPrezident
                ? candidateAdsData(name)
                : getPartyAdsData(name);
            return {
                name: isPrezident
                    ? candidateChartLabel(name)
                    : partyChartLabel(name),
                [chartKeys.PRECAMPAIGN]:
                    adsData[csvConfig.ACCOUNTS.columns.PRECAMPAIGN],
                [chartKeys.CAMPAIGN]:
                    adsData[csvConfig.ACCOUNTS.columns.CAMPAIGN],
                [chartKeys.TOTAL]:
                    adsData[csvConfig.ACCOUNTS.columns.PRECAMPAIGN] +
                    adsData[csvConfig.ACCOUNTS.columns.CAMPAIGN],
            };
        });

        return (
            <TisBarChart
                bars={columnVariants.finalReport}
                className="mb-4"
                currency
                data={columns
                    .sort(sortByNumericProp(chartKeys.TOTAL))
                    .slice(0, maxItems)}
                subtitle={`${t(labels.charts.finalReport.disclaimer)} ${t(
                    labels.charts.disclaimerClick
                )}`}
                title={t(labels.charts.finalReport.title)}
                timestamp={getTimestampFromIsoDate(dates.monitoringEnd)}
                vertical
            />
        );
    }

    const { accountsData } = useAccountsData();

    const columns = (accountsData.data ?? []).flatMap((row) => {
        const party = findPartyByName(row[agk.name]);
        return party
            ? [
                  {
                      name: partyChartLabel(party[0]),
                      [chartKeys.INCOMING]: row[agk.incoming],
                      [chartKeys.OUTGOING]: row[agk.outgoing],
                  },
              ]
            : [];
    });

    return (
        <TisBarChart
            className="mb-4"
            currency
            data={columns
                .sort(sortByNumericProp(chartKeys.OUTGOING))
                .slice(0, maxItems)}
            subtitle={`${t(labels.charts.disclaimer)} ${t(
                labels.charts.disclaimerClick
            )}`}
            title={t(labels.charts.top10)}
            timestamp={accountsData.lastUpdate}
            showSum={false}
            vertical
        />
    );
}

export default Top10FinalReports;
