import has from 'has';

import { errors } from '../../api/constants';

import './Loading.scss';

function Loading({ className, error, small }) {
    const animation = small ? (
        <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>
    ) : (
        <div className="lds-grid">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
    let message = null;
    if (!!error && has(error, 'message')) {
        console.log(error.message);
        message = errors.loading;
    }
    const heightClass = className || (small ? 'small' : 'big');
    return (
        <div className={`row justify-content-center loading ${heightClass}`}>
            <div className="col-auto align-self-center">
                {message || animation}
            </div>
        </div>
    );
}

export default Loading;
