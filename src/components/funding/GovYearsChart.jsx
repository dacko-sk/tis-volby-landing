import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import useGovData, { subsidyTypes } from '../../hooks/GovData';

import TisBarChart, {
    columnVariants,
    subsidyBars,
} from '../charts/TisBarChart';

function GovYearsChart({ className, lastElection, party, period }) {
    const { getAggYears, govData } = useGovData();

    const years = {};
    subsidyTypes.forEach((type) => {
        Object.entries(
            getAggYears(
                lastElection ? govData.lastElection : period,
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
            className={className}
            bars={subsidyBars(!period, !period)}
            currency
            data={columns}
            lastUpdate={false}
            subtitle={t(
                labels.government[
                    `yearsDisclaimer${party ? 'Party' : ''}${
                        period ? '' : 'All'
                    }`
                ]
            )}
            title={t(labels.government.yearsTitle)}
        />
    );
}

export default GovYearsChart;
