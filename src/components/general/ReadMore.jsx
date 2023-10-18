import { useState } from 'react';

import { labels, t } from '../../api/dictionary';

import './ReadMore.scss';

function ReadMore({ children, id = 'readmore', lines = 2 }) {
    const [open, setOpen] = useState(false);

    const toggle = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    return (
        <div className={`readmore${open ? '' : ' closed'}`}>
            <div
                id={id}
                style={open ? {} : { maxHeight: `${lines * 1.5}em` }}
                onClick={toggle}
            >
                {children}
            </div>
            {!open && (
                <a
                    href={`#${id}`}
                    className="d-block text-center"
                    onClick={toggle}
                >
                    {t(labels.readMore)}
                </a>
            )}
        </div>
    );
}

export default ReadMore;
