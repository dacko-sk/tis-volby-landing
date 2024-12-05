import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDebouncedCallback } from 'use-debounce';

import { labels, t } from '../../helpers/dictionary';
import { routes, rwq } from '../../helpers/routes';

import QuickResults from './QuickResults';

import '../datatables/Tables.scss';

function QuickSearch() {
    const navigate = useNavigate();
    const [inputVal, setInputVal] = useState(null);
    const [apiQuery, setApiQuery] = useState(null);

    const q = encodeURIComponent(inputVal);
    const searchLink = rwq.searchAndFilter(
        routes.donations(),
        inputVal ? { q } : {}
    );

    const debounceSearch = useDebouncedCallback((value) => {
        setApiQuery(value);
    }, 500);

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
        debounceSearch(e.target.value);
    };

    const handleFormSumbit = (e) => {
        e.preventDefault();
        navigate(searchLink);
    };

    return (
        <div id="quick-search" className="mt-4">
            <h2 className="mb-3">{t(labels.donations.search.title)}</h2>
            <Form className="" onSubmit={handleFormSumbit}>
                <InputGroup>
                    <Form.Control
                        placeholder={t(labels.donations.search.placeholder)}
                        aria-label={t(labels.search.label)}
                        aria-describedby="quick-search-icon"
                        id="quicksearch"
                        onChange={handleInputChange}
                        value={inputVal || ''}
                    />
                    <InputGroup.Text
                        id="quick-search-icon"
                        className="search-icon"
                    >
                        <Link to={searchLink} className="text-decoration-none">
                            🔍
                        </Link>
                    </InputGroup.Text>
                </InputGroup>

                <QuickResults query={apiQuery} />

                <Button
                    as={Link}
                    to={searchLink}
                    variant="secondary"
                    className="mt-4"
                >
                    {t(labels.donations.search.advanced)}
                </Button>
            </Form>
        </div>
    );
}

export default QuickSearch;
