import { useLocation } from 'react-router-dom';
import { wpTagsMap } from '../../helpers/parties';
import { getActiveSubsite } from '../../helpers/languages';
import useAdsData from '../../hooks/AdsData';

import PartyTag from './PartyTag';

function PartyTags({ tags, className, link }) {
    const { findPartyByWpTags, findCandidateByWpTags } = useAdsData();
    const location = useLocation();
    const subsite = getActiveSubsite(location.pathname);

    const matchedTags = tags.flatMap((tag) => {
        let name = wpTagsMap[tag];
        let isCandidate = false;

        if (!name) {
            name = findPartyByWpTags([tag]);
        }
        if (!name) {
            name = findCandidateByWpTags([tag]);
            if (name) {
                isCandidate = true;
            }
        }

        if (name && subsite === 'prezident2024') {
            isCandidate = true;
        }

        return name
            ? [<PartyTag key={tag} name={name} link={link} isCandidate={isCandidate} />]
            : [];
    });

    return matchedTags.length ? (
        <div className={className}>{matchedTags}</div>
    ) : null;
}

export default PartyTags;
