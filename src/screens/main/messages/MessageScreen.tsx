import { AppFlatListAnimated, AppHeader, AppInputSearch } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ConversationInterface } from '@types';
import React from 'react';
import { View } from 'react-native';
import { useMessageScreen } from './MessageScreen.hook';
import { ItemMessage } from './components/ItemMessage';
import { ListUserOnline } from './components/ListUserOnline';

const MessageScreen = () => {
  const { conversations, onRefresh,
    handleLoadMore, styles, title,
  } = useMessageScreen();

  const renderItem = ({ item }: { item: ConversationInterface }) => {
    return <ItemMessage item={item} />;
  };
  return (
    <View style={styles.container}>
      <AppHeader title={title || ''} />
      <AppInputSearch value={''} editable={false} style={styles.inputSearch} onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_MESSAGE)} />
      <AppFlatListAnimated
        data={conversations || []}
        ListHeaderComponent={<ListUserOnline />}
        scrollEventThrottle={16}
        onRefresh={onRefresh}
        // refreshing={loading}
        keyExtractor={(item) => item?.thread_id?.toString()}
        renderItem={renderItem}
        onLoadMore={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default MessageScreen;
