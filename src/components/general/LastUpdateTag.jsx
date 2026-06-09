import { labels, t } from '../../helpers/dictionary';
import { dateTimeFormat } from '../../helpers/helpers';

function LastUpdateTag({ children, timestamp }) {
    const formattedDate = dateTimeFormat(timestamp);
    if (!formattedDate) {
        return null;
    }
    return (
        <em className="disclaimer">
            {children && (
                <>
                    {children}
                    <br />
                </>
            )}
            {t(labels.lastUpdate)} {formattedDate}.
        </em>
    );
}

export default LastUpdateTag;
