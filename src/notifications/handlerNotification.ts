import messaging from '@react-native-firebase/messaging';

import {PermissionsAndroid, Platform} from 'react-native';

import {navigate, SCREEN_ROUTE} from '@navigation';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {PostTypeKey} from '@types';
import {goToDetail} from '@utils';
import DeviceInfo from 'react-native-device-info';

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
      const device_id = DeviceInfo.getUniqueId();

      if (token) {
        fcmToken = token;
        console.log('FCM Token', token);
        // const responseSendFcmToken = await sendFcmTokenApi({
        //   fcm_token: token,
        //   device_id: device_id?.toString(),
        // });
        // console.log({responseSendFcmToken});

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
    console.log({setBackgroundMessageHandler: _remoteMessage});
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
    console.log({onNotificationOpenedApp: _remoteMessage});
  });
};
// Xử lý khi ứng dụng được mở từ trạng thái đóng hoàn toàn

const getInitialNotification = async () => {
  const notificationOpen = await messaging().getInitialNotification();
  if (notificationOpen) {
    console.log('App opened from a notification:', notificationOpen);
    // Handle the notification, navigate based on its data
  }
};
const handleNotificationClick = () => {
  // Listen for foreground notification clicks
  const unsubscribeForeground = notifee.onForegroundEvent(
    async ({type, detail}) => {
      //   {
      //     "pressAction": {
      //         "id": "important"
      //     },
      //     "notification": {
      //         "title": "đâs",
      //         "data": {
      //             "type": "posttype",
      //             "data": "{\"posttype\":\"movie\",\"detail\":{\"id\":500}}"
      //         },
      //         "id": "My2JeNBM8SjppdnnC9xx",
      //         "body": "ádasd",
      //         "android": {
      //             "importance": 4,
      //             "groupSummary": false,
      //             "colorized": false,
      //             "pressAction": {
      //                 "id": "important"
      //             },
      //             "lightUpScreen": false,
      //             "loopSound": false,
      //             "visibility": 0,
      //             "circularLargeIcon": false,
      //             "asForegroundService": false,
      //             "ongoing": false,
      //             "showTimestamp": false,
      //             "badgeIconType": 2,
      //             "groupAlertBehavior": 0,
      //             "onlyAlertOnce": false,
      //             "showChronometer": false,
      //             "channelId": "important",
      //             "autoCancel": true,
      //             "localOnly": false,
      //             "defaults": [
      //                 -1
      //             ],
      //             "chronometerDirection": "up",
      //             "smallIcon": "ic_launcher"
      //         }
      //     }
      // }
      if (type === EventType.PRESS) {
        console.log({detail});
        if (detail?.notification?.data) {
          handleNavigateNotification(detail?.notification?.data);
        }
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
      console.log({onBackgroundEvent: detail});
      if (type === EventType.PRESS) {
        // Handle notification click action here
      }
    },
  );

  return unsubscribeBackground;
};

// log notification click
export const handleNavigateNotification = async (notification: any) => {
  console.log({notification});

  if (notification) {
    //   {
    //     "type": "posttype",
    //     "data": "{\"posttype\":\"movie\",\"detail\":{\"id\":500}}"
    // }
    const {type, data} = notification;
    const parsedData = JSON.parse(data);
    if (type === 'posttype') {
      goToDetail({
        item: parsedData.detail,
        type: parsedData?.posttype as PostTypeKey,
      });
    }
    if (type === 'content') {
      navigate(SCREEN_ROUTE.NOTIFICATION_DETAIL, {data: parsedData});
    }
    if (type === 'message') {
      navigate(SCREEN_ROUTE.CHAT, {message: parsedData});
    }
  }
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
