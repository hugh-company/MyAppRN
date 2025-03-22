import { AppFlatListAnimated, AppSearchInput } from '@components';
import { ConversationInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { ItemMessage } from '../messages/components/ItemMessage';
import { useSearchMessages } from './SearchMessages.hook';

const SearchMessages = () => {
  const { styles, searchMessage, conversations, handleLoadMore, isRefreshing, onClear } = useSearchMessages();



  const renderItem = ({ item }: { item: ConversationInterface }) => {
    return <ItemMessage item={item} />;
  };
  return (
    <View style={styles.container}>
      <AppSearchInput
        placeholder={t('message.searchMessage')}
        onSearch={searchMessage}
        onCancel={() => searchMessage('')}
        onClear={() => {
          onClear();
        }} />
      <AppFlatListAnimated
        data={conversations || []}
        scrollEventThrottle={16}
        // onRefresh={onRefresh}
        refreshing={isRefreshing}
        keyExtractor={(item) => item?.thread_id?.toString()}
        renderItem={renderItem}
        onLoadMore={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SearchMessages;
