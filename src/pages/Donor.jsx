import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

import { buildUrlQuery, donations } from '../api/dontaions';
import { currencyFormat, setTitle } from '../api/helpers';
import { routes } from '../api/routes';

import Title from '../components/structure/Title';
import Loading from '../components/general/Loading';
import { labels } from '../api/constants';
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
                        {labels.donations.donorInfo}
                    </h2>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <th>{donations.allColumns.entity}</th>
                                <td className="text-end">
                                    {
                                        donations.entities[
                                            Number(donorData.company)
                                        ]
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>{donations.allColumns.address}</th>
                                <td className="text-end">
                                    {donorData.location}
                                </td>
                            </tr>
                            <tr>
                                <th>{donations.aggColumns.parties}</th>
                                <td>
                                    <Stack
                                        className="flex-wrap justify-content-end"
                                        direction="horizontal"
                                        gap={2}
                                    >
                                        {donorData.parties.map((party) => {
                                            return (
                                                <Link
                                                    key={party}
                                                    to={routes.donations(
                                                        buildUrlQuery({
                                                            p: party,
                                                        })
                                                    )}
                                                >
                                                    <Badge bg="secondary">
                                                        {party}
                                                    </Badge>
                                                </Link>
                                            );
                                        })}
                                    </Stack>
                                </td>
                            </tr>
                            <tr>
                                <th>{donations.aggColumns.amount}</th>
                                <td className="fw-bold text-end">
                                    {currencyFormat(donorData.amount)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col lg={6}>
                    <h2 className="text-lg-center">
                        {labels.donations.aggFlags}
                    </h2>
                    <Row className="text-center mt-5">
                        {Object.entries(donorData.flags).map(
                            ([flag, enabled]) => {
                                if (!enabled) {
                                    return null;
                                }
                                return (
                                    <Col key={flag}>
                                        <Badge
                                            bg="light"
                                            pill
                                            className={`flag-${flag} border bg-opacity-25 fs-2`}
                                        >
                                            🏴
                                        </Badge>
                                        <h5 className="mt-2">
                                            {donations.flags[Number(flag)]}
                                        </h5>
                                    </Col>
                                );
                            }
                        )}
                    </Row>
                </Col>
            </Row>
        );
    }

    setTitle(`Donor ${name}`);

    return (
        <section>
            <Title secondary={name}>
                Donor
                <br />
            </Title>
            {content}
            {dq.data?.rows.length > 0 && (
                <h2 className="my-4">{labels.donations.allDonations}</h2>
            )}
            <DonationsTable
                donationsQuery={dq}
                hiddenColumns={donations.hiddenDonorColumns}
            />
        </section>
    );
}

export default Donor;
