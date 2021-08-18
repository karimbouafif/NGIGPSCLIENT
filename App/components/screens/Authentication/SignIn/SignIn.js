import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Container, Header, Button, TextInput} from '../../../../components/common';
import {useTheme} from '../../../../config/theme';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../../../Store/actions/loginActions';
import { ILoginState } from '../../../../models/reducers/login';
import {SET_CURRENT_USER} from '../../../../Store/actions/types'
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode  from 'jwt-decode';
import axios from 'axios';
const styles = StyleSheet.create({
  forgotPassword: {
    alignItems: 'flex-end',
  },
});
interface IState {
  loginReducer: ILoginState;

}
export default function SignIn({navigation}) {
  const theme = useTheme();
  const passwordRef = useRef(null);
  const [emaillogin, setEmail] = useState("jihed.galai@esprit.tn");
  const [passwordlogin, setPassword] = useState("123456");
  const {user} = useSelector((state: IState) => state.loginReducer);
  const dispatch = useDispatch();
const {id}=useState('')
  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      const user = jwtDecode(token);
      console.log("test token")
      console.log(user);



    });


  }, []);


  const onLogin = () => {



    const userData = {
      email: emaillogin,
      password: passwordlogin
    };

    dispatch(loginActions.loginUser(userData));
    navigation.navigate("Home")
  }


  return (
    <>
      <Header onPressLeftIcon={() => navigation.goBack()} />
      <Container>
        <Text variant="headline">Welcome back</Text>
        <Text variant="subheading" color="gray">
          Sign in to continue
        </Text>
        <View
          style={{
            paddingVertical: theme.spacing.space(6),
          }}>
          <TextInput
            label="Email"
            placeholder="Enter your Email"
            returnKeyType="next"
            onChangeText={(text) => setEmail(text)}
            defaultValue={emaillogin}
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current.focus()}
            style={{
              marginBottom: theme.spacing.space(6),
            }}
          />
          <TextInput
            ref={passwordRef}
            onChangeText={(text) => setPassword(text)}
            label="Password"
            placeholder="Enter your password"
            defaultValue={passwordlogin}
            secureTextEntry
          />
          <View style={styles.forgotPassword}>
            <Button
              variant="text"
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot password
            </Button>
          </View>
        </View>
        <Button color="primary"  onPress={() => onLogin()}>
          Log In
        </Button>
      </Container>
    </>
  );
}
