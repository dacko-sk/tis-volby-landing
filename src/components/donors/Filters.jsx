import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDebouncedCallback } from 'use-debounce';

import { labels } from '../../api/constants';
import {
    buildUrlQuery,
    donations,
    parseQueryOptions,
} from '../../api/dontaions';
import { sortNumbers } from '../../api/helpers';
import { routes, separators } from '../../api/routes';

import './Donors.scss';

function Filters() {
    const navigate = useNavigate();

    const options = parseQueryOptions();

    const [query, setQuery] = useState(options.q ?? '');

    const entity = (options.c ?? '') !== '' ? Number(options.c) : '';
    let types =
        options.t ?? false
            ? options.t.split(separators.space).map((item) => Number(item))
            : [];
    let flags =
        options.f ?? false
            ? options.f.split(separators.space).map((item) => Number(item))
            : [];
    const party = options.p ?? '';

    const updateQuery = (e) => {
        const debouncedSearch = useDebouncedCallback((value) => {
            // copy all options except q & o
            const { q, o, ...linkOpt } = options;
            if (value) {
                linkOpt.q = encodeURIComponent(value);
            }
            navigate(routes.donations(buildUrlQuery(linkOpt)));
        }, 500);

        setQuery(e.target.value);
        debouncedSearch(e.target.value);
    };

    const updateEntity = (e) => {
        // copy all options except c & o
        const { c, o, ...linkOpt } = options;
        if (e.target.value !== '') {
            linkOpt.c = Number(e.target.value);
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateTypes = (e) => {
        // copy all options except t & o
        const { t, o, ...linkOpt } = options;
        const id = Number(e.target.value);
        if (e.target.checked) {
            types.push(id);
            types.sort(sortNumbers(true));
        } else {
            types = types.filter((item) => item !== id);
        }
        if (types.length) {
            linkOpt.t = types.join(separators.space);
        }
        navigate(routes.donations(buildUrlQuery(linkOpt)));
    };

    const updateFlags = (e) => {
        // copy all options except f & o
        const { f, o, ...linkOpt } = options;
        const id = Number(e.target.value);
        if (e.target.checked) {
            flags.push(id);
            flags.sort(sortNumbers(true));
        } else {
            flags = flags.filter((item) => item !== id);
        }
        if (flags.length) {
            linkOpt.f = flags.join(separators.space);
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

    return (
        <Form id="donations-filters" className="bg-light p-4">
            <div>
                <h6 className="fw-bold text-primary text-uppercase">
                    {labels.donations.filters.search}
                </h6>
                <InputGroup>
                    <Form.Control
                        placeholder={labels.search}
                        aria-label={labels.search}
                        aria-describedby="search-icon"
                        id="donations-search"
                        onChange={updateQuery}
                        value={query}
                    />
                    <InputGroup.Text
                        id="search-icon"
                        className="d-lg-none d-xl-flex"
                    >
                        🔍
                    </InputGroup.Text>
                </InputGroup>
            </div>

            <div className="mt-3">
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

            <div className="mt-3">
                <h6 className="fw-bold text-primary text-uppercase">
                    {donations.allColumns.type}
                </h6>
                {donations.types.map((label, index) => {
                    if (!label) {
                        return null;
                    }
                    return (
                        <Form.Check
                            key={label}
                            inline
                            label={label}
                            id={`type-${index}`}
                            name="type"
                            type="checkbox"
                            value={index}
                            checked={types.includes(index)}
                            onChange={updateTypes}
                        />
                    );
                })}
            </div>

            <div className="mt-3">
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

            <div className="mt-3">
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
        </Form>
    );
}

export default Filters;
