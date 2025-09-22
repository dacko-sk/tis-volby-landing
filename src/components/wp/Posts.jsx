import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';
import { processArticles } from '../../helpers/wp';

import NewsCondensed from './templates/NewsCondensed';
import NewsList from './templates/NewsList';
import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';
import PaginationWithGaps from '../general/PaginationWithGaps';

import './News.scss';

export const templates = {
    condensed: 'condensed',
    list: 'list',
};

function Posts({
    categories = [],
    categoriesExclude = [],
    limit = false,
    noResults,
    search = '',
    showMore = null,
    showMoreRoute = null,
    tags = [],
    template = templates.list,
}) {
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const activePage = location.state?.page ?? 1;
    const blocksize = limit || 10;
    const catParam = categories.length
        ? `&categories=${categories.join()}`
        : '';
    const catExParam = categoriesExclude.length
        ? `&categories_exclude=${categoriesExclude.join()}`
        : '';
    const tagParam = tags.length ? `&tags=${tags.join()}&tax_relation=AND` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { isLoading, error, data } = useQuery(
        [
            `all_posts_${catParam}_${tagParam}_${search}_${blocksize}_${activePage}`,
        ],
        () =>
            fetch(
                `https://cms.transparency.sk/wp-json/wp/v2/posts?per_page=${blocksize}&page=${activePage}${catParam}${catExParam}${tagParam}${searchParam}`
            ).then((response) => {
                if (response.headers) {
                    const wptp = Number(
                        response.headers.get('X-WP-TotalPages')
                    );
                    setTotalPages(wptp);
                }
                // must return promise
                return response.json();
            })
    );

    let content = null;

    if (isLoading || error) {
        content = <Loading error={error} />;
    } else {
        const articles = processArticles(data).map((article) =>
            template === templates.condensed ? (
                <NewsCondensed key={article.slug} article={article} />
            ) : (
                <NewsList key={article.slug} article={article} />
            )
        );

        content = articles.length ? (
            <Row
                className={`articles ${template}${
                    template === templates.condensed ? ' my-3' : ''
                }`}
            >
                {articles}
            </Row>
        ) : (
            <AlertWithIcon className="my-4" variant="danger">
                {noResults ?? t(labels.news.noData)}
            </AlertWithIcon>
        );
    }

    let nav = null;
    if (showMore || showMoreRoute || limit) {
        nav = (
            <div className="buttons mt-3 text-center">
                <Button
                    as={Link}
                    to={showMoreRoute ?? routes.news()}
                    variant="secondary"
                >
                    {showMore || t(labels.showMore)}
                </Button>
            </div>
        );
    } else if (totalPages > 1) {
        nav = (
            <PaginationWithGaps
                className="justify-content-center mt-4"
                activePage={activePage}
                pageRouteCallback={(page) => ({
                    pathname: location.pathname,
                    // navigate to the same page, just pass the current page via state object to preserve history
                    state: { page },
                })}
                totalPages={totalPages}
                scrollTop
            />
        );
    }

    return (
        <div>
            {content}
            {nav}
        </div>
    );
}

export default Posts;
