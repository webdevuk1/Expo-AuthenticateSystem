import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import axios from "axios";

import { KeyboardAvoidingWrapper } from "../components/KeyboardAvoidingWrapper";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  LeftIcon,
  RightIcon,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "./../components/styles";

const { brand, darkLight, primary } = Colors;

export const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (cred, setSubmitting) => {
    setMessage(null);
    const url = "https://fierce-eyrie-45803.herokuapp.com/user/signin";

    axios
      .post(url, cred)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        console.log(result, message, status, data, data[0]);
        // ----------------------------- 14:49 LOook line 52  ---------------
        if (status !== "SUCCESS") {
          // 14:49 LOook line 52 !!! might need go back to other gudie and finish it
          // logic not set up for handle error message need finish other guide!
          // Check server message and status not recieving error message!
          handleMessage(message, status);
        } else {
          // Navigate to Welcome ui & bring the login response.data results.
          navigation.navigate("Welcome", { ...data[0] });
        }
        // Turns ActivityIndicator btn off after axios response been recieved.
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        // Turns ActivityIndicator btn off after axios response been recieved.
        setSubmitting(false);
        handleMessage("An error occrred. Check your network and try again.");
      });
  };

  // Type: default value will be set to failed until changed.
  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../assets/img/Background.jpg")}
          />
          <PageTitle>Mtv Cribs</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            // setSubmitting manually allow you to define isSubmitting to true or false.
            onSubmit={(values, { setSubmitting }) => {
              console.log(values, setSubmitting);

              if (values.email == "" || values.password == "") {
                // Turn ActivityIndicator Btn off and display error message.
                handleMessage("Please fill all the empty fields");
                setSubmitting(false);
              } else {
                // Handle Users Login.
                // Sending Email, Passwords & setSubmitting to handleLogin function
                // setSubmitting is currently isSubmitting=true as a user triggered the login Btn.
                // setSubmitting will be updated to false (isSubmitting=false)
                // Once handleLogin triggers a function to login a user cred.
                // This will toggle the ActivityIndicator btn and navigate the user to the Dashboard ui.
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {/* isSubmitting Docs: https://formik.org/docs/guides/form-submission */}
            {/* How do I determine if my submission handler is executing? */}
            {/* isSubmitting will be determined if Login btn has been triggered by the user. */}
            {/* If isSubmitting is true the ActivityIndicator will be triggered. */}
            {/* Summary: isSubmitting has been used to toggle an ActivityIndicator on and off */}
            {/* ActivityIndicator will be displayed within the Login btn if user has triggered it. */}
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              values,
            }) => (
              <StyledFormArea>
                <TextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Enter Email Address"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <TextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MsgBox type={messageType}>{message}</MsgBox>

                {/* isSubmitting will be triggered to true. if handleSubmit been triggered */}
                {/* if !isSubmitting is false show login Btn else show ActivityIndicator Btn */}
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {/* If disabled={true} Btn Wont trigger. */}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />

                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto
                    name="google"
                    color={primary}
                    size={25}
                    style={{ paddingRight: 10 }}
                  />
                  <ButtonText>Sign in with Google</ButtonText>
                </StyledButton>

                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("SignUp")}>
                    <TextLinkContent>Sign Up</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

// find out why textinput works in a diffrent order
const TextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};
