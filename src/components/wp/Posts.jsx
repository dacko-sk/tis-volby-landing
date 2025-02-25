import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';

import { scrollToTop } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';
import { processArticles } from '../../helpers/wp';

import NewsCondensed from './templates/NewsCondensed';
import NewsList from './templates/NewsList';
import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';

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
    template = templates.list,
}) {
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const activePage = location.state?.page ?? 1;
    const blocksize = limit || 10;
    const catParam = categories.length
        ? `&categories=${categories.join()}`
        : '';
    const catExParam = categoriesExclude.length
        ? `&categories_exclude=${categoriesExclude.join()}`
        : '';
    const searchParam = search ? `&search=${search}` : '';
    const { isLoading, error, data } = useQuery(
        [`all_posts_${catParam}_${search}_${blocksize}_${activePage}`],
        () =>
            fetch(
                `https://cms.transparency.sk/wp-json/wp/v2/posts?per_page=${blocksize}&page=${activePage}${catParam}${catExParam}${searchParam}`
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

    const loadPage = (page) => () => {
        // navigate to the same page, just pass the current page via state object to preserve history
        navigate(location.pathname, { state: { page } });
        scrollToTop();
    };

    const articles = [];
    let content = null;

    if (isLoading || error) {
        content = <Loading error={error} />;
    } else {
        processArticles(data).forEach((article) => {
            articles.push(
                template === templates.condensed ? (
                    <NewsCondensed key={article.slug} article={article} />
                ) : (
                    <NewsList key={article.slug} article={article} />
                )
            );
        });

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
    if (showMore || limit) {
        nav = (
            <div className="buttons mt-3 text-center">
                <Button as={Link} to={routes.news()} variant="secondary">
                    {showMore || t(labels.showMore)}
                </Button>
            </div>
        );
    } else {
        const items = [];
        for (let i = 1; i <= totalPages; i += 1) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === activePage}
                    onClick={loadPage(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
        if (items.length > 1) {
            nav = (
                <Pagination className="justify-content-center mt-4">
                    {items}
                </Pagination>
            );
        }
    }

    return (
        <div>
            {content}
            {nav}
        </div>
    );
}

export default Posts;
