import React from 'react';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';

import { elections as el, icons, links } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { nl2r } from '../../helpers/helpers';

function IconContent({ icon, label }) {
    return (
        <>
            <img src={icon} />
            <span className="mt-2 mt-sm-3">{nl2r(t(label))}</span>
        </>
    );
}

function SiteNavigator({ site }) {
    return (
        <div id="site-navigator">
            <h2 className="text-white mb-3">{t(labels.sitesTitle)}</h2>
            <Row>
                <Col xs={6} sm={4} lg>
                    <a href="/" className="sn-icon">
                        <IconContent
                            icon={icons.elections.f}
                            label={labels.sites.root}
                        />
                    </a>
                </Col>
                {[
                    [el.s22, icons.elections.r, labels.sites.regional],
                    [
                        [el.n23, el.n20],
                        icons.elections.n,
                        labels.sites.national,
                    ],
                    [
                        [el.p24, el.p19],
                        icons.elections.p,
                        labels.sites.president,
                    ],
                    [el.e24, icons.elections.e, labels.sites.european],
                ].map(([key, icon, label]) => {
                    const isDropdown = Array.isArray(key);
                    return (
                        <Col key={key} xs={6} sm={4} lg>
                            {isDropdown ? (
                                <Dropdown
                                    className="h-100"
                                    drop="down-centered"
                                >
                                    <Dropdown.Toggle
                                        className="sn-icon"
                                        variant="transparent"
                                    >
                                        <IconContent
                                            icon={icon}
                                            label={label}
                                        />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {key.map((di) => (
                                            <Dropdown.Item
                                                key={di}
                                                href={links[di]}
                                                active={site === di}
                                            >
                                                {t(labels.elections[di])}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <a href={links[key]} className="sn-icon">
                                    <IconContent icon={icon} label={label} />
                                </a>
                            )}
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default SiteNavigator;
