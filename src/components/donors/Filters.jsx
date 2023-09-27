import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import {
    buildUrlQuery,
    donations,
    parseQueryOptions,
} from '../../api/dontaions';
import { routes, separators } from '../../api/routes';

import './Donors.scss';

function Filters() {
    const navigate = useNavigate();

    const options = parseQueryOptions();
    let allowedColumns =
        options.a ?? false
            ? options.a.split(separators.space).map((item) => Number(item))
            : [];

    const updateColumns = (e) => {
        const id = Number(e.target.value);
        if (e.target.checked) {
            allowedColumns.push(id);
            allowedColumns.sort((a, b) => a - b);
        } else {
            allowedColumns = allowedColumns.filter((item) => item !== id);
        }
        // copy all options except offset
        const linkOpt = {
            ...options,
            a: allowedColumns.join(separators.space),
        };
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    return (
        <Form id="donations-filters" className="bg-light p-4">
            <div className="mb-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    Voliteľné stĺpce
                </h6>
                {donations.optionalColumns.map((column, index) => (
                    <Form.Check
                        key={`col-${column}`}
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
        </Form>
    );
}

export default Filters;
