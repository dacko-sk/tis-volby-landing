import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import { donationsColumns as dc } from '../api/constants';
import { labels, t } from '../api/dictionary';
import {
    DonorFlags,
    DonorParties,
    columnLabels,
    entityLabels,
    hiddenDonorColumns,
} from '../api/dontaionsHelpers';
import { currencyFormat, setTitle } from '../api/helpers';
import { routes } from '../api/routes';

import Title from '../components/structure/Title';
import Loading from '../components/general/Loading';
import DonationsTable from '../components/donors/DonationsTable';

function Donor() {
    const params = useParams();
    const id = params.id ?? null;
    const navigate = useNavigate();

    const aq = useQuery([`donor_${id}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donors.php?i=${id}`
        ).then((response) => response.json())
    );

    const dq = useQuery([`donations_${id}`], () =>
        fetch(
            `https://volby.transparency.sk/api/donors/donations.php?i=${id}&b=200`
        ).then((response) => response.json())
    );

    useEffect(() => {
        if (!aq.isLoading && !aq.error && aq.data && !(aq.data.rows ?? false)) {
            // redirect to donations page in case of no data or invalid ID
            navigate(routes.donations());
        }
    }, [aq.isLoading, aq.error, aq.data, navigate]);

    const name = aq.data?.rows[0].name ?? '';
    let content;
    if (aq.isLoading || aq.error) {
        content = <Loading error={aq.error} />;
    } else {
        const donorData = aq.data.rows[0];
        content = (
            <Row>
                <Col lg={6}>
                    <h2 className="text-lg-center">
                        {t(labels.donations.donorInfo)}
                    </h2>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <th>{columnLabels[dc.entity]}</th>
                                <td className="text-end">
                                    {entityLabels[Number(donorData.company)]}
                                </td>
                            </tr>
                            <tr>
                                <th>{columnLabels[dc.address]}</th>
                                <td className="text-end">
                                    {donorData.location}
                                </td>
                            </tr>
                            <tr>
                                <th>{t(labels.donations.aggParties)}</th>
                                <td>
                                    <DonorParties
                                        className="justify-content-end"
                                        parties={donorData.parties}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>{t(labels.donations.aggAmount)}</th>
                                <td className="fw-bold text-end">
                                    {currencyFormat(donorData.amount)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col lg={6}>
                    <h2 className="text-lg-center">
                        {t(labels.donations.aggFlags)}
                    </h2>
                    <DonorFlags flags={donorData.flags} />
                </Col>
            </Row>
        );
    }

    setTitle(`${t(labels.donor)} ${name}`);

    return (
        <section>
            <Title secondary={name}>
                {t(labels.donor)}
                <br />
            </Title>
            {content}
            {dq.data?.rows.length > 0 && (
                <h2 className="my-4">{t(labels.donations.allDonations)}</h2>
            )}
            <DonationsTable
                donationsQuery={dq}
                hiddenColumns={hiddenDonorColumns}
            />
        </section>
    );
}

export default Donor;
