import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { setTitle } from '../../tools/SetTitle';

const Home = (): React.ReactElement => {
    const [content, setContent] = useState('');

    useEffect(() => {
        setTitle('Flightbook');

        fetch('/home.md')
            .then((response) => response.text())
            .then((text) => setContent(text));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: '10px' }}>
            <ReactMarkdown>{content}</ReactMarkdown>
        </Container>
    );
};

export default Home;
