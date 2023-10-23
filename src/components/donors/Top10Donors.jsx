import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useQuery } from '@tanstack/react-query';

import { donationsColumns as dc } from '../../api/constants';
import { currencyFormat } from '../../api/helpers';
import { labels, t } from '../../api/dictionary';
import {
    DonorParties,
    columnLabel,
    typeLabel,
} from '../../api/dontaionsHelpers';
import { routes } from '../../api/routes';

import Loading from '../general/Loading';

function Top10Donors({ disclaimer, file, title }) {
    const { isLoading, error, data } = useQuery([`donors_${file}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donors_json.php?f=${file}`
        ).then((response) => response.json())
    );

    let content;
    if (isLoading || error) {
        content = <Loading error={error} />;
    } else {
        content = (
            <Table responsive bordered hover striped>
                <thead>
                    <tr className="align-middle">
                        <th>{t(labels.donor.pageTitle)}</th>
                        <th>{columnLabel(dc.address)}</th>
                        <th>{t(labels.donor.amount)}</th>
                        <th>{t(labels.donor.parties)}</th>
                        <th>{columnLabel(dc.type)}</th>
                    </tr>
                </thead>
                <tbody>
                    {(data.rows ?? []).map((donorData) => (
                        <tr key={donorData.name}>
                            <td>
                                <Link to={routes.donor(donorData.id)}>
                                    {donorData.name}
                                </Link>
                            </td>
                            <td>{donorData.location}</td>
                            <td>{currencyFormat(donorData.amount)}</td>
                            <td>
                                <DonorParties parties={donorData.parties} />
                            </td>
                            <td>
                                {Object.entries(donorData.types)
                                    .map(([type, count]) =>
                                        typeLabel(type, count > 1)
                                    )
                                    .join(', ')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    return (
        <div>
            <h2 className="my-4">{t(title)}</h2>
            {content}
            <em className="disclaimer">{t(disclaimer)}</em>
        </div>
    );
}

export default Top10Donors;
