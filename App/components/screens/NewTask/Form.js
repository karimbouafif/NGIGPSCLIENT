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
import * as reclamtionActions from '../../../Store/actions/reclamationActions';
import { useDispatch, useSelector } from 'react-redux';


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


export default function NewTaskForm() {
  const theme = useTheme();
  const [showResult, setResultVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cause, setCause] = useState("");
  const [assignee, setAssignee] = useState(null);
    const [data,setData] = useState([]);
    const [userId,setUser] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchData = async () => {
            console.log("userC")
            console.log(userId)
            const result = await axios(
                'http://192.168.2.118:4000/api/missions/'+userId,
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


    const onLogin = () => {



        const userData = {
            titre: title,
            description: description,
            cause :cause,
            mission:assignee,
            user :userId
        };
        console.log(userData)
        dispatch(reclamtionActions.addReclamation(userData));

    }



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
          placeholder="Mission"
          item={assignee}
          onFocus={() => setResultVisible(true)}
          onBlur={() => setResultVisible(false)}
        />
        <RoundedInput

            label="Cause"
            placeholder="Reporter"
            onChangeText={(text) => setCause(text)}
            defaultValue={cause}

        />
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
          <TextInput
              placeholder="Title"
              onChangeText={(text) => setTitle(text)}
              defaultValue={title}


          />
          <View
            style={{
              padding: theme.spacing.l,
            }}>
            <TextField

                label="Description"
                onChangeText={(text) => setDescription(text)}
                defaultValue={description}

            />
          </View>



          <View
            style={{
              padding: theme.spacing.l,
            }}>
            <Button color="primary"  onPress={() => onLogin()}>Ajouter Réclamation</Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}
