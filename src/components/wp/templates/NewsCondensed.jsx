import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { dateTimeFormat } from '../../../helpers/helpers';
import { getActiveSubsite } from '../../../helpers/languages';
import { routes } from '../../../helpers/routes';
import { parseWpHtml } from '../../../helpers/wp';

import Media from '../Media';
import PartyTags from '../PartyTags';

function NewsCondensed({ article }) {
    const subsite = getActiveSubsite();
    return (
        <Col className="d-flex" md={6}>
            <Link
                id={article.slug}
                className="article hover-bg"
                state={{ article }}
                to={routes.article(article.slug)}
            >
                <h3 className="d-none d-xxl-block">{article.title.rendered}</h3>

                <Row className="align-items-center align-items-xxl-start">
                    <Col xxl="auto" className="align-self-xxl-start">
                        <div className="thumb mb-2 mb-xxl-0 mt-xxl-2">
                            <figure className="text-center text-xxl-start">
                                <Media
                                    alt={article.title.rendered}
                                    id={article.featured_media}
                                />
                            </figure>
                        </div>
                    </Col>
                    <Col>
                        <h3 className="d-block d-xxl-none">
                            {article.title.rendered}
                        </h3>
                        <div className="article-date my-2">
                            {dateTimeFormat(article.date)}
                        </div>
                        {subsite !== 'samosprava2022' && subsite !== 'samosprava2026' && (
                            <PartyTags
                                className="article-tags my-2"
                                tags={article.tags}
                            />
                        )}
                        <div className="article-excerpt">
                            {parseWpHtml(article.excerpt.rendered)}
                        </div>
                    </Col>
                </Row>
            </Link>
        </Col>
    );
}

export default NewsCondensed;
