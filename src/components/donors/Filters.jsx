import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import {
    buildUrlQuery,
    donations,
    parseQueryOptions,
} from '../../api/dontaions';
import { routes, separators } from '../../api/routes';

import './Donors.scss';
import { labels } from '../../api/constants';

function Filters() {
    const navigate = useNavigate();

    const options = parseQueryOptions();
    const blocksize = options.b ?? false ? Number(options.b) : 50;
    const entity = (options.c ?? '') !== '' ? Number(options.c) : '';
    const party = options.p ?? '';
    let allowedColumns =
        options.a ?? false
            ? options.a.split(separators.space).map((item) => Number(item))
            : [];

    const updateEntity = (e) => {
        // copy all options except c & o
        const { c, o, ...linkOpt } = options;
        if (e.target.value !== '') {
            linkOpt.c = Number(e.target.value);
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateParty = (e) => {
        // copy all options except p & o
        const { p, o, ...linkOpt } = options;
        if (e.target.value !== '') {
            linkOpt.p = e.target.value;
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateColumns = (e) => {
        const id = Number(e.target.value);
        if (e.target.checked) {
            allowedColumns.push(id);
            allowedColumns.sort((a, b) => a - b);
        } else {
            allowedColumns = allowedColumns.filter((item) => item !== id);
        }
        const linkOpt = {
            ...options,
            a: allowedColumns.join(separators.space),
        };
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateBlocksize = (e) => {
        // copy all options except b & o
        const { b, o, ...linkOpt } = options;
        linkOpt.b = Number(e.target.value);
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    return (
        <Form id="donations-filters" className="bg-light p-4">
            <div className="mb-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {labels.donations.filters.party}
                </h6>
                <Form.Check
                    key=""
                    inline
                    label={labels.all}
                    id="party-all"
                    name="party"
                    type="radio"
                    value=""
                    checked={party === ''}
                    onChange={updateParty}
                />
                {donations.parties.map((p) => (
                    <Form.Check
                        key={p}
                        inline
                        label={p}
                        id={`party-${p}`}
                        name="party"
                        type="radio"
                        value={p}
                        checked={party === p}
                        onChange={updateParty}
                    />
                ))}
            </div>

            <div className="mb-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {labels.donations.filters.entity}
                </h6>
                <Form.Check
                    key=""
                    inline
                    label={labels.all}
                    id="entity-all"
                    name="entity"
                    type="radio"
                    value=""
                    checked={entity === ''}
                    onChange={updateEntity}
                />
                {donations.entities.map((label, index) => (
                    <Form.Check
                        key={label}
                        inline
                        label={donations.entities[index]}
                        id={`entity-${label}`}
                        name="entity"
                        type="radio"
                        value={index}
                        checked={entity === index}
                        onChange={updateEntity}
                    />
                ))}
            </div>

            <div className="mb-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {labels.donations.filters.columns}
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

            <div className="mb-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {labels.donations.filters.rows}
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

export default Filters;
