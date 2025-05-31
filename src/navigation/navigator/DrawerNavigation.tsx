import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { SCREEN_ROUTE } from '../router';
import { TabBarNavigation } from './TabNavigation';


const Drawer = createDrawerNavigator();
const DrawerNavigation = React.memo(() => {

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEnabled: true, // Enable/disable swipe gestures
        overlayColor: 'rgba(0,0,0,0.5)', // Drawer overlay color
        drawerStyle: {
          backgroundColor: 'transparent',
        },
      }}

    >
      <Drawer.Screen name={SCREEN_ROUTE.BOTTOM_NAVIGATION} component={TabBarNavigation} />
    </Drawer.Navigator>
  );
});

export { DrawerNavigation };
