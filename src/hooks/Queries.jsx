import { useQuery } from '@tanstack/react-query';

import { partyAlias } from '../helpers/parties';

export const pdKeys = {
    DONATIONS: 'donations',
    CREDITS: 'credits',
};

export const usePartiesDonationsData = () =>
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
                ([partyName, partyData]) => {
                    parties[partyAlias(partyName)] = partyData;
                }
            );
            return parties;
        },
    });

export const allDonationsParties = () => {
    const { data, isLoading, error } = usePartiesDonationsData();
    return isLoading || error ? [] : Object.keys(data);
};
