import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { dateFormat, openInNewTab } from '../../api/helpers';

import defaultImg from '../../../public/img/tis-logo-blue.png';

import './ElectionsPreview.scss';

function ElectionsPreview({
    children,
    date,
    fadeImg = null,
    img = defaultImg,
    link = 'https://volby.transparency.sk/samosprava2022/',
    title = '',
}) {
    const getClickHandler = (url) => () => {
        openInNewTab(url);
    };
    const getKeyUpHandler = (url) => (event) => {
        if (event.keyCode === 13) {
            openInNewTab(url);
        }
    };
    return (
        <div
            className="el-preview hover-bg w-100"
            onClick={getClickHandler(link)}
            onKeyUp={getKeyUpHandler(link)}
            role="link"
            tabIndex={0}
        >
            <Row className="align-items-center align-items-start">
                <Col lg={6} className="align-self-start text-center">
                    <div
                        className="img-aspect mb-2 mb-lg-0 mb-xxl-2"
                        style={{ paddingTop: `${(100 * 900) / 1920}%` }}
                    >
                        <figure>
                            <img
                                src={img}
                                alt={title}
                                className={fadeImg ? 'fade-image' : ''}
                            />
                            <figcaption className="position-absolute start-50 top-50 translate-middle h1 text-uppercase">
                                {children}
                            </figcaption>
                        </figure>
                    </div>
                    <p className="lead mt-3 mb-1">
                        Dátum konania {dateFormat(date)}
                    </p>
                </Col>
            </Row>
        </div>
    );
}

export default ElectionsPreview;
