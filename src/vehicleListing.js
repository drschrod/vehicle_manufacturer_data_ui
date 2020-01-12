import Vehicle from  './vehicle';
import React from 'react';

export default class VehicleListing extends React.Component {       
    generateListing(vehicles) {
        const listing = [];
        let count = 0;
        vehicles.forEach(v => {
            if (count < 5) {
                listing.push(<Vehicle vehicle={v}></Vehicle>);
                count+=1;
            }
        });
        return listing;
    };

    render() {
        return (
        <div>{this.generateListing(this.props.vehicles.default)}</div>
        );
    }
}
  