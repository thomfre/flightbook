import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Flightbook from '../../data/flightbook.json';

const FlickrFeed = ({ tag }: { tag: string }): React.ReactElement => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!Flightbook.flickrProxyUrl) {
            setLoading(false);
            return;
        }

        fetch(`${Flightbook.flickrProxyUrl}/${tag}`)
            .then((response) => response.json())
            .then((response) => {
                setImages(response.items);
                setLoading(false);
            });
    }, [tag]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!images || images.length === 0) {
        return <></>;
    }

    return (
        <Box>
            <Typography variant="h5">Latest images</Typography>
            <ImageList cols={4}>
                {images.map((image) => (
                    <ImageListItem key={image.link} component="a" href={image.link} target="_blank">
                        <img src={image.media.m.replace('_m.jpg', '.jpg')} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
};

export default FlickrFeed;
