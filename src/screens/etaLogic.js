import React from 'react';

const calculateDistance = (userLatitude, userLongitude, shopLatitude,shopLongitude) => {
    const R = 6371e3; // metres
    const latitude1 = userLatitude * Math.PI/180;
    const latitude2 = shopLatitude * Math.PI/180;
    const diffLat = (shopLatitude-userLatitude) * Math.PI/180;
    const diffLon = (shopLongitude-userLongitude) * Math.PI/180;
    const aa = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
        Math.cos(latitude1) * Math.cos(latitude2) *
        Math.sin(diffLon/2) * Math.sin(diffLon/2);
    const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
    const distance = parseInt(R * cc)*1.5; // in metresv
    return distance;
};

const calculateTime = (userLatitude, userLongitude, shopLatitude,shopLongitude) => {
    const distance=calculateDistance(userLatitude, userLongitude, shopLatitude,shopLongitude);
    const speed=4*16.6667;
    const time=parseInt(distance/speed);
    return time;
};
export default calculateTime;
