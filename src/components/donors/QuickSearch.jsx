import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { labels } from '../../api/constants';
import { routes } from '../../api/routes';

import './Donors.scss';

function QuickSearch() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(null);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFormSumbit = (e) => {
        e.preventDefault();
        navigate(routes.donations(searchQuery));
    };

    return (
        <div className="donor-search my-4 p-5">
            <h2 className="mb-3">{labels.donors.search.title}</h2>
            <Form className="" onSubmit={handleFormSumbit}>
                <InputGroup>
                    <Form.Control
                        placeholder={labels.donors.search.placeholder}
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
                        <Link to={routes.donations(searchQuery)}>🔍</Link>
                    </InputGroup.Text>
                </InputGroup>
                <Button
                    as={Link}
                    to={routes.donations(searchQuery)}
                    variant="secondary"
                    className="mt-4"
                >
                    {labels.donors.search.advanced}
                </Button>
            </Form>
        </div>
    );
}

export default QuickSearch;
