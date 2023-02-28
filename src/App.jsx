import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { segments } from './api/routes';

import ContextProviders from './context/ContextProviders';

import Article from './pages/Article';
import Elections from './pages/Elections';
import Funding from './pages/Funding';
import Home from './pages/Home';
import News from './pages/News';
import Search from './pages/Search';

import Layout from './components/structure/Layout';

import './scss/volby-landing.scss';

const queryClient = new QueryClient();

function App() {
    return (
        <ContextProviders>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path={segments.ROOT} element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route
                                path={segments.ELECTIONS}
                                element={<Elections />}
                            />
                            <Route path={segments.NEWS} element={<News />} />
                            <Route
                                path={segments.FUNDING}
                                element={<Funding />}
                            />
                            <Route
                                path={`${segments.NEWS}/:slug`}
                                element={<Article />}
                            />
                            <Route
                                path={`${segments.SEARCH}/:query`}
                                element={<Search />}
                            />

                            {/* fallback */}
                            <Route
                                path="*"
                                element={<Navigate to={segments.ROOT} />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ContextProviders>
    );
}

export default App;
