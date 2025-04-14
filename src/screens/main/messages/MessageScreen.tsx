import { SearchIcon } from '@assets';
import { AppFlatListAnimated, AppHeader } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { ConversationInterface } from '@types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useMessageScreen } from './MessageScreen.hook';
import { ItemMessage } from './components/ItemMessage';
import { ListUserOnline } from './components/ListUserOnline';


export const MessageScreen = () => {
  const { conversations, onRefresh,
    handleLoadMore, styles, title,
  } = useMessageScreen();

  const renderItem = ({ item }: { item: ConversationInterface }) => {
    return <ItemMessage item={item} />;
  };
  return (
    <View style={styles.container}>
      <AppHeader title={title || ''} rightComponent={<TouchableOpacity style={styles.btnSearch} onPress={() => navigate(SCREEN_ROUTE.SEARCH_MESSAGE)}>
        <SearchIcon size={Spacing.width24} />
      </TouchableOpacity>} />

      {/* <AppInputSearch value={''} editable={false} style={styles.inputSearch} onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_MESSAGE)} /> */}
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

