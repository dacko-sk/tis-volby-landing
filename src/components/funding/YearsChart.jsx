import { labels, t } from '../../helpers/dictionary';

import useGovData from '../../context/GovDataContext';

import TisBarChart, { columnVariants } from '../charts/TisBarChart';

function YearsChart({ electionPeriod, lastElection, subsidyType, party }) {
    const { getYears, govData } = useGovData();

    // parse data
    const columns = [];
    Object.entries(
        getYears(
            lastElection ? govData.lastElection : electionPeriod,
            subsidyType,
            party
        )
    ).forEach(([year, subsidy]) => {
        columns.push({
            name: year,
            incoming: subsidy,
        });
    });

    return (
        <TisBarChart
            className="mb-4"
            bars={columnVariants.subsidies}
            currency
            data={columns}
            subtitle={t(labels.government.yearsDisclaimer)}
            timestamp="2023-09-30T23:59:59"
            title={t(labels.government.yearsTitle)}
        />
    );
}

export default YearsChart;
