import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
    buildApiQuery,
    buildUrlQuery,
    defaultBlocksize,
    optionalColumns,
    parseQueryOptions,
} from '../../helpers/dontaions';
import { routes, separators } from '../../helpers/routes';

import PaginationWithGaps from '../general/PaginationWithGaps';
import DonationsTable from './DonationsTable';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const options = parseQueryOptions();
    const blocksize = options.b ?? false ? Number(options.b) : defaultBlocksize;
    const offset = options.o ?? false ? Number(options.o) : 0;
    const visibleColumns =
        options.v ?? false
            ? options.v
                  .split(separators.numbers)
                  .map((item) => optionalColumns[Number(item)])
            : [];
    const queryParams = buildApiQuery({ ...options, b: blocksize });

    const dq = useQuery([`donations_${queryParams}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donations.php?${queryParams}`
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
    if (dq.data?.total ?? false) {
        numOfPages = Math.ceil(dq.data.total / blocksize);
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
        <div id="donations-results">
            <DonationsTable
                donationsQuery={dq}
                visibleColumns={visibleColumns}
            />
            {nav}
        </div>
    );
}

export default SearchResults;
