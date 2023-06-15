import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/* screen */
import Login from './views/Login';
import SignUp from './views/SignUp';
import ChatBot from './views/ChatBot';
import Report from './views/Report';


export default function App() {
	const Stack = createStackNavigator();
  	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
        <Stack.Screen name="Report" component={Report} />
			</Stack.Navigator>
		</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
