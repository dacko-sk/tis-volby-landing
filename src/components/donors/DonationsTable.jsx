import { labels } from '../../api/constants';
import { donations, getDonationsColumn, isCompany } from '../../api/dontaions';

import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';

function DonationsTable({
    donationsQuery,
    hiddenColumns = [],
    visibleColumns = donations.optionalColumns,
}) {
    if (donationsQuery.isLoading || donationsQuery.error) {
        return <Loading error={donationsQuery.error} />;
    }
    // show the column if not hidden
    // and (if it is not optional or if it is optional and checked in options)
    const enabledColumns = Object.entries(donations.allColumns).filter(
        ([key]) =>
            !hiddenColumns.includes(key) &&
            (!donations.optionalColumns.includes(key) ||
                visibleColumns.includes(key))
    );
    const headerCols = enabledColumns.map(([key, title]) => {
        let className;
        switch (key) {
            case 'amount':
            case 'date':
                className = 'text-end';
                break;
            case 'entity':
            case 'flag':
            case 'source':
                className = 'text-center';
                break;
            default:
                className = '';
        }
        return (
            <th key={key} className={className}>
                {title}
            </th>
        );
    });
    const rows = [];
    if (
        (donationsQuery.data.rows ?? false) &&
        Array.isArray(donationsQuery.data.rows)
    ) {
        donationsQuery.data.rows.forEach((row, ri) => {
            const cols = enabledColumns.map(([key]) => {
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
    return rows.length ? (
        <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr className="align-middle">{headerCols}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    ) : (
        <AlertWithIcon variant="danger">
            {labels.donations.search.noData}
        </AlertWithIcon>
    );
}

export default DonationsTable;
