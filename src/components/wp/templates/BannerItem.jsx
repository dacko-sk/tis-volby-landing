import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { parseWpHtml } from '../../../helpers/wp';

import Media from '../Media';

function BannerItem({ article }) {
    return (
        <Alert variant="primary" className="my-4">
            <Row className="article">
                {article.featured_media ? (
                    <Col sm={5} lg={3} xxl={2} className="d-none d-sm-block">
                        <div className="thumb mb-2 mb-md-0">
                            <figure className="text-center text-xxl-start">
                                <Media
                                    alt={article.title.rendered}
                                    id={article.featured_media}
                                />
                            </figure>
                        </div>
                    </Col>
                ) : null}
                <Col>
                    <div className="article-body">
                        <h2 className="mb-3">{article.title.rendered}</h2>
                        {parseWpHtml(article.content.rendered)}
                    </div>
                </Col>
            </Row>
        </Alert>
    );
}

export default BannerItem;
