import { donationsColumns as dc } from '../../api/constants';
import { labels, t } from '../../api/dictionary';
import {
    SortLink,
    columnLabels,
    getDonationsColumn,
    isCompany,
    optionalColumns,
} from '../../api/dontaionsHelpers';

import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';

function DonationsTable({
    donationsQuery,
    hiddenColumns = [],
    visibleColumns = optionalColumns,
}) {
    if (donationsQuery.isLoading || donationsQuery.error) {
        return <Loading error={donationsQuery.error} />;
    }

    // show the column if not hidden
    // and (if it is not optional or if it is optional and checked in options)
    const enabledColumns = Object.keys(dc).filter(
        (key) =>
            !hiddenColumns.includes(key) &&
            (!optionalColumns.includes(key) || visibleColumns.includes(key))
    );
    const headerCols = enabledColumns.map((key) => {
        const title = columnLabels[key];
        let className;
        switch (key) {
            case dc.amount:
            case dc.date:
                className = 'text-end';
                break;
            case dc.entity:
            case dc.flag:
            case dc.source:
                className = 'text-center';
                break;
            default:
                className = '';
        }
        return (
            <th key={key} className={className}>
                {hiddenColumns.length ? (
                    title
                ) : (
                    <SortLink column={key}>{title}</SortLink>
                )}
            </th>
        );
    });

    const rows = [];
    if (
        (donationsQuery.data.rows ?? false) &&
        Array.isArray(donationsQuery.data.rows)
    ) {
        donationsQuery.data.rows.forEach((row, ri) => {
            const cols = enabledColumns.map((key) => {
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
            {t(labels.donations.search.noDonations)}
        </AlertWithIcon>
    );
}

export default DonationsTable;
