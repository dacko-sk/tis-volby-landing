import { useState, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDebouncedCallback } from 'use-debounce';

import { allowedParams } from '../../helpers/assetDeclarations';
import { labels, t as translate } from '../../helpers/dictionary';
import { sortNumbers } from '../../helpers/helpers';
import { parseQueryOptions, separators } from '../../helpers/routes';

function AssetDeclarationsFilters({ updateRouteQuery, functions = [] }) {
    const options = parseQueryOptions(allowedParams);

    const [query, setQuery] = useState(options.q ?? '');

    let years =
        options.y?.split(separators.numbers).map((item) => Number(item)) ?? [];

    const selectedFunction = options.f ? options.f : '';

    const currentYear = new Date().getFullYear();
    const availableYears = useMemo(() => {
        const y = [];
        for (let i = currentYear - 1; i >= 2004; i--) {
            y.push(i);
        }
        return y;
    }, [currentYear]);

    const formSubmit = (e) => {
        // prevent form submit action, all paremeters are set via URL
        e.preventDefault();
    };

    const debounceSearch = useDebouncedCallback((value) => {
        // copy all options except q & o
        const { q, o, ...linkOpt } = options;
        if (value) {
            linkOpt.q = encodeURIComponent(value);
        }
        updateRouteQuery(linkOpt);
    }, 500);

    const updateQuery = (e) => {
        setQuery(e.target.value);
        debounceSearch(e.target.value);
    };

    const updateYears = (e) => {
        // copy all options except y & o
        const { y, o, ...linkOpt } = options;
        const id = Number(e.target.value);
        if (e.target.checked) {
            years.push(id);
            years.sort(sortNumbers(true));
        } else {
            years = years.filter((item) => item !== id);
        }
        if (years.length) {
            linkOpt.y = years.join(separators.numbers);
        }
        updateRouteQuery(linkOpt);
    };

    const updateFunction = (e) => {
        const { f, o, ...linkOpt } = options;
        if (e.target.value !== '') {
            linkOpt.f = encodeURIComponent(e.target.value);
        }
        updateRouteQuery(linkOpt);
    };

    return (
        <Form
            id="asset-declarations-filters"
            className="bg-light p-4"
            onSubmit={formSubmit}
        >
            <Form.Group>
                <h6 className="fw-bold text-primary text-uppercase">
                    {translate(labels.assetDeclarations.filters.search)}
                </h6>
                <InputGroup>
                    <Form.Label
                        htmlFor="asset-declarations-search"
                        className="visually-hidden"
                    >
                        {translate(labels.search.label)}
                    </Form.Label>
                    <Form.Control
                        placeholder={translate(
                            labels.assetDeclarations.searchPlaceholder
                        )}
                        aria-label={translate(labels.search.label)}
                        aria-describedby="search-icon"
                        id="asset-declarations-search"
                        onChange={updateQuery}
                        value={query}
                    />
                    <InputGroup.Text id="search-icon">🔍</InputGroup.Text>
                </InputGroup>
            </Form.Group>

            {functions.length > 0 && (
                <Form.Group className="mt-4">
                    <h6 className="fw-bold text-primary text-uppercase">
                        {translate(labels.assetDeclarations.columns.function)}
                    </h6>
                    <Form.Select
                        size="sm"
                        onChange={updateFunction}
                        value={selectedFunction}
                    >
                        <option key="" value="">
                            {translate(labels.all)}
                        </option>
                        {[...functions]
                            .sort((a, b) => a.localeCompare(b, 'sk'))
                            .map((fn) => (
                                <option key={fn} value={fn}>
                                    {fn}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
            )}

            <Form.Group className="mt-4">
                <h6 className="fw-bold text-primary text-uppercase">
                    {translate(labels.assetDeclarations.filters.years)}
                </h6>
                <div>
                    {availableYears.map((elYear) => (
                        <Form.Check
                            key={elYear}
                            inline
                            label={elYear}
                            id={`ey-${elYear}`}
                            name="year"
                            type="checkbox"
                            value={elYear}
                            checked={years.includes(elYear)}
                            onChange={updateYears}
                            className="mb-2"
                        />
                    ))}
                </div>
            </Form.Group>
        </Form>
    );
}

export default AssetDeclarationsFilters;
