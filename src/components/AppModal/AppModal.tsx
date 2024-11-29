// import {CloseIcon, colors, FontSize, FontWeight, metrics} from '@assets';
// import {AppModal, AppText} from '@components';
// import {ThemeApp, useTheme} from '@theme';
// import React from 'react';
// import {
//   KeyboardAvoidingView,
//   Platform,
//   StyleProp,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// interface AppPopupProps {
//   isVisible: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   title?: string;
//   styleContainer?: StyleProp<ViewStyle>;
//   style?: StyleProp<ViewStyle>;
//   headerStyle?: StyleProp<ViewStyle>;
//   animationIn?: string;
//   animationOut?: string;
// }
// export const AppPopup = ({
//   isVisible,
//   onClose,
//   children,
//   title,
//   styleContainer,
//   style,
//   headerStyle,
//   animationIn,
//   animationOut,
//   ...props
// }: AppPopupProps) => {
//   const {theme} = useTheme();
//   const styles = getStyles(theme);
//   const {bottom} = useSafeAreaInsets();
//   const renderHeader = () => {
//     return (
//       <View style={[styles.header, headerStyle]}>
//         <AppText style={styles.txt}>{title}</AppText>
//         <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
//           <CloseIcon
//             width={metrics.responsiveWidth(24)}
//             height={metrics.responsiveWidth(24)}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };
//   return (
//     <AppModal
//       isVisible={isVisible}
//       onClose={onClose}
//       style={styles.modal}
//       animationIn={animationIn}
//       animationOut={animationOut}
//       {...props}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <View
//           style={[
//             styles.container,
//             {paddingBottom: bottom || metrics.responsiveWidth(16)},
//             styleContainer,
//           ]}>
//           {title && renderHeader()}
//           <View style={[styles.content, style]}>{children}</View>
//         </View>
//       </KeyboardAvoidingView>
//     </AppModal>
//   );
// };

// const getStyles = (theme: ThemeApp) =>
//   StyleSheet.create({
//     modal: {
//       margin: 0,
//     },
//     container: {
//       backgroundColor: theme.colors.white,
//     },
//     header: {
//       backgroundColor: colors.menu_inActive,

//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingVertical: metrics.responsiveWidth(16),
//     },
//     closeIcon: {
//       padding: metrics.responsiveWidth(12),

//       position: 'absolute',
//       left: 0,
//       top: 0,
//       bottom: 0,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     content: {},
//     txt: {
//       ...FontWeight.FONT_WEIGHT_700,
//       fontSize: FontSize.FONT_SIZE_18,
//       color: theme.colors.text,
//       flex: 1,
//       paddingHorizontal: metrics.responsiveWidth(82),
//       textAlign: 'center',
//     },
//   });
