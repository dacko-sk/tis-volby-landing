import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../../helpers/browser';
import { getPartyChartLabel, candidateChartLabel } from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { fixNumber, sortByNumericProp } from '../../helpers/helpers';
import { formatDefs } from '../../helpers/online';
import { segments } from '../../helpers/routes';

import useAdsData, { csvConfig, csvFiles } from '../../hooks/AdsData';
import useCsvData from '../../hooks/AccountsData';

import { chartKeys, columnVariants } from '../../helpers/charts';
import TisBarChart from '../charts/TisBarChart';
import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';
import TisPieChart from '../charts/TisPieChart';

function Google({
    accKeys = {
        SPENDING_PARTIES: 'SPENDING_PARTIES',
        SPENDING_ACCOUNTS: 'SPENDING_ACCOUNTS',
        AMOUNTS_PARTIES: 'AMOUNTS_PARTIES',
        AMOUNTS_ACCOUNTS: 'AMOUNTS_ACCOUNTS',
        FORMATS: 'FORMATS',
    },
    googleColumns = csvConfig[csvFiles.GOOGLE].columns,
}) {
    const [activeKeys, setActiveKeys] = useState([accKeys.SPENDING_PARTIES]);
    const [loadedCharts, setLoadedCharts] = useState([
        accKeys.SPENDING_PARTIES,
    ]);

    const {
        findPartyForGoogleAccount,
        findCandidateForGoogleAccount,
        sheetsData,
        findPartyByName,
    } = useAdsData();

    // parse data from sheets
    const spendingAggr = {};
    const spendingAccounts = {};
    const amountsAggr = {};
    const amountsAccounts = {};
    const formatAggr = {};
    const formatPie = {
        data: [],
        nameKey: 'name',
        dataKey: 'value',
        label: t(labels.charts.outgoing),
    };
    if (sheetsData.lastUpdateGgl) {
        sheetsData.googleAds.forEach((pageData) => {
            const parentPartyName =
                findPartyForGoogleAccount(pageData[googleColumns.ID]) ||
                findCandidateForGoogleAccount(pageData[googleColumns.ID]);
            const accountName = pageData[googleColumns.PAGE_NAME] ?? null;
            const partyChartLabel = findPartyForGoogleAccount(
                pageData[googleColumns.ID]
            )
                ? getPartyChartLabel(parentPartyName, segments.ONLINE)
                : findCandidateForGoogleAccount(pageData[googleColumns.ID])
                  ? candidateChartLabel(parentPartyName, segments.ONLINE)
                  : parentPartyName;
            const outgoing = fixNumber(pageData[googleColumns.SPENDING]);
            const num = fixNumber(pageData[googleColumns.AMOUNT]);

            // aggregated party charts
            if (parentPartyName) {
                if (spendingAggr[parentPartyName] ?? false) {
                    spendingAggr[parentPartyName][chartKeys.OUTGOING] +=
                        outgoing;
                } else {
                    spendingAggr[parentPartyName] = {
                        name: partyChartLabel,
                        [chartKeys.OUTGOING]: outgoing,
                    };
                }

                if (loadedCharts.includes(accKeys.AMOUNTS_PARTIES)) {
                    if (amountsAggr[parentPartyName] ?? false) {
                        amountsAggr[parentPartyName][chartKeys.AMOUNT] += num;
                    } else {
                        amountsAggr[parentPartyName] = {
                            name: partyChartLabel,
                            [chartKeys.AMOUNT]: num,
                        };
                    }
                }
            }

            // single profiles charts
            if (loadedCharts.includes(accKeys.SPENDING_ACCOUNTS)) {
                if (spendingAccounts[accountName] ?? false) {
                    spendingAccounts[accountName][chartKeys.OUTGOING] +=
                        outgoing;
                } else {
                    spendingAccounts[accountName] = {
                        name: accountName,
                        [chartKeys.OUTGOING]: outgoing,
                    };
                }
            }

            if (loadedCharts.includes(accKeys.AMOUNTS_ACCOUNTS)) {
                if (amountsAccounts[accountName] ?? false) {
                    amountsAccounts[accountName][chartKeys.AMOUNT] += num;
                } else {
                    amountsAccounts[accountName] = {
                        name: accountName,
                        [chartKeys.AMOUNT]: num,
                    };
                }
            }

            if (loadedCharts.includes(accKeys.FORMATS)) {
                Object.keys(formatDefs).forEach((fKey) => {
                    if (pageData[fKey] ?? false) {
                        formatAggr[fKey] =
                            (formatAggr[fKey] ?? 0) + fixNumber(pageData[fKey]);
                    }
                });
            }
        });
    }

    // sort & preprocess aggregated data for charts
    Object.entries(formatAggr).forEach(([fKey, value]) => {
        formatPie.data.push({
            name: fKey,
            value,
            color: formatDefs[fKey],
        });
    });

    const charts = {
        [accKeys.SPENDING_PARTIES]: loadedCharts.includes(
            accKeys.SPENDING_PARTIES
        ) ? (
            <TisBarChart
                bars={columnVariants.spending}
                currency
                data={Object.values(spendingAggr).sort(
                    sortByNumericProp(chartKeys.OUTGOING)
                )}
                subtitle={t(labels.ads.google.spending.partiesDisclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                vertical
            />
        ) : null,
        [accKeys.SPENDING_ACCOUNTS]: loadedCharts.includes(
            accKeys.SPENDING_ACCOUNTS
        ) ? (
            <TisBarChart
                bars={columnVariants.spending}
                currency
                data={Object.values(spendingAccounts).sort(
                    sortByNumericProp(chartKeys.OUTGOING)
                )}
                subtitle={t(labels.ads.google.spending.disclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                vertical
            />
        ) : null,
        [accKeys.AMOUNTS_PARTIES]: loadedCharts.includes(
            accKeys.AMOUNTS_PARTIES
        ) ? (
            <TisBarChart
                bars={columnVariants.amount}
                data={Object.values(amountsAggr).sort(
                    sortByNumericProp(chartKeys.AMOUNT)
                )}
                subtitle={t(labels.ads.amount.disclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                vertical
            />
        ) : null,
        [accKeys.AMOUNTS_ACCOUNTS]: loadedCharts.includes(
            accKeys.AMOUNTS_ACCOUNTS
        ) ? (
            <TisBarChart
                bars={columnVariants.amount}
                data={Object.values(amountsAccounts).sort(
                    sortByNumericProp(chartKeys.AMOUNT)
                )}
                subtitle={t(labels.ads.amount.disclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                vertical
            />
        ) : null,
        [accKeys.FORMATS]: loadedCharts.includes(accKeys.FORMATS) ? (
            <Row className="gy-3">
                <Col xl={6}>
                    <TisPieChart
                        currency
                        pie={formatPie}
                        percent={false}
                        subtitle={t(labels.ads.google.format.disclaimer)}
                        timestamp={sheetsData.lastUpdateGgl}
                    />
                </Col>
            </Row>
        ) : null,
    };

    let accordionsConfig = [
        [accKeys.SPENDING_PARTIES, labels.ads.google.spending.partiesTitle],
        [accKeys.SPENDING_ACCOUNTS, labels.ads.google.spending.accountsTitle],
        [accKeys.AMOUNTS_PARTIES, labels.ads.amount.partiesTitle],
        [accKeys.AMOUNTS_ACCOUNTS, labels.ads.amount.accountsTitle],
        [accKeys.FORMATS, labels.ads.google.format.title],
    ];

    if (window.location.pathname.includes('/prezident2024')) {
        accordionsConfig = [
            [
                accKeys.SPENDING_PARTIES,
                labels.ads.google.spending.accountsTitle,
            ],
            [accKeys.AMOUNTS_PARTIES, labels.ads.amount.title],
            [accKeys.FORMATS, labels.ads.google.format.title],
        ];
    }

    const accordions = accordionsConfig.map(([key, label]) => (
        <Accordion.Item key={key} eventKey={key}>
            <Accordion.Header>{t(label)}</Accordion.Header>
            <Accordion.Body>{charts[key]}</Accordion.Body>
        </Accordion.Item>
    ));

    if (!sheetsData.lastUpdateGgl || sheetsData.error) {
        // waiting for data or error in loding
        return <Loading error={sheetsData.error} />;
    }

    const onSelect = (ak) => {
        // open/close accordion
        setActiveKeys(ak);
        // remember if chart was already loaded
        ak.forEach((key) => {
            if (!loadedCharts.includes(key)) {
                setLoadedCharts([...loadedCharts, ...[key]]);
            }
        });
    };

    setTitle('Online kampane Google');

    return (
        <div>
            <Accordion
                className="mt-4"
                activeKey={activeKeys}
                alwaysOpen
                onSelect={onSelect}
            >
                {accordions}
            </Accordion>
        </div>
    );
}

export default Google;
