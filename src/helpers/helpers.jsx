import parse, { attributesToProps, domToReact } from 'html-react-parser';

export const slovakFormat = (value, options) =>
    new Intl.NumberFormat('sk-SK', options).format(value);

export const numFormat = (value) => slovakFormat(value, {});

export const pctFormat = (value) => {
    const num = Number(value);
    if (!Number.isNaN(num)) {
        return `${numFormat(num)} %`;
    }
    return '';
};

export const humanPctFormat = (value) =>
    pctFormat(100 * value, { maximumFractionDigits: 2 });

export const humanPctSignFormat = (value) =>
    pctFormat(100 * value, {
        maximumFractionDigits: 2,
        signDisplay: 'exceptZero',
    });

export const wholeNumFormat = (value) =>
    slovakFormat(value, {
        maximumFractionDigits: 0,
    });

export const currencyFormat = (value) =>
    slovakFormat(value, {
        style: 'currency',
        currency: 'EUR',
    });

export const wholeCurrencyFormat = (value) =>
    slovakFormat(value, {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
        // unit: 'million',
        notation: 'compact',
    });

export const slovakDateFormat = (timestamp, options) =>
    new Intl.DateTimeFormat('sk-SK', options).format(
        new Date(typeof timestamp === 'number' ? 1000 * timestamp : timestamp)
    );

export const dateTimeFormat = (timestamp) =>
    slovakDateFormat(timestamp, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

export const dateFormat = (timestamp) =>
    slovakDateFormat(timestamp, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export const dateNumericFormat = (timestamp) =>
    slovakDateFormat(timestamp, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

export const datePickerFormat = (timestamp) =>
    timestamp
        ? new Date(
              timestamp.toString().length >= 10 ? timestamp * 1000 : timestamp
          )
              .toISOString()
              .split('T')[0]
        : '';

export const getTimeFromDate = (string) => {
    const t = new Date(string).getTime();
    return Number.isNaN(t) ? 0 : t / 1000;
};

export const shortenValue = (value, length, removals) => {
    if (value) {
        let shorten = value;
        if (Array.isArray(removals)) {
            removals.forEach((removal) => {
                shorten = shorten.replace(removal, '');
            });
        }
        if (typeof shorten === 'string' && shorten.length > length) {
            return `${shorten.substring(0, length)}…`;
        }
        return shorten;
    }
    return '';
};

export const shortenUrl = (value) =>
    shortenValue(value, 32, ['https://', 'www.']);

export const fixUrl = (url) =>
    url.startsWith('http') ? url : `https://${url}`;

const proxyHttpImages = (html) => {
    const regex = /(http:\/\/cms.transparency.sk\/[^",]+.(png|jpe?g|gif|svg))/i;
    return html.replace(regex, 'https://images.weserv.nl/?url=$1');
};

const parserOptions = {
    replace: ({ name, attribs, children }) => {
        if (name === 'img' && attribs && attribs.src) {
            const props = {
                ...attributesToProps(attribs),
                // proxy image to force https
                src: proxyHttpImages(attribs.src),
                // add bootstrap 5 classes to images
                className: 'figure-img img-fluid',
            };
            return <img {...props} />;
        }
        if (name === 'a') {
            if (attribs && attribs.rel && attribs.rel.startsWith('lightbox')) {
                // remove lightbox links
                // will recursively run parser on children
                return domToReact(children, parserOptions);
            }
            if (
                children.length &&
                children[0].type === 'text' &&
                children[0].data.startsWith('Continue reading')
            ) {
                // remove "continue reading" links to WP domain
                return <></>;
            }
        }
        if (name === 'figure') {
            // add bootstrap 5 classes to figures
            return (
                <figure className={`figure ${attribs.class || ''}`}>
                    {domToReact(children, parserOptions)}
                </figure>
            );
        }
        if (name === 'figcaption') {
            // add bootstrap 5 classes to figcaptions
            return (
                <figcaption className="figure-caption text-center">
                    {domToReact(children, parserOptions)}
                </figcaption>
            );
        }
        // otherwise no replacement
        return null;
    },
};

export const parseWpHtml = (html) => parse(html, parserOptions);

export const decodeHTMLEntities = (rawStr) =>
    rawStr
        ? rawStr.replace(
              /&#(\d+);/g,
              (match, dec) => `${String.fromCharCode(dec)}`
          )
        : '';

/**
 * Break text separated by newline character to react fragments separated with <br/> tag
 */
export const nl2r = (text) =>
    typeof text === 'string' && text.includes('\n')
        ? text.split('\n').map((fragment, index) => (
              <span key={`${index}${fragment}`}>
                  {index > 0 && <br />}
                  {fragment}
              </span>
          ))
        : text;

/**
 * Highlight last n words of the sentence in text-secondary (orange) style
 */
export const secondarySentenceEnding = (textOrReact, wordsAmount, isLast) => {
    if (isLast ?? true) {
        wordsAmount = wordsAmount || 1;
        if (typeof textOrReact === 'string') {
            const words = textOrReact.split(' ');
            return (
                <span key={textOrReact}>
                    {`${words.slice(0, words.length - wordsAmount).join(' ')} `}
                    <span className="text-secondary">
                        {words.slice(-wordsAmount).join(' ')}
                    </span>
                </span>
            );
        } else if (Array.isArray(textOrReact)) {
            return textOrReact.map((item, index) =>
                secondarySentenceEnding(
                    item,
                    wordsAmount,
                    index === textOrReact.length - 1
                )
            );
        } else if (
            typeof textOrReact === 'object' &&
            (textOrReact.props.children ?? false)
        ) {
            const children = Object.values(textOrReact.props.children);
            return children.map((child, index) =>
                secondarySentenceEnding(
                    child,
                    wordsAmount,
                    index === children.length - 1
                )
            );
        }
    }
    return textOrReact;
};

export const sortNumbers = (asc) => (a, b) => asc ?? true ? a - b : b - a;

export const sortByNumericProp = (prop, asc) => (a, b) =>
    asc ? a[prop] - b[prop] : b[prop] - a[prop];

export const removeAccentsFromString = (str) =>
    str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

export const compareStr = (a, b) =>
    a &&
    b &&
    removeAccentsFromString(a.toLowerCase().trim()) ===
        removeAccentsFromString(b.toLowerCase().trim());

export const contains = (haystack, needle) =>
    haystack &&
    needle &&
    removeAccentsFromString(haystack.toLowerCase()).includes(
        removeAccentsFromString(needle.toLowerCase().trim())
    );

export const swapName = (name) => {
    const [first, second] = name.split(' ');
    return first && second ? `${second} ${first}` : name;
};

export const generateRandomString = (length) =>
    [...Array(length ?? 6)].map(() => Math.random().toString(36)[2]).join('');
