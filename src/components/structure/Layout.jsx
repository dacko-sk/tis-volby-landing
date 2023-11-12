import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { scrollToTop } from '../../helpers/browser';

import Header from './Header';
import Footer from './Footer';
import DonateBanner from '../general/DonateBanner';
// import DonateModal from '../general/DonateModal';

function Layout() {
    const { pathname } = useLocation();

    // send pageview to analytics on route change
    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            window.dataLayer.push({
                event: 'pageview',
                page: {
                    path: pathname,
                    title: document.title,
                },
            });
        }
    }, [pathname]);

    // scroll to top when route changes
    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    return (
        <div className="layout-default">
            <Header />

            <main className="container mb-4">
                <Outlet />
            </main>

            <DonateBanner />

            <Footer />
            {/* <DonateModal /> */}
        </div>
    );
}

export default Layout;
