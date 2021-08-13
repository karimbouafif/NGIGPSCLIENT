import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import ThemeProvider, {theme} from '../App/config/theme';
import Screens from '../App/components/screens';
import { ActivityIndicator } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from '../App/Store';


const { persistor, store } = configureStore();
export default function App() {
    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <MenuProvider
            backHandler
            customStyles={{
                backdrop: {
                    backgroundColor: theme.colors.backdrop,
                    opacity: 0.3,
                },
            }}>

            <ThemeProvider value={theme}>
                <NavigationContainer>
                    <Screens />
                </NavigationContainer>
            </ThemeProvider>
        </MenuProvider>
        </PersistGate>
        </Provider>
    );
}
