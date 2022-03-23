import React from 'react';

export const formatNumber = (value: number, unit: string | null = null, numberOfDecimals: number = 0): string => {
    return `${Intl.NumberFormat('nb-NO', { minimumFractionDigits: numberOfDecimals, maximumFractionDigits: numberOfDecimals })
        .format(value)
        .replace(',', '.')}${unit ? ` ${unit}` : ''}`;
};

const Number = ({ value, unit = null, numberOfDecimals = 0 }: { value: number; unit?: string | null; numberOfDecimals?: number }): React.ReactElement => {
    return <>{formatNumber(value, unit, numberOfDecimals)}</>;
};

export default Number;
