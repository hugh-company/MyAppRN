import {Colors, FontSize, FontWithFamily, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginHorizontal: Spacing.width16,
  },
  button: {
    margin: Spacing.width16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.white,
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
    marginTop: Spacing.height16,
    marginBottom: Spacing.height8,
  },
  emptyDescription: {
    color: Colors.white,
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
  },
  //
});
