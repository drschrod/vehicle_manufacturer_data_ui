import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        color: 'white'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));


export default function VehicleSpecsPanel(props) {
    const classes = useStyles();
    
    const {Features, series, feature } = props;
    const renderFeatureSpecs = (featureArray, series, feature) => {
        let specsToRender = [];
        
        featureArray[series].forEach(featureData => {
            specsToRender = [...specsToRender, ...renderData(featureData, feature, series)];
        });
        return specsToRender;
    }
    const renderData = (featureData, feature, series) => {
        let specsToRender = [];    
        if (feature === "Multimedia") {
            const description = featureData.description.split(",")
            description.forEach(d => {
                specsToRender.push(
                    <TableRow>
                        <TableCell align="left">{d}</TableCell>
                        <TableCell align="left">{featureData.subgroup}</TableCell>
                        <TableCell align="left">{featureData.value}</TableCell>
                    </TableRow>
                );
            });
        } else {
            specsToRender.push(
                <TableRow>
                    <TableCell align="left">{featureData.description}</TableCell>
                    <TableCell align="left">{featureData.subgroup}</TableCell>
                    <TableCell align="left">{featureData.value}</TableCell>
                </TableRow>
            );
        }
        return specsToRender;
    }

    

    return (
        <div className={classes.root}>
            <ExpansionPanel style={{ backgroundColor: '#4b4f54'}} square={true}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon style={{ color: '#ffff'}}/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Typography fontWeight='fontWeightBold' style={{ color: '#ffff'}} align='left'>{feature}</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell fontWeight="fontWeightBold" align="left">Description</TableCell>
                                    <TableCell fontWeight="fontWeightBold" align="left">Alt</TableCell>
                                    <TableCell fontWeight="fontWeightBold" align="left">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderFeatureSpecs(Features[feature], series, feature)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ExpansionPanelDetails>
                <Divider />
            </ExpansionPanel>
        </div>
    );
}

