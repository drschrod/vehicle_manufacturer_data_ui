import Vehicle from  './vehicle';
import React from 'react';

export default class VehicleListing extends React.Component {       
    generateListing(vehicles) {
        const listing = [];
        console.log(vehicles)
        vehicles.forEach(v => {
            listing.push(<Vehicle vehicle={v}></Vehicle>)
        });
        return listing;
    };

    render() {
        return (
        <div>{this.generateListing(this.props.vehicles.default)}</div>
        );
    }
}
  