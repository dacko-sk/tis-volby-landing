import { wpTagsMap } from '../../helpers/parties';

import PartyTag from './PartyTag';

function PartyTags({ tags, className, link }) {
    const matchedTags = tags.flatMap((tag) =>
        wpTagsMap[tag]
            ? [<PartyTag key={tag} name={wpTagsMap[tag]} link={link} />]
            : []
    );

    return matchedTags.length ? (
        <div className={className}>{matchedTags}</div>
    ) : null;
}

export default PartyTags;
