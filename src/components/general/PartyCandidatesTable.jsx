import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

import { tempExtraAccountKeys } from '../../hooks/AccountsData';

import './PartyCandidatesTable.scss';

function PartyCandidatesTable({ candidates }) {
    if (!candidates || !Array.isArray(candidates) || !candidates.length) {
        return null;
    }

    const rows = [];
    candidates.forEach((candidate) => {
        rows.push(
            <tr
                key={
                    candidate[tempExtraAccountKeys.name] +
                    candidate[tempExtraAccountKeys.municipality]
                }
                className={candidate.isElected ? 'row-elected' : ''}
            >
                <td>
                    <Link
                        className="fw-bold"
                        to={routes.candidateMunicipal(
                            candidate[tempExtraAccountKeys.name],
                            candidate.municipalityShortName
                        )}
                    >
                        {candidate[tempExtraAccountKeys.name]}
                    </Link>
                </td>
                <td>
                    {candidate[tempExtraAccountKeys.municipality] && (
                        <Link
                            to={routes.municipality(
                                candidate.municipalityShortName,
                                candidate[tempExtraAccountKeys.region] ?? null
                            )}
                        >
                            {candidate[tempExtraAccountKeys.municipality]}
                        </Link>
                    )}
                </td>
                {candidate[tempExtraAccountKeys.partySupport] && (
                    <td>{candidate[tempExtraAccountKeys.partySupport]}</td>
                )}
            </tr>
        );
    });

    return (
        <div className="party-candidates">
            <em className="disclaimer text-start">
                {t(labels.candidate.disclaimerParties)}
            </em>
            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>{t(labels.candidate.name)}</th>
                        <th>{t(labels.municipality)}</th>
                        <th>{t(labels.party.title)}</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}

export default PartyCandidatesTable;
