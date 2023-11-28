import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import useGovData, { subsidyTypes } from '../../context/GovDataContext';

import TisBarChart, {
    columnVariants,
    subsidyBars,
} from '../charts/TisBarChart';

function YearsChart({ className, electionPeriod, lastElection, party }) {
    const { getAggYears, govData } = useGovData();

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
            className={className}
            bars={subsidyBars(!electionPeriod, !electionPeriod)}
            currency
            data={columns}
            lastUpdate={false}
            subtitle={t(
                labels.government[
                    `yearsDisclaimer${party ? 'Party' : ''}${
                        electionPeriod ? '' : 'All'
                    }`
                ]
            )}
            title={t(labels.government.yearsTitle)}
        />
    );
}

export default YearsChart;
