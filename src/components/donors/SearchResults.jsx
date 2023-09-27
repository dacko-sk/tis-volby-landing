import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
    buildApiQuery,
    buildUrlQuery,
    donations,
    getDonationsColumn,
    isCompany,
    parseQueryOptions,
} from '../../api/dontaions';
import { routes, separators } from '../../api/routes';

import Loading from '../general/Loading';
import PaginationWithGaps from '../general/PaginationWithGaps';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const options = parseQueryOptions();
    const blocksize = options.b ?? false ? Number(options.b) : 50;
    const offset = options.o ?? false ? Number(options.o) : 0;
    const allowedColumns =
        options.a ?? false
            ? options.a.split(separators.space).map((item) => Number(item))
            : [];
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
        const headerCols = Object.entries(donations.allColumns).map(
            ([key, header]) => {
                // skip if the column is optional and not checked in options
                const optId = donations.optionalColumns.indexOf(key);
                if (optId > -1 && !allowedColumns.includes(optId)) {
                    return null;
                }
                let className;
                switch (key) {
                    case 'amount':
                        className = 'text-end';
                        break;
                    case 'entity':
                        className = 'text-center';
                        break;
                    default:
                        className = '';
                }
                return (
                    <th key={key} className={className}>
                        {header}
                    </th>
                );
            }
        );
        const rows = [];
        if ((data.rows ?? false) && Array.isArray(data.rows)) {
            data.rows.forEach((row, ri) => {
                const cols = Object.keys(donations.allColumns).map((key) => {
                    // skip if the column is optional and not checked in options
                    const optId = donations.optionalColumns.indexOf(key);
                    if (optId > -1 && !allowedColumns.includes(optId)) {
                        return null;
                    }
                    const content = getDonationsColumn(row, key);
                    return <td key={key}>{content}</td>;
                });
                const k = `r${ri}-${row[1]}-${row[2]}-${row[4]}`;
                rows.push(
                    <tr
                        key={k}
                        className={`row-${
                            isCompany(row) ? 'company' : 'person'
                        } align-middle`}
                    >
                        {cols}
                    </tr>
                );
            });
        }
        table = (
            <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                    <thead>
                        <tr className="align-middle">{headerCols}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
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
        <div id="donations-table">
            {table}
            {nav}
        </div>
    );
}

export default SearchResults;
