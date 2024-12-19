import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { SCREEN_ROUTE } from '../router';
import CustomDrawer from './CustomDrawer';
import { TabBarNavigation } from './TabNavigation';


const Drawer = createDrawerNavigator();
export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front', // Add this line to set drawer type to 'front'
      }}
    >
      <Drawer.Screen name={SCREEN_ROUTE.BOTTOM_NAVIGATION} component={TabBarNavigation} />
    </Drawer.Navigator>
  );
};
