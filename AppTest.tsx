import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from '@react-navigation/elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Notifications')}>
        Go to notifications
      </Button>
    </View>
  );
}

function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function AppTest() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // drawerContent={(props: any) => <CustomDrawer {...props} />}
        initialRouteName="Home" screenOptions={{
          // headerShown: false,
          drawerType: 'front',
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
