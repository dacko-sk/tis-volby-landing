import { partyChartLabel } from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import { pdKeys, usePartiesDonationsData } from '../../hooks/Queries';

import TisBarChart, { columnVariants } from '../charts/TisBarChart';
import Loading from '../general/Loading';

function PartiesDonationsChart({ limit }) {
    const { data, isLoading, error } = usePartiesDonationsData();

    if (isLoading || error) {
        return <Loading error={error} />;
    }

    const parties = {};
    Object.entries(data).forEach(([partyName, partyData]) => {
        if (!(parties[partyName] ?? false)) {
            parties[partyName] = {
                name: partyChartLabel(partyName),
                total: 0,
            };
        }
        parties[partyName].donations = partyData[pdKeys.DONATIONS];
        parties[partyName].credits = partyData[pdKeys.CREDITS];
        parties[partyName].total +=
            partyData[pdKeys.DONATIONS] + partyData[pdKeys.CREDITS];
    });
    const totals = Object.values(parties).sort(sortByNumericProp('total'));

    return (
        <TisBarChart
            className="mt-4"
            bars={columnVariants.donations}
            currency
            data={totals}
            lastUpdate={false}
            subtitle={t(labels.donations.topPartiesDisclaimer)}
            title={t(labels.donations.topParties)}
            vertical
        />
    );
}

export default PartiesDonationsChart;
