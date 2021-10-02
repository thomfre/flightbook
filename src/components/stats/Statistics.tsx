import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { setTitle } from '../../tools/SetTitle';
import FlightTimeMonths from './FlightTimeMonths';

const Statistics = (): React.ReactElement => {
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();

    useEffect(() => {
        setTitle('Statistics');
    }, []);

    const locationIs = (identifier: string, expandedIfEmpty: boolean = false): boolean => {
        const pathParts = location.pathname?.split('/');
        if (pathParts === null || pathParts.length < 3) {
            return expandedIfEmpty;
        }

        return pathParts[2]?.toLowerCase() === identifier.toLowerCase() || (pathParts[2] === '' && expandedIfEmpty);
    };

    const accordionExpanded = (route: string, expanded: boolean) => {
        if (expanded) {
            history.replace(`/statistics/${route}`);
        } else if (location.pathname.startsWith(`/statistics/${route}`)) {
            history.replace('/statistics');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: '10px' }}>
            <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1) }}>
                <StackedLineChartIcon fontSize="large" /> Statistics
            </Typography>
            <Accordion
                defaultExpanded={locationIs('flighttime', true)}
                onChange={(_event, expanded) => accordionExpanded('flighttime', expanded)}
                TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">
                        <HistoryIcon /> Flight time per month
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FlightTimeMonths />
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default Statistics;
