import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { languageRoot, segments, separators, urlSegment } from './api/routes';

import ContextProviders from './context/ContextProviders';

import Article from './pages/Article';
import Donations from './pages/Donations';
import Donor from './pages/Donor';
import Home from './pages/Home';
import News from './pages/News';
// import Search from './pages/Search';

import Layout from './components/structure/Layout';

import './scss/volby-landing.scss';

const queryClient = new QueryClient();

function App() {
    return (
        <ContextProviders>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path={languageRoot()} element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route
                                path={urlSegment(segments.NEWS)}
                                element={<News />}
                            />
                            <Route
                                path={[urlSegment(segments.NEWS), ':slug'].join(
                                    separators.url
                                )}
                                element={<Article />}
                            />
                            <Route
                                path={urlSegment(segments.FUNDING)}
                                element={<Donations />}
                            />
                            <Route
                                path={[
                                    urlSegment(segments.FUNDING),
                                    ':query',
                                ].join(separators.url)}
                                element={<Donations />}
                            />
                            <Route
                                path={[
                                    urlSegment(segments.FUNDING),
                                    urlSegment(segments.DONOR),
                                    ':id',
                                ].join(separators.url)}
                                element={<Donor />}
                            />
                            {/* <Route
                                path={`${urlSegment(segments.SEARCH)}${separators.url}:query`}
                                element={<Search />}
                            /> */}

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
