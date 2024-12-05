import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

function FundingNav() {
    return (
        <div className="tabs-scrollable mb-4">
            <Nav variant="tabs">
                <Nav.Link as={NavLink} to={routes.funding()} end>
                    {t(labels.funding.overview)}
                </Nav.Link>
                <Nav.Link as={NavLink} to={routes.donations()}>
                    <span className="d-md-none">
                        {t(labels.donations.navTitleShort)}
                    </span>
                    <span className="d-none d-md-inline">
                        {t(labels.donations.navTitle)}
                    </span>
                </Nav.Link>
                <Nav.Link as={NavLink} to={routes.government()}>
                    <span className="d-md-none">
                        {t(labels.government.navTitleShort)}
                    </span>
                    <span className="d-none d-md-inline">
                        {t(labels.government.navTitle)}
                    </span>
                </Nav.Link>
                <Nav.Link as={NavLink} to={routes.accounts()}>
                    <span className="d-md-none">
                        {t(labels.accounts.navTitleShort)}
                    </span>
                    <span className="d-none d-md-inline">
                        {t(labels.accounts.navTitle)}
                    </span>
                </Nav.Link>
            </Nav>
        </div>
    );
}

export default FundingNav;
