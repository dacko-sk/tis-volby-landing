import { dateFormat } from '../../../helpers/helpers';
import { getActiveSubsite } from '../../../helpers/languages';
import { parseWpHtml } from '../../../helpers/wp';

import PartyTags from '../PartyTags';

function NewsDetail({ article }) {
    const subsite = getActiveSubsite();
    return (
        <div className="article-body">
            <div className="d-md-flex">
                <div className="article-date my-4 me-auto">
                    {dateFormat(article.date)}
                </div>
                {subsite !== 'samosprava2022' && subsite !== 'samosprava2026' && (
                    <PartyTags
                        className="article-tags my-4"
                        link
                        tags={article.tags}
                    />
                )}
            </div>
            {parseWpHtml(article.content.rendered)}
        </div>
    );
}

export default NewsDetail;
