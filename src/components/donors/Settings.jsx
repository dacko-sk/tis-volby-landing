import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import { labels, t } from '../../api/dictionary';
import {
    blocksizes,
    buildUrlQuery,
    columnLabels,
    optionalColumns,
    parseQueryOptions,
} from '../../api/dontaionsHelpers';
import { sortNumbers } from '../../api/helpers';
import { routes, separators } from '../../api/routes';

import './Donors.scss';

function Settings() {
    const navigate = useNavigate();

    const options = parseQueryOptions();

    const blocksize = options.b ?? false ? Number(options.b) : 50;
    let visibleColumns =
        options.v ?? false
            ? options.v.split(separators.space).map((item) => Number(item))
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
            linkOpt.v = visibleColumns.join(separators.space);
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateBlocksize = (e) => {
        // copy all options except b & o
        const { b, o, ...linkOpt } = options;
        linkOpt.b = Number(e.target.value);
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    return (
        <Form id="donations-settings" className="bg-light p-4">
            <div>
                <h6 className="fw-bold text-primary text-uppercase">
                    {t(labels.donations.settings.columns)}
                </h6>
                {optionalColumns.map((column, index) => (
                    <Form.Check
                        key={column}
                        inline
                        label={columnLabels[column]}
                        id={`visible-columns-${column}`}
                        name="visible-columns"
                        type="checkbox"
                        value={index}
                        checked={visibleColumns.includes(index)}
                        onChange={updateColumns}
                    />
                ))}
            </div>

            <div className="mt-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {t(labels.donations.settings.rows)}
                </h6>
                {blocksizes.map((b) => (
                    <Form.Check
                        key={b}
                        inline
                        label={b}
                        id={`blocksize-${b}`}
                        name="blocksize"
                        type="radio"
                        value={b}
                        checked={b === blocksize}
                        onChange={updateBlocksize}
                    />
                ))}
            </div>
        </Form>
    );
}

export default Settings;
