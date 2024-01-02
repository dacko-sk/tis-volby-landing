import { partyChartLabel } from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import { pdKeys, usePartiesDonationsData } from '../../hooks/Queries';

import TisBarChart, { columnVariants } from '../charts/TisBarChart';
import Loading from '../general/Loading';

function UniqueDonorsChart() {
    const { data, isLoading, error } = usePartiesDonationsData();

    if (isLoading || error) {
        return <Loading error={error} />;
    }

    const parties = {};
    Object.entries(data).forEach(([partyName, partyData]) => {
        parties[partyName] = {
            name: partyChartLabel(partyName),
            unique: partyData[pdKeys.UNIQUE],
        };
    });
    const totals = Object.values(parties).sort(sortByNumericProp('unique'));

    return (
        <TisBarChart
            className="mt-4"
            bars={columnVariants.uniqueDonors}
            data={totals}
            lastUpdate={false}
            subtitle={t(labels.donations.uniqueDonorsDisclaimer)}
            title={t(labels.donations.uniqueDonors)}
            vertical
        />
    );
}

export default UniqueDonorsChart;
