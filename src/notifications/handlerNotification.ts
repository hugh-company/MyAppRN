import messaging from '@react-native-firebase/messaging';

import {PermissionsAndroid, Platform} from 'react-native';

import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

let fcmToken = '';

export const setupNotifications = async () => {
  let authStatus;
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  await messaging().registerDeviceForRemoteMessages();
  // if (isIOS) {
  authStatus = await messaging().requestPermission({
    sound: true,
    alert: true,
    badge: true,
  });
  // }

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token', token);

      if (token) {
        fcmToken = token;

        // Update your Redux store or local state
      } else {
      }
    } catch (error) {}
  }
};

const onTokenRefresh = (mutateSendToken: any) => {
  messaging().onTokenRefresh(token => {
    fcmToken = token;
    mutateSendToken({token: fcmToken});
  });
};

export const getFCMToken = () => {
  return fcmToken;
};
const handleNotificationFirebase = () => {
  const unsubscribe = messaging().onMessage(async _remoteMessage => {
    await notifee.incrementBadgeCount();

    if (!_remoteMessage?.notification) {
      return;
    }
    const title = _remoteMessage?.notification?.title || 'New Notification';
    const body =
      _remoteMessage?.notification?.body || 'You have a new message!';
    const data = _remoteMessage?.data;
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'important',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'important', // Action ID for handling notification clicks
        },
      },
      data, // Pass custom data for later navigation
    });
  });
  return unsubscribe;
};

const handleBackgroundNotificationFirebase = () => {
  messaging().setBackgroundMessageHandler(async _remoteMessage => {
    // await notifee.displayNotification({
    //   title: 'cai gi vayyy',
    //   body: 'thong bao moi',
    //   android: {
    //     channelId: 'default',
    //     importance: AndroidImportance.HIGH, // Show as banner
    //   },
    // });
    // await notifee.incrementBadgeCount();
    console.log({_remoteMessage});
  });
};

const setupNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'important',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
};
// Xử lý khi nhận thông báo trong nền hoặc khi ứng dụng bị đóng

const handleNotificationOpenedApp = async () => {
  messaging().onNotificationOpenedApp(async _remoteMessage => {
    console.log({_remoteMessage});
  });
};
// Xử lý khi ứng dụng được mở từ trạng thái đóng hoàn toàn

const getInitialNotification = async () => {
  const notificationOpen = await messaging().getInitialNotification();
  console.log({notificationOpen});
};
const handleNotificationClick = () => {
  // Listen for foreground notification clicks
  const unsubscribeForeground = notifee.onForegroundEvent(
    async ({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log({detail});
        // Handle notification click action here
      }
    },
  );

  return () => {
    unsubscribeForeground();
    // unsubscribeBackground();
  };
};

export const onBackgroundNotificationClick = () => {
  // Listen for background notification clicks
  const unsubscribeBackground = notifee.onBackgroundEvent(
    async ({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log({detail});
        // Handle notification click action here
      }
    },
  );

  return () => {
    unsubscribeBackground();
  };
};
export const initNotifications = async () => {
  await setupNotifications();
  // Set up notification channels
  await setupNotificationChannel();

  // Handle notification receipt
  handleNotificationFirebase();

  // Handle notification clicks
  handleNotificationClick();

  // Handle background notifications
  handleBackgroundNotificationFirebase();

  // Handle notifications when the app is opened from a terminated state
  handleNotificationOpenedApp();

  // Handle initial notifications
  getInitialNotification();

  onBackgroundNotificationClick();
};
