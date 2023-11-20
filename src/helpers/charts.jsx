import { Link } from 'react-router-dom';
import { Sector } from 'recharts';

import { isMobile } from './browser';
import { labels, t } from './dictionary';
import { shortenValue } from './helpers';
import { routes, separators } from './routes';

const tooltipSeparator = ' : ';

export const horizontalYaxisWidth = 80;
export const verticalYaxisWidth = isMobile ? 120 : 180;

export const tooltipNameFormat = (value) => {
    const parts = value.split(separators.newline);
    return <strong>{parts.length ? parts[0] : value}</strong>;
};

export const tickLabel = (value) => {
    const parts = value.split(separators.newline);
    return parts.length > 1 ? (
        <Link to={routes.party(parts[0], parts[1])}>{parts[0]}</Link>
    ) : (
        value
    );
};

export const shortChartNames = (name) => shortenValue(name, isMobile ? 30 : 60);

export const preparePctData = (data, keys) => {
    const sums = keys.map(() => 0);
    const pctData = [];
    data.forEach((dataPoint) => {
        keys.forEach((key, index) => {
            sums[index] += dataPoint[key];
        });
    });
    data.forEach((dataPoint) => {
        const pctKeys = {};
        keys.forEach((key, index) => {
            pctKeys[key] = dataPoint[key] / sums[index];
        });
        pctData.push({
            ...dataPoint,
            ...pctKeys,
        });
    });
    return pctData;
};

export const prepareAvgDeltaPctData = (data, keys) => {
    const sums = keys.map(() => 0);
    const avgs = [];
    const pctData = [];
    data.forEach((dataPoint) => {
        keys.forEach((key, index) => {
            sums[index] += dataPoint[key];
        });
    });
    sums.forEach((sum, index) => {
        avgs[index] = sum / data.length;
    });
    data.forEach((dataPoint) => {
        const pctKeys = {};
        keys.forEach((key, index) => {
            pctKeys[key] = dataPoint[key] / avgs[index] - 1;
        });
        pctData.push({
            ...dataPoint,
            ...pctKeys,
        });
    });
    return pctData;
};

export const CustomLabel = (showName, formatPercent, formatter) =>
    function ({ cx, cy, fill, midAngle, outerRadius, name, percent, value }) {
        const RADIAN = Math.PI / 180;

        const radius = outerRadius + 25;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        let label;
        if (showName) {
            label = name;
        } else {
            label = formatter(formatPercent ? percent : value);
        }

        return (
            <text
                x={x}
                y={y}
                fill={fill}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {label}
            </text>
        );
    };

export const BarsTooltip = (bars, formatter) =>
    function ({ active, payload }) {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            let sum = 0;
            return (
                <div className="recharts-default-tooltip">
                    <p className="recharts-tooltip-label fw-bold">
                        {dataPoint.name}
                    </p>
                    <ul className="recharts-tooltip-item-list">
                        {bars.map((bar) => {
                            if (
                                !Number.isNaN(dataPoint[bar.key] ?? NaN) &&
                                dataPoint[bar.key] > 0
                            ) {
                                sum += dataPoint[bar.key];
                                return (
                                    <li
                                        key={bar.key}
                                        className="recharts-tooltip-item"
                                        style={{ color: bar.color }}
                                    >
                                        <span className="recharts-tooltip-item-name">
                                            {t(bar.name)}
                                        </span>
                                        <span className="recharts-tooltip-item-separator">
                                            {tooltipSeparator}
                                        </span>
                                        <span className="recharts-tooltip-item-value fw-bold">
                                            {formatter(dataPoint[bar.key])}
                                        </span>
                                    </li>
                                );
                            }
                        })}
                        {bars.length > 0 && (
                            <li
                                key="sum"
                                className="recharts-tooltip-item fw-bold"
                            >
                                <span className="recharts-tooltip-item-name">
                                    {t(labels.charts.sum)}
                                </span>
                                <span className="recharts-tooltip-item-separator">
                                    {tooltipSeparator}
                                </span>
                                <span className="recharts-tooltip-item-value">
                                    {formatter(sum)}
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
            );
        }

        return null;
    };

export const PieTooltip = (dataKeys, dataLabels, formatter) =>
    function ({ active, payload }) {
        if (active && payload && payload.length) {
            return (
                <div className="recharts-default-tooltip">
                    <p
                        className="recharts-tooltip-label fw-bold"
                        style={{ color: payload[0].payload.color }}
                    >
                        {payload[0].payload.name}
                    </p>
                    <ul className="recharts-tooltip-item-list">
                        {dataKeys.map((key, index) => (
                            <li className="recharts-tooltip-item" key={key}>
                                <span className="recharts-tooltip-item-name">
                                    {dataLabels[index]}
                                </span>
                                <span className="recharts-tooltip-item-separator">
                                    {tooltipSeparator}
                                </span>
                                <span className="recharts-tooltip-item-value fw-bold">
                                    {formatter(payload[0].payload[key])}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return null;
    };

export function ActiveShape({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
}) {
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={Math.round(innerRadius * 0.95)}
                outerRadius={Math.round(outerRadius * 1.05)}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
}

export function InactiveShape({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
}) {
    return (
        <g>
            <Sector
                className="pie-inactive"
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
}
