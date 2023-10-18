import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { elections as el, links } from '../../api/constants';
import { labels, t } from '../../api/dictionary';
import {
    getCurrentLanguage,
    languages,
    localizePath,
    routes,
} from '../../api/routes';

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
                        <Nav.Link as={NavLink} to={routes.home()}>
                            {t(labels.home.navTitle)}
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.donations()}>
                            {t(labels.donors.navTitle)}
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.news()}>
                            {t(labels.news.navTitle)}
                        </Nav.Link>
                        <NavDropdown
                            title={t(labels.elections.title)}
                            id="elections-menu"
                        >
                            {Object.keys(el).map((e) => (
                                <NavDropdown.Item key={e} href={links[e]}>
                                    {t(labels.elections[e])}
                                </NavDropdown.Item>
                            ))}
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
                                    href={localizePath(lang)}
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
