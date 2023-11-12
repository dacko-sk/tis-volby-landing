import { CookiesProvider } from './CookiesContext';
import { GovDataProvider } from './GovDataContext';

function ContextProviders({ children }) {
    return (
        <GovDataProvider>
            <CookiesProvider>{children}</CookiesProvider>;
        </GovDataProvider>
    );
}

export default ContextProviders;
