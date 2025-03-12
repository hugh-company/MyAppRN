import { getLocations, getToken, setLocation } from '@redux';
import { sendLocationUserApi } from '@services';
import { showNotificationError } from '@utils';
import { t } from 'i18next';
import { useState } from 'react';
import { Linking, NativeModules, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';

const { LocationModule } = NativeModules;
const toRadians = (degrees: number) => degrees * (Math.PI / 180);

const calculateDistance = (loc1: { latitude: number, longitude: number }, loc2: { latitude: number, longitude: number }) => {
  const R = 6371e3; // Earth's radius in meters
  const lat1 = toRadians(loc1.latitude);
  const lat2 = toRadians(loc2.latitude);
  const deltaLat = toRadians(loc2.latitude - loc1.latitude);
  const deltaLon = toRadians(loc2.longitude - loc1.longitude);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export function useLocation() {
  const locationUser = useSelector(getLocations);
  const token = useSelector(getToken);

  const [isPermissionLocation, setIsPermissionLocation] = useState(true);
  const dispatch = useDispatch();
  const checkPermissionLocation = async () => {
    let granted = false;
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log({ result });

      granted = result === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await Geolocation.requestAuthorization('whenInUse');
      granted = result === 'granted';
    }
    setIsPermissionLocation(granted);
    return granted;
  };
  const getLocationDevice = async () => {
    const hasPermission = await checkPermissionLocation();
    if (!hasPermission) {
      console.log('Location permission not granted');
      return;
    }
    console.log({ hasPermission });

    try {
      await Geolocation.getCurrentPosition(
        async position => {
          console.log({ position });
          const { latitude, longitude } = position.coords;
          try {
            const responseLocation = await sendLocationUserApi({
              lat: latitude,
              lng: longitude,
            });
            console.log({ responseLocation });
            dispatch(setLocation({ latitude: latitude, longitude: longitude }));
          } catch (error) {
            showNotificationError(t('location.title'), error?.message);
          }
        },
        error => {
          console.log({ error });

        },
        {

        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getDistanceLocation = (location: { latitude: number, longitude: number }) => {
    if (!locationUser) { return '0 m'; }
    const userLocation = {
      latitude: locationUser?.latitude,
      longitude: locationUser?.longitude,
    };
    console.log({ userLocation, location });

    let distanceInMeters = calculateDistance(userLocation, location);
    distanceInMeters = Math.round(distanceInMeters); // Round to nearest integer
    if (distanceInMeters === 0) {
      return '0.1 m';
    }
    if (distanceInMeters >= 1000) {
      return `${(distanceInMeters / 1000).toFixed(1)} km`;
    }
    return `${distanceInMeters} m`;
  };
  const goToSettingLocation = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings:');
    }
  };

  const checkLocation = async () => {
    const check = await checkPermissionLocation();

    if (check) {
      const location = await getLocationDevice();
      console.log({ location });
    }
    return check;
  };


  return {
    getDistanceLocation,
    getLocationDevice,
    checkPermissionLocation,
    isPermissionLocation, goToSettingLocation, checkLocation,

  };
}
