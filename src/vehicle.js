import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import VehicleSpecsPanel from './vehicleSpecsPanel';


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

    renderVehicleSpecsByTrim(Features, FeaturesList, series) {
        let vehicleSpecsByTrim = [];
        FeaturesList.forEach(feature => {
            vehicleSpecsByTrim.push(<VehicleSpecsPanel Features={Features} series={series} feature={feature}></VehicleSpecsPanel>);
        });
        return vehicleSpecsByTrim;
    };

    renderTopHalf(vehicle, series, trim){
        const { Features, Make, Model, URL, Year, FeaturesList, TrimAndSeries } = vehicle;
        return(
            
                <Paper className={classes.paper} >
                    <Typography variant='h2'>
                        <Link href={URL}>{Year} {titleCase(Make)} {titleCase(Model)}</Link>
                    </Typography>
                    <Typography variant='subtitle1'>{series} Series: {trim}</Typography>
                    <img src={process.env.PUBLIC_URL + `/Images/${Model}.png`} alt={Model}></img>
                    {this.renderVehicleSpecsByTrim(Features, FeaturesList, series)}
                </Paper>
            
        );
    };

    renderVehicle(vehicle) {
        const { TrimAndSeries } = vehicle;
        let vehiclesToRender = []
        for (const series in TrimAndSeries) {
            if (TrimAndSeries.hasOwnProperty(series)) {
                const trim = TrimAndSeries[series];
                vehiclesToRender.push(
                    <div className="vehicle">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {this.renderTopHalf(vehicle, series, trim)};
                                
                            </Grid>
                        </Grid>
                    </div>
                )
            }
        }
        return vehiclesToRender
    }



    render() {
        return (
            <Container style={{ backgroundColor: '#8e98a4' }}>
                {this.renderVehicle(this.props.vehicle)}
            </Container>
        );
    }
}
