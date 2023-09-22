import { useParams } from 'react-router-dom';

function SearchResults() {
    const params = useParams();
    const searchQuery = params.query ?? null;

    const rows = [];

    return (
        <section>
            Search: {searchQuery}
            <table>{rows}</table>
        </section>
    );
}

export default SearchResults;
