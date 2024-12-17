// src/components/NetworkStatus.js
import NetInfo from '@react-native-community/netinfo';
import { ThemeColors, useTheme } from '@theme';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {!isConnected && (
        <Text style={styles.warningText}>
          Mất kết nối mạng. Vui lòng kiểm tra lại.
        </Text>
      )}
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: themeColors.error,
      padding: 10,
      alignItems: 'center',
    },
    warningText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default NetworkStatus;
