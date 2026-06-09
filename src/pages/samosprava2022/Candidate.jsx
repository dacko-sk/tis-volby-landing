import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { labels, t } from '../../helpers/dictionary';
import {
    currencyFormat,
    setTitle,
    shortenUrl,
    substitute,
} from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import useData, {
    municipalTypes,
    tempExtraAccountKeys,
} from '../../hooks/AccountsData';

import AccountTransactions from '../../components/accounts/AccountTransactions';
import FinalReport from '../../components/general/FinalReport';
import Loading from '../../components/general/Loading';
import Title from '../../components/structure/Title';

function Candidate() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { csvData } = useData();

    // parse aggregated data
    let candidate = null;
    if (csvData?.data) {
        csvData.data.some((row) => {
            const key = routes.candidateMunicipal(
                row[tempExtraAccountKeys.name],
                row.municipalityShortName
            );
            if (pathname === key) {
                candidate = row;
                return true;
            }
            return false;
        });
    }

    useEffect(() => {
        if (!candidate && csvData?.data) {
            // redirect to home page in case candidate does not exist
            navigate(routes.home);
        }
    }, [candidate, csvData, navigate]);

    if (!candidate || !csvData?.data) {
        return <Loading />;
    }

    const partyAccounts = [];
    if (candidate[tempExtraAccountKeys.partyAccount] ?? false) {
        candidate[tempExtraAccountKeys.partyAccount]
            .split(';')
            .forEach((account) => {
                partyAccounts.push(
                    <a
                        key={account}
                        className="d-block"
                        href={account}
                        rel="noreferrer"
                        target="_blank"
                    >
                        {shortenUrl(account)}
                    </a>
                );
            });
    }

    setTitle(candidate[tempExtraAccountKeys.name]);

    return (
        <section className="candidate-page">
            <Title
                secondary={candidate[tempExtraAccountKeys.municipality] || null}
            >
                {candidate[tempExtraAccountKeys.name]}
                <br />
            </Title>
            <Table striped bordered responsive hover>
                <tbody>
                    <tr>
                        <td>{t(labels.type)}</td>
                        <td>
                            {t(
                                labels.elections.municipalTypes[
                                    candidate.isRegional
                                        ? municipalTypes.regional
                                        : municipalTypes.local
                                ]
                            )}
                        </td>
                    </tr>
                    {candidate[tempExtraAccountKeys.region] && (
                        <tr>
                            <td>{t(labels.candidate.region)}</td>
                            <td>
                                <Link
                                    to={routes.region(
                                        candidate[tempExtraAccountKeys.region]
                                    )}
                                >
                                    {substitute(
                                        candidate[tempExtraAccountKeys.region]
                                    )}
                                </Link>
                            </td>
                        </tr>
                    )}
                    {candidate[tempExtraAccountKeys.municipality] && (
                        <tr>
                            <td>{t(labels.municipality)}</td>
                            <td>
                                <Link
                                    to={routes.municipality(
                                        candidate.municipalityShortName,
                                        candidate[
                                            tempExtraAccountKeys.region
                                        ] ?? null
                                    )}
                                >
                                    {
                                        candidate[
                                            tempExtraAccountKeys.municipality
                                        ]
                                    }
                                </Link>
                            </td>
                        </tr>
                    )}
                    {candidate.isTransparent && (
                        <>
                            <tr>
                                <td>{t(labels.charts.incoming)}</td>
                                <td>
                                    {currencyFormat(candidate.sum_incoming)}
                                </td>
                            </tr>
                            <tr>
                                <td>{t(labels.charts.outgoing)}</td>
                                <td>
                                    {currencyFormat(candidate.sum_outgoing)}
                                </td>
                            </tr>
                            <tr>
                                <td>{t(labels.candidate.balance)}</td>
                                <td>{currencyFormat(candidate.balance)}</td>
                            </tr>
                            <tr>
                                <td>{t(labels.candidate.numIncoming)}</td>
                                <td>{candidate.num_incoming}</td>
                            </tr>
                            <tr>
                                <td>{t(labels.candidate.numOutgoing)}</td>
                                <td>{candidate.num_outgoing}</td>
                            </tr>
                            <tr>
                                <td>{t(labels.charts.uniqueDonors)}</td>
                                <td>{candidate.num_unique_donors}</td>
                            </tr>
                        </>
                    )}
                    {partyAccounts.length > 0 && (
                        <tr>
                            <td>
                                {partyAccounts.length > 1
                                    ? t(labels.candidate.partyAccounts)
                                    : t(labels.candidate.partyAccount)}
                            </td>
                            <td>{partyAccounts}</td>
                        </tr>
                    )}
                    {candidate[tempExtraAccountKeys.partySupport] && (
                        <tr>
                            <td>{t(labels.party.title)}</td>
                            <td>
                                {candidate[tempExtraAccountKeys.partySupport]}
                            </td>
                        </tr>
                    )}
                    <FinalReport candidate={candidate} tableRow />
                </tbody>
            </Table>

            <em className="disclaimer">
                {candidate.isTransparent
                    ? t(labels.candidate.disclaimerAccount)
                    : t(labels.candidate.disclaimerCandidate)}
            </em>

            <AccountTransactions candidate={candidate} />
        </section>
    );
}

export default Candidate;
