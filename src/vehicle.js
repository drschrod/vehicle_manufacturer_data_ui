import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import DoneAllIcon from '@material-ui/icons/DoneAll';



const classes = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function titleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    let fixedString = ""
    sentence.forEach(word => {
        fixedString = fixedString + word + " ";
    });
    return fixedString;
}

export default class Vehicle extends React.Component {

    displayValue(value) {
        return value
        // if (value === "not available") {
        //     return (
        //         <ErrorIcon alt="Not Available"></ErrorIcon>
        //     )
        // } else if (value === "standard") {
        //     return (
        //         <CheckCircleIcon alt="Standard"></CheckCircleIcon>
        //     )
        // } else if (value === "available"){
        //     return (
        //         <DoneAllIcon>{value}</DoneAllIcon>
        //     )
        // } else {
        //     return value
        // }
    };

    renderFeatureSpecs(Features, featuresList, series) {
        let specsToRender = []
        for (const f in Features) {
            if (Features.hasOwnProperty(f)) {
                const { title, value, subtitle } = Features[f][series];
                let description = title;
                if (f === "Multimedia") {
                    description = title.split(",")
                    description.forEach(d => {
                        specsToRender.push(
                            <TableRow>
                                <TableCell>{f}</TableCell>
                                <TableCell align="left">{d}</TableCell>
                                <TableCell align="left">{subtitle}</TableCell>
                                <TableCell align="left">{this.displayValue(value)}</TableCell>
                            </TableRow>
                        );
                    });
                } else {
                    specsToRender.push(
                        <TableRow>
                            <TableCell>{f}</TableCell>
                            <TableCell align="left">{description}</TableCell>
                            <TableCell align="left">{subtitle}</TableCell>
                            <TableCell align="left">{this.displayValue(value)}</TableCell>
                        </TableRow>
                    );
                }

            }
        }
        return specsToRender
    }



    renderFeatureTable(Features, featuresList, series) {
        return (
            <TableContainer component={Paper}>
                <Table stripedRows className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell fontWeight="fontWeightBold">Feature</TableCell>
                            <TableCell fontWeight="fontWeightBold" align="left">Description</TableCell>
                            <TableCell fontWeight="fontWeightBold" align="left">Alt</TableCell>
                            <TableCell fontWeight="fontWeightBold" align="left">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderFeatureSpecs(Features, featuresList, series)}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    };

    renderBySeries(vehicle, Series) {
        const { Features, Make, Model, URL, Year, category, featuresList, image, trimAndSeries } = vehicle;
        let vehiclesToRender = []
        for (const series in trimAndSeries) {
            if (trimAndSeries.hasOwnProperty(series)) {
                const trim = trimAndSeries[series];
                vehiclesToRender.push(
                    <div className="vehicle">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography>
                                        <Link href={URL}>
                                            <h1>{Year} {titleCase(Make)} {titleCase(Model)}</h1>
                                        </Link>
                                    </Typography>
                                    <h1></h1>
                                    <img src={process.env.PUBLIC_URL + `/Images/${Model}.png`} alt={Model}></img>
                                    <h3>{series} Series: {trim}</h3>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                {this.renderFeatureTable(Features, featuresList, series)}
                            </Grid>
                        </Grid>
                        <br></br><hr></hr><br></br>
                    </div>
                )
            }
        }
        return vehiclesToRender
    }



    render() {
        const { Series } = this.props.vehicle;
        return (
            <Container >
                <Paper style={{ backgroundColor: '#8e98a4' }}>
                    <Typography component="div">
                        {this.renderBySeries(this.props.vehicle, Series)}
                    </Typography>
                </Paper>
            </Container>
        );
    }
}
