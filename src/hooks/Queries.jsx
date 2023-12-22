import { useQuery } from '@tanstack/react-query';

import { partyAlias } from '../helpers/parties';

export const useDonationsData = () =>
    useQuery({
        queryKey: ['all_parties_totals'],
        queryFn: () =>
            fetch(
                'https://volby.transparency.sk/api/donors/donors_json.php?f=all_parties'
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
