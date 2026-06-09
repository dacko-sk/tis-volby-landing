import { csvConfig } from '../hooks/AdsData';

import dummy from '../../public/img/user_grey.png';

// import all csv files from the accounts folder via webpack
const candidatesImages = require.context(
    '../../public/img/candidates',
    false,
    /\.jpg$/
);

export const candidateImage = (name) => {
    const file = candidatesImages
        .keys()
        .find((key) => key.endsWith(`${name}.jpg`));
    return file ? candidatesImages(file) : dummy;
};

export const candidateData = (name, accountData, adsData) => {
    const data = {
        name,
        image: candidateImage(name),
        account: accountData,
        ...(adsData ?? {}),
    };
    data.hasAccount = accountData !== false;
    data.hasMeta = adsData && !!data[csvConfig.ACCOUNTS.columns.FB].length;
    data.hasGoogle =
        adsData && !!data[csvConfig.ACCOUNTS.columns.GOOGLE].length;
    data.hasWp = adsData && !!data[csvConfig.ACCOUNTS.columns.WP];
    data.hasInfo = adsData && data[csvConfig.ACCOUNTS.columns.INFO] !== null;
    data.hasReport =
        adsData && data[csvConfig.ACCOUNTS.columns.REPORT] !== null;
    data.infoKey = data[csvConfig.ACCOUNTS.columns.INFO] ?? null;
    data.isValid = data.hasAccount || adsData !== false;

    return data;
};
