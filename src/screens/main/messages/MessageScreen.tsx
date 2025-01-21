import { AppFlatListAnimated, AppHeader, AppInputSearch } from '@components';
import { MessageItem } from '@types';
import React from 'react';
import { View } from 'react-native';
import { useMessageScreen } from './MessageScreen.hook';
import { ItemMessage } from './components/ItemMessage';

const MessageScreen = () => {
  const { data, themeColors, styles, title, onRefreshList } = useMessageScreen();

  const renderItem = ({ item }: { item: MessageItem }) => {
    return (
      <ItemMessage item={item} />
    );
  };
  return (
    <View style={styles.container}>
      <AppHeader title={title || ''} />
      <AppInputSearch
        value={''}
        editable={false}
        style={styles.inputSearch}
      />
      <AppFlatListAnimated
        data={data}
        scrollEventThrottle={16}

        onRefresh={onRefreshList}

        keyExtractor={(item) => item.id}
        renderItem={renderItem} />
    </View>
  );
};

export default MessageScreen;
