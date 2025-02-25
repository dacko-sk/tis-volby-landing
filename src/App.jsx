import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { languages } from './helpers/languages';
import {
    homepage,
    languageRoot,
    queries,
    routes,
    segments,
    urlSegment,
} from './helpers/routes';

import ContextProviders from './ContextProviders';
import Layout from './Layout';

import Account from './pages/Account';
import Accounts from './pages/Accounts';
import Article from './pages/Article';
import Charts from './pages/Charts';
import Donations from './pages/Donations';
import Donor from './pages/Donor';
import Government from './pages/Government';
import Home from './pages/Home';
import News from './pages/News';
import Parties from './pages/Parties';
import Party from './pages/Party';
import PartyAccounts from './pages/party/PartyAccounts';
import PartyDonations from './pages/party/PartyDonations';
import PartyGovernment from './pages/party/PartyGovernment';
import PartyOverview from './pages/party/PartyOverview';

import './scss/volby-landing.scss';

function App() {
    return (
        <ContextProviders>
            <BrowserRouter>
                <Routes>
                    <Route path={homepage} element={<Layout />}>
                        <Route index element={<Home />} />

                        {Object.keys(languages).map((lang) =>
                            [
                                [routes.home(lang), Home],
                                [routes.donations(lang), Donations],
                                [
                                    routes.donations(lang) +
                                        queries.searchAndFilter(true),
                                    Donations,
                                ],
                                [routes.donor(true, lang), Donor],
                                [
                                    routes.donor(true, lang) +
                                        queries.searchAndFilter(true),
                                    Donor,
                                ],
                                [routes.government(lang), Government],
                                [routes.charts(lang), Charts],
                                [routes.accounts(lang), Accounts],
                                [
                                    routes.accounts(lang) +
                                        queries.searchAndFilter(true),
                                    Accounts,
                                ],
                                [routes.account(true, lang), Account],
                                [
                                    routes.account(true, lang) +
                                        queries.searchAndFilter(true),
                                    Account,
                                ],
                                [routes.parties(lang), Parties],
                                [
                                    routes.party(true, '', lang),
                                    Party,
                                    [
                                        ['', PartyOverview],
                                        [segments.DONATIONS, PartyDonations],
                                        [
                                            segments.DONATIONS,
                                            PartyDonations,
                                            queries.searchAndFilter(true),
                                        ],
                                        [segments.GOVERNMENT, PartyGovernment],
                                        [segments.ACCOUNTS, PartyAccounts],
                                        [
                                            segments.ACCOUNTS,
                                            PartyAccounts,
                                            queries.searchAndFilter(true),
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
                                                        element={<SubPage />}
                                                    />
                                                );
                                            }
                                            return (
                                                <Route
                                                    key={`${path}index`}
                                                    index
                                                    element={<SubPage />}
                                                />
                                            );
                                        }
                                    )}
                                </Route>
                            ))
                        )}

                        {/* redirect removed funding page */}
                        {Object.keys(languages).map((lang) => (
                            <Route
                                key={lang}
                                path={routes.funding(lang)}
                                element={
                                    <Navigate
                                        replace
                                        to={routes.donations(lang)}
                                    />
                                }
                            />
                        ))}

                        {/* fallback */}
                        <Route
                            path="*"
                            element={<Navigate to={languageRoot()} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ContextProviders>
    );
}

export default App;
