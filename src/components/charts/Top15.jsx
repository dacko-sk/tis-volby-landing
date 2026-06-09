import { LabelList } from 'recharts';
import { getMunicipalityTickText } from '../../helpers/charts';
import { colors } from '../../helpers/constants';
import { wholeCurrencyFormat } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import { finalReportsTypes, municipalTypes } from '../../hooks/AccountsData';

import TisBarChart from './TisBarChart';

import data from '../../../public/samosprava2022/top15.json';

function Top15() {
    // bars style
    const bars = [
        {
            key: 'regional',
            name: 'Výdavky kandidáta na župana',
            color: colors.colorOrange,
            stackId: 'totalSpending',
            label: {
                dataKey: 'regional',
                fill: 'white',
                outline: 2,
                formatter: wholeCurrencyFormat,
                position: 'insideLeft',
            },
        },
        {
            key: 'local',
            name: 'Výdavky kandidáta na primátora',
            color: colors.colorDarkBlue,
            stackId: 'totalSpending',
            label: {
                dataKey: 'local',
                fill: 'white',
                outline: 2,
                formatter: wholeCurrencyFormat,
                position: 'insideLeft',
            },
            labelList: (
                <LabelList
                    dataKey="remarkId"
                    position="insideRight"
                    fill="white"
                />
            ),
        },
    ];

    if (!data) return null;

    // data
    const campaigns = [];
    const remarks = [
        <em className="disclaimer text-start mt-2" key={0}>
            Zdroj: Záverečné správy kandidátov a politických strán a ich
            doplňujúce odpovede pre TIS
        </em>,
    ];
    data.campaigns.forEach((campaign) => {
        campaigns.push({
            name: getMunicipalityTickText(campaign, false),
            [campaign.electionsName === finalReportsTypes[municipalTypes.local]
                ? municipalTypes.local
                : municipalTypes.regional]: campaign.spending,
            remarkId: campaign.remarkId,
        });
        if (campaign?.remarkId !== undefined) {
            remarks.push(
                <em className="disclaimer text-start" key={campaign.remarkId}>
                    {campaign.remarkId} {campaign.remark}
                </em>
            );
        }
    });

    return (
        <TisBarChart
            bars={bars}
            buttonLink={routes.charts()}
            currency
            data={campaigns}
            lastUpdate={false}
            title="Top 15 kampaní v miestnych a župných voľbách 2022"
            vertical
        >
            {remarks}
        </TisBarChart>
    );
}

export default Top15;
