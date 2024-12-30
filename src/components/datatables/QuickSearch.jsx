import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDebouncedCallback } from 'use-debounce';

import { labels, t } from '../../helpers/dictionary';
import { routes, rwq } from '../../helpers/routes';

import TransactionsQuickResults from '../accounts/TransactionsQuickResults';
import DonorsQuickResults from '../donors/DonorsQuickResults';

import './Tables.scss';

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
            <h3 className="mb-3">{t(labels.donations.search.title)}</h3>
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

                <DonorsQuickResults q={apiQuery} />

                <TransactionsQuickResults q={apiQuery} />
            </Form>
        </div>
    );
}

export default QuickSearch;
