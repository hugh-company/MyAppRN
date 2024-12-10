import { AppFlashList, AppModal, AppText } from '@components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useLogin from './Login.hook';

export const LoginScreen = () => {
  const { onLogin } = useLogin();
  const data = Array.from({ length: 100000 }, (_, index) => index);
  const [visible, setVisible] = React.useState(false);
  const renderItem = React.useCallback(({ item, index }: { item: number; index: number }) => (
    <AppText style={styles.itemStyle}>{index}</AppText>
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <AppButton title="Open Modal" onPress={() => setVisible(true)} />
        <AppModal visible={visible} onClose={() => setVisible(false)}>
          <AppFlashList
            data={data}
            renderItem={renderItem}
            estimatedItemSize={200}
            contentContainerStyle={styles.listContentContainer}
          />
        </AppModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    height: 400,
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
  itemStyle: {
    height: 100,
    backgroundColor: 'red',
  },
});
