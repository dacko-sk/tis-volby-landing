import { Link, useOutletContext } from 'react-router-dom';

import { routes, segments } from '../../helpers/routes';

function PartyTag({ name, link }) {
    const currentParty = useOutletContext();
    const tag = currentParty === name ? <strong>{name}</strong> : name;

    return link ? (
        <Link className="tag" key={name} to={routes.party(name, segments.NEWS)}>
            {tag}
        </Link>
    ) : (
        <span className="tag" key={name}>
            {tag}
        </span>
    );
}

export default PartyTag;
