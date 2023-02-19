import Countdown from 'react-countdown';
import { dateFormat } from '../../api/helpers';

import './ElectionsCountdown.scss';

function ElectionsCountdown({ start, end }) {
    const dateStart = new Date(start).getTime();
    const dateEnd = new Date(end).getTime();
    const dateCurrent = new Date().getTime();

    // Renderer callback with condition
    const renderer = ({ formatted, completed }) => {
        if (completed) {
            // Render a completed state
            return <div className="hero-number">Voľby sa skončili</div>;
        }
        // Render a countdown
        return (
            <div className="countdown hero-number">
                <span className="countdown-bg-o me-3" data-label="dní">
                    {formatted.days}
                </span>
                <span className="countdown-bg me-3" data-label="hodín">
                    {formatted.hours}
                </span>
                <span className="countdown-bg me-3" data-label="minút">
                    {formatted.minutes}
                </span>
                <span className="countdown-bg" data-label="sekúnd">
                    {formatted.seconds}
                </span>
            </div>
        );
    };

    return dateCurrent > dateEnd ? (
        <div className="elections-countdown">
            <p className="lead mt-3 mb-1">Dátum konania volieb</p>
            <div className="hero-number">{dateFormat(start)}</div>
        </div>
    ) : (
        <div className="elections-countdown">
            <p className="lead mt-3 mb-1">
                Zostávajúci čas do
                {dateCurrent > dateStart ? ' konca' : ''} volieb
            </p>
            <Countdown
                date={dateCurrent > dateStart ? dateEnd : dateStart}
                renderer={renderer}
            />
        </div>
    );
}

export default ElectionsCountdown;
