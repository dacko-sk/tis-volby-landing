import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { partyChartLabel } from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp, sumOfValues } from '../../helpers/helpers';
import { routes, segments } from '../../helpers/routes';

import useGovData from '../../hooks/GovData';

import TisBarChart, { subsidyBars } from '../charts/TisBarChart';

function GovTotalsChart({ limit, period }) {
    const { getPartiesTotals } = useGovData();

    const parties = {};
    Object.entries(getPartiesTotals(period)).forEach(([partyName, st]) => {
        if (!(parties[partyName] ?? false)) {
            parties[partyName] = {
                ...st,
                name: partyChartLabel(partyName, segments.GOVERNMENT),
                total: sumOfValues(st),
            };
        }
    });
    const totals = Object.values(parties).sort(sortByNumericProp('total'));

    return totals.length ? (
        <>
            <TisBarChart
                className="mt-4"
                bars={subsidyBars(true)}
                currency
                data={limit ? totals.slice(0, limit) : totals}
                lastUpdate={false}
                subtitle={t(
                    labels.government[
                        `partiesTotal${period ? 'Period' : ''}Disclaimer`
                    ]
                )}
                title={t(
                    labels.government[
                        `partiesTotal${!limit && !period ? 'All' : ''}${
                            period ? 'Period' : ''
                        }`
                    ],
                    limit ? [limit] : []
                )}
                vertical
            />
            {limit && (
                <div className="text-center mt-3">
                    <Button
                        as={Link}
                        to={routes.government()}
                        variant="secondary"
                    >
                        {t(labels.government.learnMore)}
                    </Button>
                </div>
            )}
        </>
    ) : null;
}

export default GovTotalsChart;
