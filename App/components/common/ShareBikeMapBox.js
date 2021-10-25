import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from '../screens/Tabs/Menu/Styles/FindMyWayScreenStyle'
import MapboxGL from "@react-native-mapbox-gl/maps";

import  MapView  from './MapBox/MapView';
MapboxGL.setAccessToken("pk.eyJ1Ijoia2FyaW1lc3ByaXQiLCJhIjoiY2szYm1vaWNjMG5qdjNvcXR6ZmI0eWE2OCJ9.Zcpnxn-I0W6JjZWdzIl2bg");
const api_key="pk.eyJ1Ijoia2FyaW1lc3ByaXQiLCJhIjoiY2szYm1vaWNjMG5qdjNvcXR6ZmI0eWE2OCJ9.Zcpnxn-I0W6JjZWdzIl2bg"

import { Input } from 'react-native-elements'

export default class ShareBikeMapBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startingPoint: this.props.startingPoint,
            endingPoint: this.props.endingPoint,
            adress:'',
        };
        this.arrayholder = [];
    }
    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    changePoint = (latitude,longitude)=>{
        console.log(latitude+0);
        console.log(longitude+0);
        var latitudeF = parseFloat(latitude)
        var longitudeF = parseFloat(longitude)
        this.mapRef.changePoints(latitudeF,longitudeF);
    };
    moveCamera = () => {
        this.mapRef.moveCamera();
    }

    componentWillUnmount() {
        this.moveCamera();
    }

    render () {
        return (
            <View style={styles.page}>
                <View style={styles.container}>

                    <MapView
                        mapBoxApiKey={api_key}
                        navigationMode="Course" // Or "Global"
                        ref={instance => this.mapRef = instance}
                        startingPoint={this.state.startingPoint}
                        endingPoint={this.state.endingPoint}
                        color="green"
                    />
                </View>
            </View>
        )
    }
}
