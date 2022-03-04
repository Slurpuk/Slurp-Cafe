import React from 'react';

const calculateDistance = () => {
    const R = 6371e3; // metres
    const latitude1 = bushHouse.latitude * Math.PI/180; // φ, λ in radians
    const latitude2 = hardcodedMarker2.latitude * Math.PI/180;
    const diffLat = (hardcodedMarker2.latitude-bushHouse.latitude) * Math.PI/180;
    const diffLon = (hardcodedMarker2.longitude-bushHouse.longitude) * Math.PI/180;

    const aa = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
        Math.cos(latitude1) * Math.cos(latitude2) *
        Math.sin(diffLon/2) * Math.sin(diffLon/2);
    const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));

    const distance = parseInt(R * cc)*1.5; // in metresv

    //console.log('(Eucledian Second Method)The places are '+distance+' metres away')
    return distance;
};

const calculateTime = () => {
    const distance=calculateDistance();
    const speed=4*16.6667;
    const time=parseInt(distance/speed);
    return time;
};

const bushHouse={ //this corresponds to the bush house area
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

const hardcodedMarker2= { //this corresponds to the bush house area
    latitude: 51.51143534301982,
    longitude: -0.11969058630179567,
};

export default calculateTime;
