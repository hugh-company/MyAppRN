import {Shadow, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    header: {
      ...Shadow.normal,
      borderBottomColor: themeColors.border,
      borderBottomWidth: 1,
    },
    // New styles added for cart items list and summary section
    cartList: {
      flexGrow: 1,
      padding: Spacing.width16,
    },
    cartItem: {
      fontSize: 16,
      marginVertical: 8,
    },
    summaryContainer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: themeColors.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    registerButton: {
      marginTop: 12,
      padding: 12,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      borderRadius: 4,
    },
    registerButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
