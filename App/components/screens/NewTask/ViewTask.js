import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Header, Footer} from '../../../components/common';
import {useTheme} from '../../../config/theme';
import ViewTaskForm from './FormViewList';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    modal: {
        position: 'absolute',
        width: '92%',
        height: height * 0.88,
    },
});

export default function NewTask({navigation}) {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.palatte.background.main,
                },
            ]}>
            <Header
                title="View  Réclamation"
                backgroundColor={theme.palatte.primary.main}
                barStyle="light-content"
                leftIcon="arrow-left"
                onPressLeftIcon={() => navigation.goBack()}
                iconColor={theme.palatte.background.main}
                expand
            />
            <View style={[styles.content]}>
                <View
                    style={[
                        styles.modal,
                        {
                            backgroundColor: theme.palatte.background.main,
                            borderRadius: theme.shape.radius,
                            elevation: theme.shape.elevation,
                            margin: theme.spacing.space(5),
                            top: theme.spacing.space(-10),
                        },
                    ]}>
                    <ViewTaskForm />
                </View>
            </View>
            <Footer />
        </View>
    );
}
