import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Tracklogs from '../../data/tracklogs.json';
import { Tracklog } from '../../models/tracklog/Tracklog';
import { uniqueValues } from '../../tools/UniqueValues';
import { getYouTubeId } from '../../tools/YouTubeTools';

const YouTubeList = ({ aircraft = undefined, airport = undefined }: { aircraft?: string; airport?: string }): React.ReactElement => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const filteredTracks = Tracklogs.tracks
            .filter((t) => t.hasYoutube)
            .filter((t) => (aircraft && t.aircraft === aircraft) || (airport && t.airports.filter((a) => a === airport).length > 0))
            .sort((a, b) => b.date.localeCompare(a.date));

        const fetchedUrls = await Promise.all(
            filteredTracks.map(async (track) => {
                const data: Tracklog = await fetch(`/tracklogs/${track.filename}`).then((response) => response.json());
                return data?.youtube?.at(0) ?? null;
            })
        );

        setVideos(fetchedUrls.filter(uniqueValues).slice(0, 3));
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [aircraft, airport]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!videos || videos.length === 0) {
        return <></>;
    }

    return (
        <Box>
            <Typography variant="h5">Latest videos</Typography>
            {videos.map((video, index) => (
                <div key={index} className="youtube-container">
                    <YouTube
                        videoId={getYouTubeId(video)}
                        opts={{
                            host: 'https://www.youtube-nocookie.com',
                            playerVars: { autoplay: 0, rel: 0 }
                        }}
                    />
                </div>
            ))}
        </Box>
    );
};

export default YouTubeList;
