import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {Text} from '../../../../components/common';
import {useTheme} from '../../../../config/theme';
//import {singleDay} from './data';
import Item from '../MyTask/TaskList/Item';
import axios from 'axios';
import ItemNotif from '../MyTask/TaskList/ItemNotif';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    separator: {
        height: 16,
    },
});

export default function Quick() {
    const theme = useTheme();
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);

    const [data,setData] = useState([]);
    const [userId,setUser] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            console.log("userC")
            console.log(userId)
            const result = await axios(
                'http://192.168.2.139:4000/api/missions/'+userId,
            );
            //console.log("Affichage les missions by user   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(result.data);

            setData(result.data);
        };

        fetchData();
    }, [userId]);
    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            const user = jwtDecode(token);
            // console.log("test aking tab bar")
            //console.log(user);
            setUser(user.id)



        });


    }, []);
    return (
        <FlatList
            ref={scrollRef}
            style={[
                styles.container,
                {
                    backgroundColor: theme.palatte.background.list,
                },
            ]}
            contentContainerStyle={{
                padding: theme.spacing.l,
            }}
            data={data}
            keyExtractor={(item) => item._id}
            initialNumToRender={1}
            renderItem={renderItem}
            ListHeaderComponent={() => (
                <ListHeaderComponent title={data.taskTitle} />
            )}
            ItemSeparatorComponent={SeparatorComponent}
        />
    );
}

const renderItem = ({item}) => {
    return <ItemNotif {...item} />;
};

const ListHeaderComponent = ({title}) => {
    const theme = useTheme();
    return (
        <View
            style={[
                {
                    backgroundColor: theme.palatte.background.list,
                    paddingVertical: theme.spacing.s,
                    marginBottom: theme.spacing.s,
                },
            ]}>
            <Text variant="sectionHeader" color="sectionHeader">
                {title}
            </Text>
        </View>
    );
};

const SeparatorComponent = () => <View style={styles.separator} />;
