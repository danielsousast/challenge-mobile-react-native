import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import Home from '../screens/Home';
import Serach from '../screens/Search';
import Favorites from '../screens/Favorites';
import colors from '../styles/Colors';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#1d232b',
          borderTopColor: 'rgba(255,255,255,0.2)',
        },
        labelStyle: {
          fontSize: 14,
        },
        activeTintColor: colors.primary,
        inactiveTintColor: '#ccc',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Início',

          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Serach}
        options={{
          title: 'Pesquisa',

          tabBarIcon: ({ color, size }) => (
            <Icon name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favoritos',

          tabBarIcon: ({ color, size }) => (
            <Icon name="staro" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
