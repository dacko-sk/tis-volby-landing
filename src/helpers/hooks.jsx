import { useQuery } from '@tanstack/react-query';

import { partyAlias } from './parties';

export const useDonationsData = () =>
    useQuery({
        queryKey: ['all_parties_totals'],
        queryFn: () =>
            fetch(
                'https://volby.transparency.sk/api/donors/reload_parties.php'
            ).then((response) => response.json()),
        refetchOnMount: false,
        select: (data) => {
            const parties = {};
            Object.entries(data.parties ?? {}).forEach(
                ([partyName, donations]) => {
                    parties[partyAlias(partyName)] = donations;
                }
            );
            return parties;
        },
    });
