import { AppImage } from '@components';
import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import { backgroundTask, getBackgroundTask } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
interface BackgroundTaskProps {
  uri: string | undefined;
  onChange: (uri: string) => void;
}

export const BackgroundTask = ({ uri, onChange }: BackgroundTaskProps) => {


  return (
    <View style={styles.backgroundTask}>
      <AppImage defaultSource={getBackgroundTask(uri)} style={styles.backgroundImage} />
      <View style={styles.listImage}>
        {backgroundTask.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.itemList,
              uri === item ? { borderWidth: 5, borderColor: Colors.black } : { opacity: 0.5 },
            ]}
            key={index}
            onPress={() => onChange(item)}>
            <AppImage defaultSource={getBackgroundTask(item)} style={styles.itemList} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundTask: {

    width: '100%',
    marginVertical: Spacing.height16,
  },
  backgroundImage: {

    height: Spacing.height150,
    width: '100%',
  },
  changeButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  txtChange: {
    color: Colors.white,
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
  },
  listImage: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.width10,

    marginTop: Spacing.height16,
  },
  itemList: {
    width: Spacing.width90,
    height: Spacing.height50,
  },
});
