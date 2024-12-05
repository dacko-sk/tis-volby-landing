import Form from 'react-bootstrap/Form';

import { isMobile } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { sortNumbers } from '../../helpers/helpers';
import { parseQueryOptions, separators } from '../../helpers/routes';

export const blocksizes = [10, 25, 50, 100];
export const defaultBlocksize = blocksizes[isMobile ? 0 : 2];
export const settingsParams = [
    'v', // visible optional columns
];

function TableSettings({
    allowedParams,
    columnLabel,
    hiddenColumns = [],
    optionalColumns,
    updateRouteQuery,
}) {
    const options = parseQueryOptions(allowedParams);

    const blocksize = options.b ?? false ? Number(options.b) : defaultBlocksize;
    let visibleColumns =
        options.v ?? false
            ? options.v.split(separators.numbers).map((item) => Number(item))
            : [];

    const updateColumns = (e) => {
        // copy all options except v
        const { v, ...linkOpt } = options;
        const id = Number(e.target.value);
        if (e.target.checked) {
            visibleColumns.push(id);
            visibleColumns.sort(sortNumbers(true));
        } else {
            visibleColumns = visibleColumns.filter((item) => item !== id);
        }
        if (visibleColumns.length) {
            linkOpt.v = visibleColumns.join(separators.numbers);
        }
        updateRouteQuery(linkOpt);
    };

    const updateBlocksize = (e) => {
        // copy all options except b & o
        const { b, o, ...linkOpt } = options;
        linkOpt.b = Number(e.target.value);
        updateRouteQuery(linkOpt);
    };

    return (
        <Form id="donations-settings" className="bg-light p-4">
            <div>
                <h6 className="fw-bold text-primary text-uppercase">
                    {t(labels.donations.settings.columns)}
                </h6>
                {optionalColumns.map((column, index) =>
                    hiddenColumns.includes(column) ? null : (
                        <Form.Check
                            key={column}
                            checked={visibleColumns.includes(index)}
                            id={`visible-columns-${column}`}
                            inline
                            label={columnLabel(column)}
                            name="visible-columns"
                            onChange={updateColumns}
                            type="checkbox"
                            value={index}
                        />
                    )
                )}
            </div>

            <div className="mt-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {t(labels.donations.settings.rows)}
                </h6>
                {blocksizes.map((b) => (
                    <Form.Check
                        key={b}
                        checked={b === blocksize}
                        id={`blocksize-${b}`}
                        inline
                        label={b}
                        name="blocksize"
                        onChange={updateBlocksize}
                        type="radio"
                        value={b}
                    />
                ))}
            </div>
        </Form>
    );
}

export default TableSettings;
