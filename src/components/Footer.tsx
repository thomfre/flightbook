import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import dayjs from 'dayjs';
import { default as React } from 'react';
import packageJson from '../../package.json';
import Flightbook from '../data/flightbook.json';

const Footer = (): React.ReactElement => {
    const theme = useTheme();

    const generatedDate = dayjs(Flightbook.generatedDate);

    return (
        <footer style={{ flexShrink: 0, padding: theme.spacing(2, 4), backgroundColor: theme.palette.grey[300] }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1" align="left">
                        Generated with data from {generatedDate.format('MMMM Do, YYYY')} ({generatedDate.fromNow()})
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" align="right" color="textSecondary" component="p">
                        Flightbook version {packageJson.version}{' '}
                        <IconButton component="a" href="https://github.com/thomfre/flightbook">
                            <GitHubIcon />
                        </IconButton>
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
