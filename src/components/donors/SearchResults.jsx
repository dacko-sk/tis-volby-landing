import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { labels, t } from '../../helpers/dictionary';
import {
    apiEndpoints,
    buildApiQuery,
    defaultBlocksize,
    optionalColumns,
    parseQueryOptions,
} from '../../helpers/dontaions';
import { routes, rwq, separators } from '../../helpers/routes';

import { allDonationsParties } from '../../hooks/Queries';

import PaginationWithGaps from '../general/PaginationWithGaps';
import DonationsTable from './DonationsTable';
import Filters from './Filters';
import Settings from './Settings';

function SearchResults({
    hiddenColumns = [],
    parties = allDonationsParties(),
    queryOptions = {},
    route = routes.donations(),
}) {
    const [openFilters, setOpenFilters] = useState(window.screen.width > 991);
    const [openSettings, setOpenSettings] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const options = {
        ...queryOptions,
        ...parseQueryOptions(),
    };
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
        fetch(`${apiEndpoints.donations}?${queryParams}`).then((response) =>
            response.json()
        )
    );

    const tableSize = 12 - (openFilters ? 3 : 0) - (openSettings ? 2 : 0);

    const toggleFilter = () => {
        setOpenFilters(!openFilters);
    };

    const toggleSettings = () => {
        setOpenSettings(!openSettings);
    };

    const updateRouteQuery = (newQueryOptions, navigateOptions) =>
        navigate(rwq.donations(route, newQueryOptions), navigateOptions);

    const pageClickCallback = (i, totalPages) => () => {
        // copy all options except offset
        const { o, ...linkOpt } = options;
        if (i > 0) {
            linkOpt.o = i;
        }
        updateRouteQuery(linkOpt, {
            state: { totalPages },
        });
    };

    let numOfPages = location.state?.totalPages ?? 0;
    if (dq.data?.total ?? false) {
        numOfPages = Math.ceil(dq.data.total / blocksize);
    }

    return (
        <div id="donations" className="mt-4">
            <div className="d-flex mb-2">
                <Button
                    onClick={toggleFilter}
                    variant={`${openFilters ? '' : 'outline-'}primary`}
                >
                    {t(labels.donations.filters.button)}
                </Button>
                <Button
                    className="ms-auto"
                    onClick={toggleSettings}
                    variant={`${openSettings ? '' : 'outline-'}primary`}
                >
                    {t(labels.donations.settings.button)}
                </Button>
            </div>
            <div className="row gx-3 gy-2">
                <aside
                    className={`col-12 ${openFilters ? 'col-lg-3' : 'd-none'}`}
                >
                    <Filters
                        hiddenColumns={hiddenColumns}
                        parties={parties}
                        updateRouteQuery={updateRouteQuery}
                    />
                </aside>
                <aside
                    className={`col-12 ${
                        openSettings ? 'col-lg-2 order-lg-last' : 'd-none'
                    }`}
                >
                    <Settings
                        hiddenColumns={hiddenColumns}
                        updateRouteQuery={updateRouteQuery}
                    />
                </aside>
                <div className={`col-12 col-lg-${tableSize}`}>
                    <div id="donations-results">
                        <DonationsTable
                            donationsQuery={dq}
                            route={route}
                            hiddenColumns={hiddenColumns}
                            visibleColumns={visibleColumns}
                        />
                        <PaginationWithGaps
                            className="justify-content-center mt-4"
                            activePage={offset + 1}
                            totalPages={numOfPages}
                            pageClickCallback={pageClickCallback}
                            useOffset
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
