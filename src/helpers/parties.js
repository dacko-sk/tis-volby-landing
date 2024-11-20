const parties = [
    ['ALIANCIA', 'SPOLUPATRIČNOSŤ', 'SZÖVETSÉG - ALIANCIA'],
    ['DEMOKRATI'],
    ['DOBRÁ VOĽBA', 'DOBRA VOLBA'],
    ['HLAS'],
    ['ĽS-HZDS', 'LS-HZDS', 'LS - HZDS', 'HZDS'],
    ['KDH'],
    ['KÚ', 'KRESŤANSKÁ ÚNIA'],
    ['KSS'],
    [
        'ĽSNS',
        'LSNS',
        'KOTLEBOVCI - ĽS NAŠE SLOVENSKO',
        'KOTLEBA - ĽS NAŠE SLOVENSKO',
    ],
    ['MKO'],
    ['MOST-HÍD', 'MOST HID', 'MOST - HID', 'MOST - HÍD'],
    ['SLOVENSKO (OĽANO)', 'OĽANO', 'OĽANO - NOVA'],
    ['PS'],
    ['PS A SPOLU', 'KOALÍCIA PROGRESÍVNE SLOVENSKO A SPOLU'],
    ['REPUBLIKA'],
    ['SAS'],
    ['SDKÚ', 'SDKU', 'SDKÚ-DS', 'SDKU-DS', 'SDKÚ - DS', 'SDKU - DS'],
    ['SIEŤ', '#SIEŤ'],
    ['SME RODINA', 'SME RODINA - BORIS KOLLÁR'],
    ['SMER', 'SMER - SD'],
    ['SMK', 'SMK - MKP'],
    ['SNS'],
    ['SPOLU'],
    ['TEAM BRATISLAVA'],
    ['TEAM KRAJ NITRA'],
    ['ZA ĽUDÍ', 'ZA LUDI'],
];

export const partyAliases = (party) =>
    parties.find((pa) => pa.includes(party.toUpperCase())) ?? [party];

export const partyAlias = (party) => (party ? partyAliases(party)[0] : '');
