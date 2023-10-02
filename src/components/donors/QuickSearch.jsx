import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { labels } from '../../api/constants';
import { routes, separators } from '../../api/routes';

import './Donors.scss';

function QuickSearch() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(null);

    const searchLink = routes.donations(
        searchQuery
            ? `q${separators.value}${encodeURIComponent(searchQuery)}`
            : ''
    );

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFormSumbit = (e) => {
        e.preventDefault();
        navigate(searchLink);
    };

    return (
        <div className="donor-search my-4 p-5">
            <h2 className="mb-3">{labels.donations.search.title}</h2>
            <Form className="" onSubmit={handleFormSumbit}>
                <InputGroup>
                    <Form.Control
                        placeholder={labels.donations.search.placeholder}
                        aria-label={labels.search}
                        aria-describedby="quick-search-icon"
                        id="quicksearch"
                        onChange={handleInputChange}
                        value={searchQuery || ''}
                    />
                    <InputGroup.Text
                        id="quick-search-icon"
                        className="search-icon"
                    >
                        <Link to={searchLink}>🔍</Link>
                    </InputGroup.Text>
                </InputGroup>
                <Button
                    as={Link}
                    to={searchLink}
                    variant="secondary"
                    className="mt-4"
                >
                    {labels.donations.search.advanced}
                </Button>
            </Form>
        </div>
    );
}

export default QuickSearch;
