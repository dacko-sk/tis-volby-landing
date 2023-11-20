import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import useGovData, { subsidyTypes } from '../../context/GovDataContext';

import TisBarChart, {
    columnVariants,
    subsidyBars,
} from '../charts/TisBarChart';

function YearsChart({ electionPeriod, lastElection, party }) {
    const { getAggYears, govData } = useGovData();
    const bars = subsidyBars(subsidyTypes.slice().reverse());

    // parse data
    const years = {};
    subsidyTypes.forEach((type) => {
        Object.entries(
            getAggYears(
                lastElection ? govData.lastElection : electionPeriod,
                type,
                party
            )
        ).forEach(([year, subsidy]) => {
            if (!(years[year] ?? false)) {
                years[year] = {
                    name: year,
                };
            }
            years[year][type ?? columnVariants.subsidies[0].key] = subsidy;
        });
    });
    const columns = Object.values(years).sort(sortByNumericProp('name', true));

    return (
        <TisBarChart
            className="mb-4"
            bars={bars}
            currency
            data={columns}
            subtitle={t(labels.government.yearsDisclaimer)}
            timestamp="2023-09-30T23:59:59"
            title={t(labels.government.yearsTitle)}
        />
    );
}

export default YearsChart;
