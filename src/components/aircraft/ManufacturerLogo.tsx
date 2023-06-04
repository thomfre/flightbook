import React from 'react';

const ManufacturerLogo = ({ manufacturer }: { manufacturer: string }): React.ReactElement => {
    switch (manufacturer.toLocaleLowerCase()) {
        case 'cessna':
            return (
                <img
                    src="/manufacturers/cessna.svg"
                    title="Cessna"
                    loading="lazy"
                    style={{ maxHeight: '100px', maxWidth: '100px', paddingLeft: 8, float: 'left' }}
                />
            );
        case 'diamond':
            return (
                <img
                    src="/manufacturers/diamond.svg"
                    title="Diamond"
                    loading="lazy"
                    style={{ maxHeight: '100px', maxWidth: '100px', paddingLeft: 8, paddingTop: 16, float: 'left' }}
                />
            );
        case 'piper':
            return (
                <img
                    src="/manufacturers/piper.svg"
                    title="Piper"
                    loading="lazy"
                    style={{ maxHeight: '100px', maxWidth: '100px', paddingLeft: 8, float: 'left' }}
                />
            );
        case 'beechcraft':
            return (
                <img
                    src="/manufacturers/beechcraft.svg"
                    title="Beechcraft"
                    loading="lazy"
                    style={{ maxHeight: '100px', maxWidth: '100px', paddingLeft: 8, float: 'left' }}
                />
            );
        case 'pipistrel':
            return (
                <img
                    src="/manufacturers/pipistrel.svg"
                    title="Pipistrel"
                    loading="lazy"
                    style={{ maxHeight: '100px', maxWidth: '100px', paddingLeft: 8, float: 'left' }}
                />
            );
        default:
            return <></>;
    }
};

export default ManufacturerLogo;
