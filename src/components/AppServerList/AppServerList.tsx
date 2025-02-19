import { AppText } from '@components';
import { useTheme } from '@theme';
import { SourceVideoInterface } from '@types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
export interface AppServerListProps {
  list: SourceVideoInterface[],
  onSelectServer: (item: SourceVideoInterface) => void;
  value: string;
}
const AppServerList = ({ list, onSelectServer, value }: AppServerListProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Server</AppText>
      <View style={styles.list}>
        {list.map((item, index) => {
          return (
            <TouchableOpacity
              key={`list_server_${index}`}
              onPress={() => {
                onSelectServer(item);
              }}
              style={[styles.btnChapter, value === item.link && styles.btnChapterActive]}>
              <AppText style={[styles.txtChapter, value === item.link && styles.txtChapterActive]} numberOfLines={1}>{item?.server}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AppServerList;
