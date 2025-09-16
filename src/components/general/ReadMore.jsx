import { useState } from 'react';

import { labels, t } from '../../helpers/dictionary';

import './ReadMore.scss';

function ReadMore({ children, id = 'readmore', lines = 2 }) {
    const [open, setOpen] = useState(false);

    if (open) {
        return children;
    }

    const clickToggle = (e) => {
        e.preventDefault();
        setOpen(!open);
    };
    const keyUpToggle = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            setOpen(!open);
        }
    };

    return (
        <div className="readmore closed">
            <div
                id={id}
                style={{ maxHeight: `${lines * 1.5}em` }}
                onClick={clickToggle}
                onKeyUp={keyUpToggle}
                role="button"
                tabIndex={-1}
            >
                {children}
            </div>
            <a
                href={`#${id}`}
                className="d-block text-center"
                onClick={clickToggle}
            >
                {t(labels.readMore)}
            </a>
        </div>
    );
}

export default ReadMore;
