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

    const party = options.p ?? '';
    let flags =
        options.f ?? false
            ? options.f.split(separators.space).map((item) => Number(item))
            : [];
    const entity = (options.c ?? '') !== '' ? Number(options.c) : '';

    const blocksize = options.b ?? false ? Number(options.b) : 50;
    let allowedColumns =
        options.a ?? false
            ? options.a.split(separators.space).map((item) => Number(item))
            : [];

    const updateParty = (e) => {
        // copy all options except p & o
        const { p, o, ...linkOpt } = options;
        if (e.target.value !== '') {
            linkOpt.p = e.target.value;
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateFlags = (e) => {
        const id = Number(e.target.value);
        if (e.target.checked) {
            flags.push(id);
            flags.sort((a, b) => a - b);
        } else {
            flags = flags.filter((item) => item !== id);
        }
        // copy all options except f & o
        const { f, o, ...linkOpt } = options;
        if (flags.length) {
            linkOpt.f = flags.join(separators.space);
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateEntity = (e) => {
        // copy all options except c & o
        const { c, o, ...linkOpt } = options;
        if (e.target.value !== '') {
            linkOpt.c = Number(e.target.value);
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
                    {donations.allColumns.party}
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
                    {donations.allColumns.flag}
                </h6>
                {donations.flags.map((label, index) => {
                    if (!label) {
                        return null;
                    }
                    return (
                        <Form.Check
                            key={label}
                            inline
                            label={
                                <>
                                    <span
                                        className={`flag-${index} badge rounded-pill border bg-light bg-opacity-25`}
                                    >
                                        🏴
                                    </span>
                                    {` ${label}`}
                                </>
                            }
                            id={`flag-${index}`}
                            name="flag"
                            type="checkbox"
                            value={index}
                            checked={flags.includes(index)}
                            onChange={updateFlags}
                        />
                    );
                })}
            </div>

            <div className="mb-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {donations.allColumns.entity}
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
