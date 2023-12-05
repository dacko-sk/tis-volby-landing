import Table from 'react-bootstrap/Table';

import { donationsColumns as dc } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import {
    SortLink,
    columnLabel,
    getDonationsColumn,
    isCompany,
    optionalColumns,
} from '../../helpers/dontaions';
import { routes } from '../../helpers/routes';

import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';

function DonationsTable({
    donationsQuery,
    route = routes.donations(),
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
        const title = columnLabel(key);
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
                <SortLink column={key} route={route}>
                    {title}
                </SortLink>
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
        <Table responsive bordered hover striped>
            <thead>
                <tr className="align-middle">{headerCols}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    ) : (
        <AlertWithIcon variant="danger">
            {t(labels.donations.search.noDonations)}
        </AlertWithIcon>
    );
}

export default DonationsTable;
