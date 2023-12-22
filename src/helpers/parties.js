const parties = [
    ['ALIANCIA', 'Spolupatričnosť'],
    ['DOBRÁ VOĽBA', 'DOBRA VOLBA', 'Dobrá voľba'],
    ['HLAS'],
    ['HZDS', 'LS-HZDS', 'LS - HZDS'],
    ['KDH'],
    ['KÚ', 'Kresťanská Únia'],
    ['KSS'],
    [
        'ĽSNS',
        'LSNS',
        'Kotlebovci - ĽS Naše Slovensko',
        'Kotleba - ĽS Naše Slovensko',
    ],
    ['MKO'],
    ['MOST-HÍD', 'MOST HID', 'MOST - HID', 'Most - Híd'],
    ['SLOVENSKO', 'OĽANO', 'OĽaNO - NOVA', 'OĽaNO'],
    ['PS'],
    ['PS a SPOLU', 'Koalícia Progresívne Slovensko a SPOLU'],
    ['REPUBLIKA'],
    ['SAS', 'SaS'],
    ['SDKÚ', 'SDKU', 'SDKU-DS', 'SDKU - DS'],
    ['SIEŤ', 'Sieť', '#SIEŤ'],
    ['SME RODINA', 'SME RODINA - Boris Kollár'],
    ['SMER', 'SMER - SD'],
    ['SMK', 'SMK - MKP'],
    ['SNS'],
    ['SPOLU', 'Demokrati'],
    ['TEAM BRATISLAVA'],
    ['TEAM KRAJ NITRA'],
    ['ZA ĽUDÍ', 'ZA LUDI', 'Za ľudí'],
];

export const partyAliases = (party) => {
    let aliases;
    parties.some((pa) => {
        if (pa.includes(party)) {
            aliases = pa;
            return true;
        }
        return false;
    });
    return aliases ?? [party];
};

export const partyAlias = (party) => (party ? partyAliases(party)[0] : '');
