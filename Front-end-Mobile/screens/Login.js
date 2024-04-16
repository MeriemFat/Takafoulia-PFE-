import React, { useState, useContext } from 'react';
import { StyleSheet , Text , View } from "react-native";
// formik
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  StyledContainer,
  PageLogo,
  StyledInputLabel,
  StyledFormArea,
  StyledTextInput,
  LeftIcon,
  StyledButton, 
  InnerContainer,
  RightIcon,
  Colors,
  ButtonText,
} from '../components/styles';
import { ActivityIndicator } from 'react-native';
// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
const { darkLight, brand, primary,red } = Colors;
const Login = (props) => {
    return (
        <StyledContainer>
              <StatusBar style="dark" />
              <InnerContainer>
                <PageLogo  resizeMode ="cover"
                 source={require('../img/logo.gif')} />
                  <Text style={styles.title}>BONJOUR!</Text>
                 <Text style={styles.title2}>Bienvenu dans votre espace asurence!</Text>  
                 <Formik initialValues={{ email: '', password: '' }}
                  onSubmit={(values) => {console.log(values); }}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                 <StyledFormArea>
              <MyTextInput
                  label="Email Address"
                  placeholder="andyj@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput 
                  label="Password"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  
                  icon="lock"
                  isPassword={true}
                />
                 <TouchableOpacity style={styles.btn}
                 onPress={() => props.navigation.navigate("Services")}>
                 <Text style={styles.aff2}>connexion</Text>
                 </TouchableOpacity>
                 
                  
</StyledFormArea>
)} 
</Formik>
</InnerContainer>
</StyledContainer>
    );
} ;
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={red} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
        {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
        </RightIcon>
      )}
      </View>
    );
  };
  
export default Login;

const styles =StyleSheet.create({
    title: {
      fontFamily: "Montserrat_600SemiBold",
      fontSize: 22,
      alignItems: "center",
      justifyContent: "center",
      color: "#E2443B",
      marginTop: 32,
    },
    title2: { 
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    textAlign:"center",
    color: "#121212",
    marginTop: 15,
    },
    btn: {
      marginTop: 12,
      backgroundColor: "#E2443B",
      paddingHorizontal: 90,
      paddingVertical: 15,
      borderRadius: 10,
    },
    aff2:{
      textAlign:'center',
      color:"#FFFF", 
      fontSize: 20,
    }
}); 