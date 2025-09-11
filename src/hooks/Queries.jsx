import { useQuery } from '@tanstack/react-query';

import { apiEndpoints } from '../helpers/dontaions';
import { partyAlias } from '../helpers/parties';

export const pdKeys = {
    DONATIONS: 'donations',
    CREDITS: 'credits',
    UNIQUE: 'unique',
};

export const usePartiesDonationsData = () =>
    useQuery({
        queryKey: ['all_parties_totals'],
        queryFn: () =>
            fetch(apiEndpoints.parties).then((response) => response.json()),
        refetchOnMount: false,
        select: (data) => {
            const parties = {};
            Object.entries(data.parties ?? {}).forEach(
                ([partyName, partyData]) => {
                    const alias = partyAlias(partyName);
                    // init object
                    parties[alias] = parties[alias] ?? {};
                    // add values
                    Object.values(pdKeys).forEach((key) => {
                        parties[alias][key] =
                            (parties[alias][key] ?? 0) + (partyData[key] ?? 0);
                    });
                }
            );
            return parties;
        },
    });

export const allDonationsParties = () => {
    const { data, isLoading, error } = usePartiesDonationsData();
    return isLoading || error ? [] : Object.keys(data);
};

export const useDonationsStatsData = () =>
    useQuery({
        queryKey: ['stats'],
        queryFn: () =>
            fetch(apiEndpoints.stats).then((response) => response.json()),
        refetchOnMount: false,
        select: (data) => data.stats ?? {},
    });
