import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

function SearchField() {
    const navigate = useNavigate();

    const focusMainSearch = () => {
        navigate(routes.home(), { state: { focusMainSearch: true } });
    };

    const handleFormSumbit = (e) => {
        e.preventDefault();
    };

    return (
        <Form className="mt-2 mt-lg-0 mx-0 mx-lg-2" onSubmit={handleFormSumbit}>
            <InputGroup>
                <Form.Control
                    className="d-lg-none d-xxl-block"
                    placeholder={t(labels.search.label)}
                    aria-label={t(labels.search.label)}
                    aria-describedby="search-icon"
                    id="search"
                    onClick={focusMainSearch}
                    onFocus={focusMainSearch}
                    role="button"
                    value=""
                />
                <InputGroup.Text
                    id="search-icon"
                    className="d-xxl-flex"
                    onClick={focusMainSearch}
                    onFocus={focusMainSearch}
                    role="button"
                >
                    🔍
                </InputGroup.Text>
            </InputGroup>
        </Form>
    );
}

export default SearchField;
