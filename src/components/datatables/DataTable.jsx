import Table from 'react-bootstrap/Table';

import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

import SortLink from './SortLink';
import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';

function DataTable({
    allowedParams,
    columnAlign,
    columnContent,
    columnLabel,
    columns,
    dataQuery,
    route = routes.accounts(),
    hiddenColumns = [],
    optionalColumns,
    visibleColumns = [],
}) {
    if (dataQuery.isLoading || dataQuery.error) {
        return <Loading error={dataQuery.error} />;
    }

    // show the column if not hidden
    // and (if it is not optional or if it is optional and checked in options)
    const enabledColumns = Object.keys(columns).filter(
        (key) =>
            !hiddenColumns.includes(key) &&
            (!optionalColumns.includes(key) || visibleColumns.includes(key))
    );
    const headerCols = enabledColumns.map((key) => {
        const align = columnAlign(key);
        const title = columnLabel(key);
        return (
            <th key={key} className={align}>
                <SortLink
                    allowedParams={allowedParams}
                    column={key}
                    route={route}
                >
                    {title}
                </SortLink>
            </th>
        );
    });

    const rows = Array.isArray(dataQuery.data.rows ?? null)
        ? dataQuery.data.rows.map((row, ri) => {
              const cols = enabledColumns.map((key) => {
                  const content = columnContent(row, key);
                  return <td key={key}>{content}</td>;
              });
              const k = `r${ri}`;
              return (
                  <tr key={k} className="align-middle">
                      {cols}
                  </tr>
              );
          })
        : [];

    return rows.length ? (
        <Table responsive bordered hover striped>
            <thead>
                <tr className="align-middle">{headerCols}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    ) : (
        <AlertWithIcon variant="danger">
            {t(labels.accounts.noTransactions)}
        </AlertWithIcon>
    );
}

export default DataTable;
