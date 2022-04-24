import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  InnerContainer,
  SubTitle,
  PageTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Colors,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles';

const { brand, darkLight } = Colors;

export const Welcome = ({ navigation }) => {
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('../assets/img/Background.jpg')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>Chuck Simpson</SubTitle>
          <SubTitle welcome={true}>ChuckSimpson@gmail.com</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('../assets/img/Dog.jpg')} />
            <Line />
            <StyledButton onPress={() => navigation.navigate('Login')}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};
