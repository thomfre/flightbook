import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import { METAR, rawMetarToSVG } from 'metar-plot';
import React, { useMemo } from 'react';

const Metar = ({ metars }: { metars: string[] }): React.ReactElement => {
    const parsedMetar = useMemo(() => metars?.map((m: string) => new METAR(m)), [metars]);
    const metarImages = useMemo(() => metars?.map((m: string) => rawMetarToSVG(m, '200px', '150px', true)), [metars]);

    if (!metars || metars.length === 0) {
        return <></>;
    }

    return (
        <Grid container sx={{ justifyContent: 'center' }}>
            {metarImages?.map((m: any, i: number) => (
                <Grid
                    item
                    key={i}
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyItems: 'center',
                        border: '1px solid lightgray',
                        padding: 2,
                        margin: 1
                    }}>
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(m)}`} />
                    <i>{dayjs(parsedMetar[i].time).format('HH:mm')}</i>
                </Grid>
            ))}
        </Grid>
    );
};

export default Metar;
