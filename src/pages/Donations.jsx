import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { getCurrentLanguage, languages } from '../helpers/languages';

import DonationsSearch from '../components/donors/DonationsSearch';
import ReadMore from '../components/general/ReadMore';
import FundingNav from '../components/structure/FundingNav';
import Title from '../components/structure/Title';

const introText = {
    [languages.sk]: (
        <>
            <p>
                Transparency International Slovensko prináša na tomto mieste
                prehľadnú databázu darcov a veriteľov politických strán a hnutí.
                Tieto údaje boli dosiaľ dostupné iba v stovkách výročných správ
                rôznych politických subjektov, neraz v podobe nascanovaných
                obrázkov bez možnosti vyhľadávania a kopírovania.
            </p>
            <p>
                Zdrojom dát sú výlučne výročné správy strán, v ktorých uvádzajú
                príjmy na základe uzatvorených zmlúv podľa zákona 85/2005 Z. z.
                o politických stranách a politických hnutiach. Spracované sú
                zatiaľ výročné správy za obdobie rokov 2002 až 2022 prevažne
                dosiaľ aktívnych a väčších strán. Databázu budeme priebežne
                rozširovať a aktualizovať.
            </p>

            <p>
                Portál umožňuje darcov a veriteľov filtrovať a zoraďovať podľa
                preferencií, napríklad podľa názvu strany či výšky transakcie.
                Obsahuje aj údaje o kumulatívnych sumách poskytnutých subjektami
                a osobami, ako aj príznak v prípade darov a bezodplatných plnení
                nad 10-tisíc a pôžičiek nad 100-tisíc eur (netýka sa bankových
                úverov). Pri každej transakcii je dostupný aj odkaz na zdrojový
                dokument s ďalšími dodatočnými informáciami.
            </p>

            <p>
                Údaje z transparentných účtov, vrátane drobných darov,
                zobrazujeme od roku 2022 na podstránkach monitorujúcich kampane
                pred jednotlivými voľbami (napr. pre{' '}
                <a href="https://volby.transparency.sk/parlament2023/strany">
                    parlamentné voľby 2023
                </a>{' '}
                dostupné po kliknutí na jednotlivú stranu a záložku
                financovanie).
            </p>

            <p>
                V prípade otázok alebo upozornení nás prosím kontaktujte na{' '}
                <a href="mailto:tis@transparency.sk">tis@transparency.sk</a>.
            </p>
        </>
    ),
    [languages.en]: (
        <>
            <p>
                Transparency International Slovakia presents a comprehensive
                database featuring donors and creditors of political parties and
                movements. Previously, this information was scattered across
                hundreds of annual reports from different political entities,
                often presented as scanned images, making it difficult to search
                and extract data.
            </p>
            <p>
                Our data source is exclusively the annual reports submitted by
                the parties. These reports detail their income derived from
                contracts, as stipulated in Act 85/2005 Coll. on political
                parties and political movements. We have processed annual
                reports spanning from 2002 to 2022, primarily focusing on active
                and larger parties. We are committed to continually expanding
                and updating this database.
            </p>

            <p>
                The portal allows filtering and sorting donors and creditors
                according to the users‘ preferences. It provides cumulative
                amounts contributed by both legal entities and individuals.
                Additionally, it flags donations, free services exceeding 10,000
                euros, and loans surpassing 100,000 euros (excluding bank loans)
                with a risk indicator. Each transaction includes a link to the
                source document, offering additional contextual information.
            </p>

            <p>
                Starting from 2022, we have collected and presented all
                transactions from transparent bank accounts, encompassing even
                small donations. These are accessible through sub-pages
                dedicated to monitoring election campaigns, such as the upcoming{' '}
                <a href="https://volby.transparency.sk/parlament2023/strany">
                    2023 parliamentary elections
                </a>
                . To access specific party information and funding details,
                simply click on the party name and navigate to the funding tab.
            </p>

            <p>
                For any inquiries or concerns, please feel free to reach out to
                us at{' '}
                <a href="mailto:tis@transparency.sk">tis@transparency.sk</a>.
            </p>
        </>
    ),
};

function Donations() {
    setTitle(t(labels.donations.pageTitle));

    return (
        <section>
            <Title secondaryWords={1}>{t(labels.donations.pageTitle)}</Title>

            <FundingNav />

            <ReadMore id="financovanie-uvod" lines={4}>
                {introText[getCurrentLanguage()]}
            </ReadMore>

            <DonationsSearch />
        </section>
    );
}

export default Donations;
