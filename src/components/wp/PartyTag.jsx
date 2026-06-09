import { Link, useOutletContext } from 'react-router-dom';

import { routes, segments } from '../../helpers/routes';
import { getLastWord } from '../../helpers/helpers';

function PartyTag({ name, link, isCandidate }) {
    const currentEntity = useOutletContext();
    // In Candidates/Parties contexts, the context value might be an object containing the name, or just the name string.
    // Ensure we handle both cases if necessary, but currentParty is likely the candidate/party object or name.
    // Wait, in Candidate.jsx: <Outlet context={candidate} />
    const isCurrent = currentEntity && (currentEntity === name || currentEntity.name === name);
    
    const label = isCandidate ? getLastWord(name) : name;
    const tag = isCurrent ? <strong>{label}</strong> : label;

    return link ? (
        <Link className="tag" key={name} to={isCandidate ? routes.candidate(name, segments.NEWS) : routes.party(name, segments.NEWS)}>
            {tag}
        </Link>
    ) : (
        <span className="tag" key={name}>
            {tag}
        </span>
    );
}

export default PartyTag;
