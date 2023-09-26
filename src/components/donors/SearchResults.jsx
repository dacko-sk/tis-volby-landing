import Pagination from 'react-bootstrap/Pagination';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { settings } from '../../api/constants';
import { routes, separators } from '../../api/routes';

import Loading from '../general/Loading';
import { currencyFormat } from '../../api/helpers';

const buildApiQuery = (options) => {
    const filters = [];
    Object.entries(options).forEach(([param, value]) => {
        filters.push(`${param}=${value}`);
    });
    return filters.join('&');
};

const buildUrlQuery = (options) => {
    const filters = [];
    Object.entries(options).forEach(([param, value]) => {
        filters.push(param + separators.value + value);
    });
    return filters.join(separators.parts);
};

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const options = {};
    (params.query ?? '').split(separators.parts).forEach((pair) => {
        const [filter, value] = pair.split(separators.value);
        options[filter] = value;
    });
    const blocksize = options.b ?? false ? Number(options.b) : 50;
    const offset = options.o ?? false ? Number(options.o) : 0;
    const requestQuery = buildApiQuery(options);

    const { isLoading, error, data } = useQuery(
        [`donations_${requestQuery}`],
        () =>
            fetch(
                `https://volby.transparency.sk/api/donors/donations.php?${requestQuery}`
            ).then((response) => response.json())
    );

    const loadPage = (page, totalPages) => (e) => {
        e.preventDefault();
        navigate(page, {
            state: { totalPages },
        });
    };

    let numOfPages = location.state?.totalPages ?? 0;
    let table = null;
    if (isLoading || error) {
        table = <Loading error={error} />;
    } else {
        const headerCols = settings.donations.headers.map((item, ci) => {
            if (!settings.donations.allowedColumns.includes(ci)) {
                return null;
            }
            const k = `i${ci}`;
            return <th key={k}>{item}</th>;
        });
        const rows = [];
        if ((data.rows ?? false) && Array.isArray(data.rows)) {
            data.rows.forEach((row, ri) => {
                const cols = row.map((item, ci) => {
                    if (!settings.donations.allowedColumns.includes(ci)) {
                        return null;
                    }
                    const k = `r${ri}c${ci}`;
                    let content;
                    let className;
                    switch (ci) {
                        case 6:
                            content =
                                settings.donations.types[Number(item)] ?? '';
                            break;
                        case 8:
                            content = currencyFormat(item);
                            className = 'text-end';
                            break;
                        case 9:
                            content = (
                                <a
                                    href={item}
                                    title="stiahnuť"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    🖹
                                </a>
                            );
                            break;
                        case 10:
                            content =
                                settings.donations.flags[Number(item)] ?? '';
                            break;
                        default:
                            content = item;
                    }
                    return (
                        <td key={k} className={className}>
                            {content}
                        </td>
                    );
                });
                const k = `r${ri}-${row[1]}-${row[2]}-${row[4]}`;
                rows.push(<tr key={k}>{cols}</tr>);
            });
        }
        table = (
            <table>
                <thead>
                    <tr>{headerCols}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );

        numOfPages = Math.ceil(data.total / blocksize);
    }

    let nav = null;
    const items = [];
    for (let i = 0; i < numOfPages; i += 1) {
        // copy all options except offset
        const { o, ...linkOpt } = options;
        if (i > 0) {
            linkOpt.o = i;
        }
        const pageLink = routes.donations(buildUrlQuery(linkOpt));
        items.push(
            <Pagination.Item
                key={i}
                active={i === offset}
                onClick={loadPage(pageLink, numOfPages)}
                href={pageLink}
            >
                {i + 1}
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

    return (
        <section>
            {table}
            {nav}
        </section>
    );
}

export default SearchResults;
