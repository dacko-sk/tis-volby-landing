import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import { pdKeys, useDonationsStatsData } from '../../hooks/Queries';

import TisBarChart, { columnVariants } from './TisBarChart';
import Loading from '../general/Loading';

function DonationsRegionsUniqueChart() {
    const { data, isLoading, error } = useDonationsStatsData();

    if (isLoading || error) {
        return <Loading error={error} />;
    }

    const regions = Object.entries(data.regions ?? {})
        .map(([region, regData]) => ({
            name: t(labels.regions[region]),
            unique: regData[pdKeys.UNIQUE],
        }))
        .sort(sortByNumericProp('unique'));

    return (
        <TisBarChart
            bars={columnVariants.uniqueDonors}
            data={regions}
            lastUpdate={false}
            subtitle={t(labels.donations.uniqueDonorsDisclaimer)}
            vertical
        />
    );
}

export default DonationsRegionsUniqueChart;
