import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CookiesProvider } from './hooks/Cookies';
import { GovDataProvider } from './hooks/GovData';
import { AccountsDataProvider } from './hooks/AccountsData';
import { AdsDataProvider } from './hooks/AdsData';

const queryClient = new QueryClient();

function ContextProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AccountsDataProvider>
                <AdsDataProvider>
                    <GovDataProvider>
                        <CookiesProvider>{children}</CookiesProvider>
                    </GovDataProvider>
                </AdsDataProvider>
            </AccountsDataProvider>
        </QueryClientProvider>
    );
}

export default ContextProviders;
