import { labels, t } from './dictionary';

export const isMobile = window.innerWidth < 576;

export const setTitle = (title) => {
    document.title = `${title} : ${t(labels.elections.title)} : ${t(
        labels.tis
    )}`;
};

export const scrollToTop = () => window.scrollTo(0, 0);

export const openUrl = (url) => (window.location.href = url);

export const openInNewTab = (url) => window.open(url, '_blank').focus();
