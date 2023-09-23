import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Loading from '../general/Loading';
import { settings } from '../../api/constants';

function SearchResults() {
    const params = useParams();
    const filters = (params.query ?? '').replace(/[~_]/g, (match) =>
        match === '~' ? '&' : '='
    );

    const { isLoading, error, data } = useQuery([`donations_${filters}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donations.php?${filters}`
        ).then((response) => response.json())
    );

    if (isLoading || error) {
        return <Loading error={error} />;
    }

    const headerCols = settings.donorsColumns.map((item, index) => {
        const k = `i${index}`;
        return <th key={k}>{item}</th>;
    });
    const rows = [];
    if ((data.rows ?? false) && Array.isArray(data.rows)) {
        data.rows.forEach((row) => {
            const cols = row.map((item, index) => {
                const k = `i${index}`;
                return <td key={k}>{item}</td>;
            });
            rows.push(<tr key={`${row[1]}${row[2]}${row[4]}`}>{cols}</tr>);
        });
    }

    return (
        <section>
            Search: {filters}
            <table>
                <thead>
                    <tr>{headerCols}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </section>
    );
}

export default SearchResults;
