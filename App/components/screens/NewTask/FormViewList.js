import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View, StyleSheet, FlatList} from 'react-native';
import {Button, Text, FAB, Avatar} from '../../../components/common';
import {useTheme} from '../../../config/theme';
import TextInput, {TextField, RoundedInput} from './TextInput';
import DatePicker from './DatePicker';
import Dropdown from './Dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import * as reclamtionActions from '../../../Store/actions/reclamationActions';
import { useDispatch, useSelector } from 'react-redux';
import {useScrollToTop} from '@react-navigation/native';
import ItemNotif from '../Tabs/MyTask/TaskList/ItemNotif';
import ItemReclamation from '../Tabs/MyTask/TaskList/itemReclamtion';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    members: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
});


export default function ViewTaskForm() {
    const theme = useTheme();

    const [data,setData] = useState([]);
    const [userId,setUser] = useState('');
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);
    useEffect(() => {

        const fetchData = async () => {
            console.log("userC")
            console.log(userId)
            const result = await axios(
                'http://192.168.2.118:4000/api/reclamations/'+userId,
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
        <ScrollView
            contentContainerStyle={[
                styles.container,
                {
                    paddingVertical: theme.spacing.xl,
                },
            ]}>
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
                    <ListHeaderComponent title={data.titre} />
                )}
                ItemSeparatorComponent={SeparatorComponent}
            />
        </ScrollView>
    );
}
const renderItem = ({item}) => {
    return <ItemReclamation {...item} />;
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
