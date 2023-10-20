import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { homepage, languageRoot, languages, routes } from './api/routes';

import ContextProviders from './context/ContextProviders';

import Article from './pages/Article';
import Donations from './pages/Donations';
import Donor from './pages/Donor';
import Home from './pages/Home';
import News from './pages/News';

import Layout from './components/structure/Layout';

import './scss/volby-landing.scss';

const queryClient = new QueryClient();

function App() {
    return (
        <ContextProviders>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path={homepage} element={<Layout />}>
                            <Route index element={<Home />} />

                            {Object.keys(languages).map((lang) =>
                                [
                                    [routes.home(lang), Home],
                                    [routes.news(lang), News],
                                    [routes.article(true, lang), Article],
                                    [routes.donations(false, lang), Donations],
                                    [routes.donations(true, lang), Donations],
                                    [routes.donor(true, lang), Donor],
                                ].map(([path, Page]) => (
                                    <Route
                                        key={lang + path}
                                        path={path}
                                        element={<Page />}
                                    />
                                ))
                            )}

                            {/* fallback */}
                            <Route
                                path="*"
                                element={<Navigate to={languageRoot()} />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ContextProviders>
    );
}

export default App;
