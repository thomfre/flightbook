import Flightbook from '../data/flightbook.json';
import GitHubIcon from '@material-ui/icons/GitHub';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { default as React } from 'react';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import packageJson from '../../package.json';

const useStyles = makeStyles((theme) => ({
    footer: {
        flexShrink: 0,
        padding: theme.spacing(2, 4),
        backgroundColor: theme.palette.grey[300]
    }
}));

const Footer = (): React.ReactElement => {
    const classes = useStyles();

    const generatedDate = dayjs(Flightbook.generatedDate);

    return (
        <footer className={classes.footer}>
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
