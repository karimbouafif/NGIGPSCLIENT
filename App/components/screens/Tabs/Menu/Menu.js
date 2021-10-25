import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Modal, View, Dimensions,FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, SearchBar } from 'react-native-elements';

// Styles
import styles from './Styles/FindMyWayScreenStyle'
import { Block, theme } from 'galio-framework'

import ShareBikeMapBox from '../../../common/ShareBikeMapBox'
import { checkPermission } from 'react-native-android-permissions'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import { Config } from '../../../../config/index';
import {useTheme} from '../../../../config/theme';
import FindMyWayScreen from './FindMyWayStack'
const { width } = Dimensions.get("screen");
const API_URL = Config.API_URL;
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;





export default function Menu(props) {
    const theme = useTheme();
    return <FindMyWayScreen theme={theme} {...props} />;
}



