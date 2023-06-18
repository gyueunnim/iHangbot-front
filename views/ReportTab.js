import { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* screen */
import Report from './Report';
import Modification from './Modification';
import ChatBot from './ChatBot';

const Tab = createBottomTabNavigator();

function ReportTab({navigation}) {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Modification') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Report') {
                iconName = focused ? 'reader' : 'reader-outline';
              } else if (route.name === 'ChatBot') {
                iconName = focused ? 'happy' : 'happy-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#bcbcbc',
            tabBarActiveBackgroundColor: '#003d99',
            tabBarInactiveBackgroundColor: '#003d99'
          })}>
            <Tab.Screen name="Report" component={Report} />
            <Tab.Screen name="Modification" component={Modification} />
        </Tab.Navigator>
    )
}

export default ReportTab;