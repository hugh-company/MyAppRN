import { AddIcon, IconNotFound } from '@assets';
import { AppButton, AppHeader, AppText } from '@components';
import { Colors, Spacing } from '@theme';
import { ItemTaskInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AddTaskForm } from './block/AddTaskForm';
import { DetailTaskModal } from './block/DetailTask';
import { ItemOption } from './block/ItemOption';
import { ItemTask } from './block/ItemTask';
import useHome from './Home.hook';
import { styles } from './styles';

export const HomeScreen = () => {
  const {
    taskList,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    visible,
    setVisible,
    itemSelected,
    setItemSelected, showModalEdit, visibleDetail, setVisibleDetail,
  } = useHome();
  console.log({ itemSelected });

  const renderItem = ({ item }: { item: ItemTaskInterface }) => (
    <ItemTask task={item} onDetail={() => {

      setItemSelected(item);
      setVisibleDetail(true);
    }} />
  );
  const renderHiddenItem = ({ item }: { item: ItemTaskInterface }) => (
    <ItemOption onEdit={() => showModalEdit(item)} onDelete={() => handleDeleteTask(item.id)} />

  );
  const renderEmpty = () => (
    <View style={styles.empty}>
      <IconNotFound size={Spacing.width50} color={Colors.white} />
      <AppText style={styles.emptyText}>{t('home.empty')}</AppText>
      <AppText style={styles.emptyDescription}>{t('home.description_empty')}</AppText>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader style={styles.header} titleStyle={styles.title} title={t('home.title')} />

      <View style={styles.content}>
        <SwipeListView
          data={taskList}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.height16 }} />}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          disableRightSwipe={true}
          friction={8}
          ListEmptyComponent={renderEmpty}
          stopRightSwipe={-Spacing.width100}
          rightOpenValue={-Spacing.width100}
        />
        <AppButton
          title={t('home.add_task')}
          style={styles.button}
          onPress={() => {
            setVisible(true);
          }}
          rightIcon={<AddIcon />}
        />
      </View>
      <AddTaskForm
        visible={visible}
        onClose={() => {
          setItemSelected(null);
          setVisible(false);
        }}
        onDelete={(id) => {
          handleDeleteTask(id);
        }}
        task={itemSelected}
        onUpdate={(task) => {
          handleUpdateTask(task as ItemTaskInterface);
        }}
        onSubmit={handleAddTask}
      />
      <DetailTaskModal task={itemSelected} visible={visibleDetail} onClose={() => {
        setItemSelected(null);
        setVisibleDetail(false);
      }} />
    </SafeAreaView>
  );
};
