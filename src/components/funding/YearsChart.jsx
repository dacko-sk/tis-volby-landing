import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import useGovData, { subsidyColors } from '../../context/GovDataContext';

import TisBarChart, { columnVariants } from '../charts/TisBarChart';

function YearsChart({
    electionPeriod,
    lastElection,
    subsidyTypes = [],
    party,
}) {
    const { getYears, govData } = useGovData();
    const bars = subsidyTypes.length
        ? subsidyTypes.map((type) => ({
              key: type,
              name: labels.government[type],
              color: subsidyColors[type],
              stackId: 'govtypes',
          }))
        : columnVariants.subsidies;

    // parse data
    const years = {};
    (subsidyTypes.length ? subsidyTypes : [null]).forEach((type) => {
        Object.entries(
            getYears(
                lastElection ? govData.lastElection : electionPeriod,
                type,
                party
            )
        ).forEach(([year, subsidy]) => {
            if (!(years[year] ?? false)) {
                years[year] = {
                    name: year,
                    year,
                };
            }
            years[year][type ?? columnVariants.subsidies[0].key] = subsidy;
        });
    });
    const columns = Object.values(years).sort(sortByNumericProp('year', true));

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
