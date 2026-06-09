import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';

import { allowedParams } from '../../helpers/assetDeclarations';
import { parseQueryOptions } from '../../helpers/routes';

function FunctionBadge({ fn }) {
    const [expanded, setExpanded] = useState(false);
    const options = parseQueryOptions(allowedParams);
    const selected = options.f === fn;

    const words = fn.split(' ');
    const isLong = words.length > 6;
    const truncated = isLong ? words.slice(0, 6).join(' ') + '…' : fn;

    return (
        <Badge
            bg={selected ? 'primary' : 'transparent'}
            className={`${selected ? 'text-white' : 'text-primary'} border border-primary me-1 mb-1 ${expanded ? 'text-wrap text-start' : ''}`}
            onClick={() => setExpanded(!expanded)}
            style={isLong ? { cursor: 'pointer' } : {}}
            title={fn} // Shows full text on hover natively too
        >
            {expanded ? fn : truncated}
        </Badge>
    );
}

export default FunctionBadge;
