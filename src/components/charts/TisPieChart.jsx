import { useState } from 'react';
import { ResponsiveContainer, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { isMobile } from '../../helpers/browser';
import {
    preparePctData,
    PieLabel,
    PieSector,
    PieTooltip,
    PieLabelLine,
    PieLegendContent,
} from '../../helpers/charts';
import {
    currencyFormat,
    humanPctFormat,
    numFormat,
    wholeCurrencyFormat,
} from '../../helpers/helpers';

import LastUpdateTag from '../general/LastUpdateTag';

import './Charts.scss';

function TisPieChart({
    className = '',
    currency = false,
    disclaimer,
    lastUpdate = true,
    nameLabels = false,
    percent = true,
    pie,
    subtitle,
    timestamp,
    title,
}) {
    if (!pie || !Array.isArray(pie.data ?? false) || !pie.data.length) {
        return null;
    }

    const [activeSegment, setActiveSegment] = useState(null);

    const hasInner = !!(pie.innerKey ?? false);

    const dataKeys = [pie.dataKey];
    const dataLabels = [pie.label];
    if (hasInner) {
        dataKeys.push(pie.innerKey);
        dataLabels.push(pie.innerLabel);
    }
    const data = percent ? preparePctData(pie.data, dataKeys) : pie.data;

    let labelFormatter = humanPctFormat;
    let tooltipFormatter = humanPctFormat;
    if (!percent) {
        labelFormatter = currency ? wholeCurrencyFormat : numFormat;
        tooltipFormatter = currency ? currencyFormat : numFormat;
    }

    const label = PieLabel(nameLabels, percent, labelFormatter);
    const tooltip = PieTooltip(dataKeys, dataLabels, tooltipFormatter);

    const pieClick = (segmentProps, segmentKey) => {
        setActiveSegment(segmentKey === activeSegment ? null : segmentKey);
    };

    const pieOver = (segmentProps, segmentKey) => {
        if (segmentKey !== activeSegment) {
            setActiveSegment(segmentKey);
        }
    };

    const pieOut = () => {
        setActiveSegment(null);
    };

    return (
        <div className={`chart-wrapper pie-chart ${className}`}>
            {title && <h2 className={subtitle ? '' : 'mb-3'}>{title}</h2>}
            {subtitle && <h6>{subtitle}</h6>}
            {lastUpdate && (
                <LastUpdateTag timestamp={timestamp ?? null}>
                    {disclaimer}
                </LastUpdateTag>
            )}
            <div className="chart-outer">
                <div className="chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={activeSegment}
                                className={
                                    activeSegment !== null
                                        ? 'has-active-sector'
                                        : ''
                                }
                                data={data}
                                dataKey={pie.dataKey}
                                nameKey={pie.nameKey}
                                cx="50%"
                                cy="50%"
                                innerRadius="55%"
                                outerRadius="75%"
                                paddingAngle={1}
                                fill={pie.color}
                                label={label}
                                labelLine={PieLabelLine}
                                animationDuration={750}
                                onClick={pieClick}
                                onMouseOver={pieOver}
                                onMouseOut={pieOut}
                                shape={PieSector}
                            />
                            {hasInner && (
                                <Pie
                                    activeIndex={activeSegment}
                                    className={
                                        activeSegment !== null
                                            ? 'has-active-sector'
                                            : ''
                                    }
                                    data={data}
                                    dataKey={pie.innerKey}
                                    nameKey={pie.nameKey}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius="45%"
                                    paddingAngle={1}
                                    fill={pie.color}
                                    label={false}
                                    animationDuration={750}
                                    onClick={pieClick}
                                    onMouseOver={pieOver}
                                    onMouseOut={pieOut}
                                    shape={PieSector}
                                />
                            )}
                            <Legend
                                layout={isMobile ? 'horizontal' : 'vertical'}
                                align={isMobile ? 'center' : 'right'}
                                verticalAlign={isMobile ? 'bottom' : 'middle'}
                                content={PieLegendContent}
                            />
                            <Tooltip content={tooltip} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default TisPieChart;
