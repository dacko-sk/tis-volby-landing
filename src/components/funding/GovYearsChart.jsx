import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';

import useGovData, { csvKeys, subsidyTypes } from '../../hooks/GovData';

import TisBarChart, { subsidyBars } from '../charts/TisBarChart';

function GovYearsChart({ className, party, period }) {
    const { getAggYears, getExtremes } = useGovData();

    const years = {};
    subsidyTypes.forEach((type) => {
        const { paid, est } = getAggYears(period, type, party);
        Object.entries(paid).forEach(([year, subsidy]) => {
            if (!(years[year] ?? false)) {
                years[year] = {
                    name: year,
                };
            }
            years[year][type] = subsidy;
        });
        Object.entries(est).forEach(([year, subsidy]) => {
            if (!(years[year] ?? false)) {
                years[year] = {
                    name: year,
                };
            }
            years[year][type + csvKeys.ESTIMATE] = subsidy;
        });
    });
    const columns = Object.values(years).sort(sortByNumericProp('name', true));

    return (
        <TisBarChart
            className={className}
            bars={subsidyBars(!period, !period, columns)}
            currency
            data={columns}
            lastUpdate={false}
            subtitle={t(
                labels.government[
                    `yearsDisclaimer${party ? 'Party' : ''}${
                        period ? '' : 'All'
                    }`
                ],
                Object.values(getExtremes())
            )}
            title={t(labels.government.yearsTitle)}
        />
    );
}

export default GovYearsChart;
