import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { openInNewTab } from '../../api/helpers';

import ElectionsCountdown from './ElectionsCountdown';

import defaultImg from '../../../public/img/tis-logo-blue.png';

function ElectionPreview({
    children,
    img = defaultImg,
    link = 'https://volby.transparency.sk/samosprava2022/',
    title = 'Volby 22',
    start,
    end,
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
            className="el-preview hover-bg"
            onClick={getClickHandler(link)}
            onKeyUp={getKeyUpHandler(link)}
            role="link"
            tabIndex={0}
        >
            <Row className="align-items-center align-items-start">
                <Col lg={6} xxl={12} className="align-self-start">
                    <div className="thumb mb-2 mb-lg-0 mb-xxl-2">
                        <figure className="text-center text-xxl-start">
                            <img src={img} alt={title} className="mw-100" />
                        </figure>
                    </div>
                </Col>
                <Col className="text-center text-lg-start text-xxl-center">
                    <h2 className="text-uppercase fw-bold">{title}</h2>
                    <ElectionsCountdown start={start} end={end} />
                    {children}
                </Col>
            </Row>
        </div>
    );
}

export default ElectionPreview;
