import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    borderRadius: 8, // Ensure TouchableOpacity matches the button's shape
    overflow: 'hidden', // Prevent content from overflowing
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtWrap: {
    flexWrap: 'wrap',
  },
});
