import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';

function FunctionBadge({ fn }) {
    const [expanded, setExpanded] = useState(false);

    const words = fn.split(' ');
    const isLong = words.length > 6;

    if (!isLong || expanded) {
        return (
            <Badge
                bg="primary"
                className={`me-1 mb-1 ${isLong ? 'text-wrap text-start' : ''}`}
                onClick={() => setExpanded(false)}
                style={isLong ? { cursor: 'pointer' } : {}}
            >
                {fn}
            </Badge>
        );
    }

    const truncated = words.slice(0, 6).join(' ') + '…';

    return (
        <Badge
            bg="primary"
            className="me-1 mb-1"
            onClick={() => setExpanded(true)}
            style={{ cursor: 'pointer' }}
            title={fn} // Shows full text on hover natively too
        >
            {truncated}
        </Badge>
    );
}

export default FunctionBadge;
