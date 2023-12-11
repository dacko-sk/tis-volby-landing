import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CookiesProvider } from './hooks/Cookies';
import { GovDataProvider } from './hooks/GovData';

const queryClient = new QueryClient();

function ContextProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <GovDataProvider>
                <CookiesProvider>{children}</CookiesProvider>;
            </GovDataProvider>
        </QueryClientProvider>
    );
}

export default ContextProviders;
