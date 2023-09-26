import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
    buildApiQuery,
    buildUrlQuery,
    getDonationsColumn,
    isCompany,
    settings,
} from '../../api/dontaions';
import { routes, separators } from '../../api/routes';

import Loading from '../general/Loading';
import PaginationWithGaps from '../general/PaginationWithGaps';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const options = {};
    if ((params.query ?? false) && params.query.length) {
        params.query.split(separators.parts).forEach((pair) => {
            const [filter, value] = pair.split(separators.value);
            options[filter] = value;
        });
    }
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

    const pageClickCallback = (i, totalPages) => () => {
        // copy all options except offset
        const { o, ...linkOpt } = options;
        if (i > 0) {
            linkOpt.o = i;
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)), {
            state: { totalPages },
        });
    };

    let numOfPages = location.state?.totalPages ?? 0;
    let table = null;
    if (isLoading || error) {
        table = <Loading error={error} />;
    } else {
        const headerCols = Object.entries(settings.donations.targetColumns).map(
            ([key, header]) => {
                return <th key={key}>{header}</th>;
            }
        );
        const rows = [];
        if ((data.rows ?? false) && Array.isArray(data.rows)) {
            data.rows.forEach((row, ri) => {
                const cols = Object.keys(settings.donations.targetColumns).map(
                    (targetColKey) => {
                        const content = getDonationsColumn(row, targetColKey);
                        return <td key={targetColKey}>{content}</td>;
                    }
                );
                const k = `r${ri}-${row[1]}-${row[2]}-${row[4]}`;
                rows.push(
                    <tr
                        key={k}
                        className={`row-${
                            isCompany(row) ? 'company' : 'person'
                        }`}
                    >
                        {cols}
                    </tr>
                );
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

    const nav = (
        <PaginationWithGaps
            className="justify-content-center mt-4"
            activePage={offset + 1}
            totalPages={numOfPages}
            pageClickCallback={pageClickCallback}
            useOffset
        />
    );

    return (
        <section>
            {table}
            {nav}
        </section>
    );
}

export default SearchResults;
