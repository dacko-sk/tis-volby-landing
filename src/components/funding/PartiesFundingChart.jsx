import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { partyChartLabel } from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp, sumOfValues } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import useGovData from '../../hooks/GovData';
import { pdKeys, usePartiesDonationsData } from '../../hooks/Queries';

import TisBarChart, { columnVariants } from '../charts/TisBarChart';
import Loading from '../general/Loading';

function PartiesFundingChart({ limit }) {
    const { data, isLoading, error } = usePartiesDonationsData();
    const { getPartiesTotals, getExtremes } = useGovData();

    if (isLoading || error) {
        return <Loading error={error} />;
    }

    const parties = {};
    Object.entries(getPartiesTotals()).forEach(([partyName, subsidyTypes]) => {
        if (!(parties[partyName] ?? false)) {
            parties[partyName] = {
                name: partyChartLabel(partyName),
                total: 0,
            };
        }
        const amount = sumOfValues(subsidyTypes);
        parties[partyName].government = amount;
        parties[partyName].total += amount;
    });
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

    return totals.length ? (
        <>
            <TisBarChart
                className="mt-4"
                bars={columnVariants.funding}
                currency
                data={limit ? totals.slice(0, limit) : totals}
                lastUpdate={false}
                subtitle={t(
                    labels.funding.partiesTotalDisclaimer,
                    Object.values(getExtremes())
                )}
                title={t(
                    labels.funding[`partiesTotal${!limit ? 'All' : ''}`],
                    limit ? [limit] : []
                )}
                vertical
            />
            {limit && (
                <div className="text-center mt-3">
                    <Button as={Link} to={routes.funding()} variant="secondary">
                        {t(labels.funding.learnMore)}
                    </Button>
                </div>
            )}
        </>
    ) : null;
}

export default PartiesFundingChart;
