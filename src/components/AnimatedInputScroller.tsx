import React, { useCallback } from 'react';
import {
  findNodeHandle,
  KeyboardAvoidingView,
  Platform,
  ScrollViewProps,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export interface AnimatedInputScrollerRef {
  scrollToInput: (inputRef: React.RefObject<TextInput | View | any>) => void;
}

interface AnimatedInputScrollerProps extends ScrollViewProps {
  children: React.ReactNode;
  extraScrollHeight?: number;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
}

const AnimatedInputScroller = React.forwardRef<AnimatedInputScrollerRef, AnimatedInputScrollerProps>(
  (
    {
      children,
      extraScrollHeight = 0,
      keyboardShouldPersistTaps = "handled",
      contentContainerStyle,
      style,
      keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0, // Default KAV offset, adjust as needed
      ...restScrollViewProps
    },
    ref
  ) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
      scrollY.value = event.contentOffset.y;
    });

    const scrollToNode = useCallback((node: TextInput | View | any) => {
      if (!node || !scrollRef.current) {
        console.warn("AnimatedInputScroller: Node or scrollRef not available for scrolling.");
        return;
      }

      const reactTag = findNodeHandle(node);
      const scrollViewNodeHandle = findNodeHandle(scrollRef.current);

      if (reactTag && scrollViewNodeHandle) {
        setTimeout(() => {
          node.measureLayout(
            scrollViewNodeHandle,
            (x: number, y: number, width: number, height: number) => {
              const targetScrollY = y - extraScrollHeight;
              runOnUI(() => {
                "worklet";
                // @ts-ignore: scrollTo type issue with animatedRef
                scrollTo(scrollRef, 0, targetScrollY, true);
              })();
            },
            () => {
              console.error("AnimatedInputScroller: Failed to measure layout of the input relative to ScrollView. Cannot scroll.");
            }
          );
        }, 100); // Delay to allow keyboard and layout to settle
      } else {
        console.warn("AnimatedInputScroller: Could not find node handle for input or ScrollView.");
      }
    }, [scrollRef, extraScrollHeight]);

    React.useImperativeHandle(ref, () => ({
      scrollToInput: (inputRef) => {
        if (inputRef.current) {
          scrollToNode(inputRef.current);
        } else {
          console.warn("AnimatedInputScroller: inputRef.current is null.");
        }
      },
    }));

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled
      >
        <Animated.ScrollView
          ref={scrollRef}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          contentContainerStyle={contentContainerStyle}
          style={style}
          {...restScrollViewProps}
        >
          {children}
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    );
  }
);

export default AnimatedInputScroller;
