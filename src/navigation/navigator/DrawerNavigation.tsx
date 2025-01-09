import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SCREEN_ROUTE } from '../router';
import CustomDrawer from './CustomDrawer';
import { TabBarNavigation } from './TabNavigation';

const Drawer = createDrawerNavigator();
const DrawerContent = (props: any) => <CustomDrawer {...props} />;

export const DrawerNavigation = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        detachInactiveScreens: true, // Added this line
      }}
      // Add this alistener to close the drawer when navigating to a different tab
      screenListeners={{
        // state: (e) => {
        //   if (e.data.state.history.length > 1) {
        //     navigation.dispatch(DrawerActions.closeDrawer());
        //   }
        // },
      }}
    >
      <Drawer.Screen name={SCREEN_ROUTE.BOTTOM_NAVIGATION} component={TabBarNavigation} />
    </Drawer.Navigator>
  );
};
