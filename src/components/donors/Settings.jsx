import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import { labels } from '../../api/constants';
import {
    buildUrlQuery,
    donations,
    parseQueryOptions,
} from '../../api/dontaions';
import { sortNumbers } from '../../api/helpers';
import { routes, separators } from '../../api/routes';

import './Donors.scss';

function Settings() {
    const navigate = useNavigate();

    const options = parseQueryOptions();

    const blocksize = options.b ?? false ? Number(options.b) : 50;
    let allowedColumns =
        options.a ?? false
            ? options.a.split(separators.space).map((item) => Number(item))
            : [];

    const updateColumns = (e) => {
        // copy all options except a
        const { a, ...linkOpt } = options;
        const id = Number(e.target.value);
        if (e.target.checked) {
            allowedColumns.push(id);
            allowedColumns.sort(sortNumbers(true));
        } else {
            allowedColumns = allowedColumns.filter((item) => item !== id);
        }
        if (allowedColumns.length) {
            linkOpt.a = allowedColumns.join(separators.space);
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
                    {labels.donations.settings.columns}
                </h6>
                {donations.optionalColumns.map((column, index) => (
                    <Form.Check
                        key={column}
                        inline
                        label={donations.allColumns[column]}
                        id={`allowed-columns-${column}`}
                        name="allowed-columns"
                        type="checkbox"
                        value={index}
                        checked={allowedColumns.includes(index)}
                        onChange={updateColumns}
                    />
                ))}
            </div>

            <div className="mt-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {labels.donations.settings.rows}
                </h6>
                {[10, 25, 50, 100].map((b) => (
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
