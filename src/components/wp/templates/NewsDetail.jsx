import { dateFormat } from '../../../helpers/helpers';
import { parseWpHtml } from '../../../helpers/wp';

function NewsDetail({ article }) {
    return (
        <div className="article-body">
            <div className="article-date my-4">{dateFormat(article.date)}</div>
            {parseWpHtml(article.content.rendered)}
        </div>
    );
}

export default NewsDetail;
