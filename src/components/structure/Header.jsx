import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { labels, t } from '../../helpers/dictionary';
import { getCurrentLanguage, languages } from '../../helpers/languages';
import { localizePath, routes } from '../../helpers/routes';

import SiteSelector from './SiteSelector';
import DonateButton from '../general/DonateButton';
// import SearchField from '../general/SearchField';

import logo from '../../../public/img/tis-logo-blue.png';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to={routes.home()}>
                    <img src={logo} alt={t(labels.tis)} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-menu" />
                <Navbar.Collapse id="main-menu">
                    <Nav
                        defaultActiveKey={routes.home()}
                        variant="pills"
                        className="me-auto"
                    >
                        <SiteSelector />
                        <Nav.Link as={NavLink} to={routes.donations()}>
                            <span className="d-none d-lg-inline d-xl-none">
                                {t(labels.donations.navTitleShort)}
                            </span>
                            <span className="d-lg-none d-md-inline d-xl-inline">
                                {t(labels.donations.navTitle)}
                            </span>
                        </Nav.Link>
                        {/* <Nav.Link as={NavLink} to={routes.government()}>
                            {t(labels.government.navTitle)}
                        </Nav.Link> */}
                        <Nav.Link as={NavLink} to={routes.accounts()}>
                            <span className="d-none d-lg-inline d-xl-none">
                                {t(labels.accounts.navTitleShort)}
                            </span>
                            <span className="d-lg-none d-md-inline d-xl-inline">
                                {t(labels.accounts.navTitle)}
                            </span>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.news()}>
                            {t(labels.news.navTitle)}
                        </Nav.Link>
                        <NavDropdown
                            title={t(labels.funding.navTitle)}
                            className={
                                [
                                    routes.parties(),
                                    // routes.donations(),
                                    routes.government(),
                                    // routes.accounts(),
                                    routes.charts(),
                                ].some((path) =>
                                    document.location.pathname.startsWith(path)
                                )
                                    ? 'show'
                                    : ''
                            }
                        >
                            <NavDropdown.Item
                                as={NavLink}
                                to={routes.parties()}
                            >
                                {t(labels.parties.navTitle)}
                            </NavDropdown.Item>
                            {/* <NavDropdown.Item
                                as={NavLink}
                                to={routes.donations()}
                            >
                                {t(labels.donations.navTitle)}
                            </NavDropdown.Item> */}
                            <NavDropdown.Item
                                as={NavLink}
                                to={routes.government()}
                            >
                                {t(labels.government.navTitle)}
                            </NavDropdown.Item>
                            {/* <NavDropdown.Item
                                as={NavLink}
                                to={routes.accounts()}
                            >
                                {t(labels.accounts.navTitle)}
                            </NavDropdown.Item> */}
                            <NavDropdown.Item as={NavLink} to={routes.charts()}>
                                {t(labels.charts.pageTitle)}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav variant="pills" className="me-2">
                        <NavDropdown
                            title={getCurrentLanguage()}
                            id="language-menu"
                            align="end"
                            className="text-uppercase"
                        >
                            {Object.keys(languages).map((lang) => (
                                <NavDropdown.Item
                                    key={lang}
                                    as={NavLink}
                                    to={localizePath(lang)}
                                >
                                    {lang}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    {/* <SearchField /> */}
                    <DonateButton xl />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
