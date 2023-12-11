import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
    homepage,
    languageRoot,
    languages,
    queries,
    routes,
    segments,
    urlSegment,
} from './helpers/routes';

import ContextProviders from './context/ContextProviders';

import Accounts from './pages/Accounts';
import Article from './pages/Article';
import Donations from './pages/Donations';
import Donor from './pages/Donor';
import Funding from './pages/Funding';
import Government from './pages/Government';
import Home from './pages/Home';
import News from './pages/News';
import Parties from './pages/Parties';
import Party from './pages/Party';
import PartyDonations from './pages/party/PartyDonations';
import PartyGovernment from './pages/party/PartyGovernment';
import PartyOverview from './pages/party/PartyOverview';

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
                                    [routes.funding(lang), Funding],
                                    [routes.donations(lang), Donations],
                                    [
                                        routes.donations(lang) +
                                            queries.donations(true),
                                        Donations,
                                    ],
                                    [routes.donor(true, lang), Donor],
                                    [
                                        routes.donor(true, lang) +
                                            queries.donations(true),
                                        Donor,
                                    ],
                                    [routes.government(lang), Government],
                                    [routes.accounts(lang), Accounts],
                                    [routes.parties(lang), Parties],
                                    [
                                        routes.party(true, '', lang),
                                        Party,
                                        [
                                            ['', PartyOverview],
                                            [
                                                segments.DONATIONS,
                                                PartyDonations,
                                            ],
                                            [
                                                segments.DONATIONS,
                                                PartyDonations,
                                                queries.donations(true),
                                            ],
                                            [
                                                segments.GOVERNMENT,
                                                PartyGovernment,
                                            ],
                                        ],
                                    ],
                                    [routes.news(lang), News],
                                    [routes.article(true, lang), Article],
                                ].map(([path, Page, subpages]) => (
                                    <Route
                                        key={lang + path}
                                        path={path}
                                        element={<Page />}
                                    >
                                        {(subpages ?? []).map(
                                            ([subSegment, SubPage, suffix]) => {
                                                if (subSegment) {
                                                    const subPath =
                                                        urlSegment(
                                                            subSegment,
                                                            lang
                                                        ) + (suffix ?? '');
                                                    return (
                                                        <Route
                                                            key={path + subPath}
                                                            path={subPath}
                                                            element={
                                                                <SubPage />
                                                            }
                                                        />
                                                    );
                                                }
                                                return (
                                                    <Route
                                                        key={path + 'index'}
                                                        index={true}
                                                        element={<SubPage />}
                                                    />
                                                );
                                            }
                                        )}
                                    </Route>
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
