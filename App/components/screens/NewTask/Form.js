import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Button, Text, FAB, Avatar} from '../../../components/common';
import {useTheme} from '../../../config/theme';
import TextInput, {TextField, RoundedInput} from './TextInput';
import DatePicker from './DatePicker';
import Dropdown from './Dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';

const members = new Array(4).fill(1);

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

const users = [
  {
    title: 'Stephen Chow',
    subtitle: 'Stephenchow@company.com',
    url: 'https://',
  },
];

export default function NewTaskForm() {
  const theme = useTheme();
  const [showResult, setResultVisible] = useState(false);
  const [assignee, setAssignee] = useState(null);
    const [data,setData] = useState([]);
    const [userId,setUser] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            console.log("userC")
            console.log(userId)
            const result = await axios(
                'http://192.168.1.21:4000/api/missions/'+userId,
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
      <View
        style={[
          styles.row,
          {
            padding: theme.spacing.l,
          },
        ]}>
        <RoundedInput
          label="For"
          placeholder="Assignee"
          item={assignee}
          onFocus={() => setResultVisible(true)}
          onBlur={() => setResultVisible(false)}
        />
        <RoundedInput label="In" placeholder="Project" />
      </View>
      {showResult ? (
        <Dropdown
          data={data}
          onSelect={(item) => {
            setAssignee(item);
            setResultVisible(false);
          }}
        />
      ) : (
        <>
          <TextInput placeholder="Title" />
          <View
            style={{
              padding: theme.spacing.l,
            }}>
            <TextField label="Description" />
          </View>
          <View style={{paddingVertical: theme.spacing.m}}>
            <DatePicker label="Due Date" />
          </View>

          <View
            style={{
              padding: theme.spacing.l,
            }}>
            <Button color="primary">Ajouter Réclamation</Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}
