import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login, SignUp, Welcome } from './../screens/index';
import { Colors } from './../components/styles';

const { primary, tertiary } = Colors;
const Stack = createNativeStackNavigator();

export default RootNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{ headerTintColor: primary }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
