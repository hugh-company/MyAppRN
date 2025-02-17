import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { HandlerStateChangeEvent, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export interface CustomSliderProps {
  width: number;
  value: number;
  minimumValue: number;
  maximumValue: number;
  tint: string;
  tintInactive: string;
  onValueChange?: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  knobSize?: number;
  trackSize?: number;
}

export function CustomSlider({
  width,
  value,
  minimumValue,
  maximumValue,
  tint,
  tintInactive,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  knobSize = 70,
  trackSize = 8,
}: CustomSliderProps) {
  const valueToX = (v: number) => {
    if (maximumValue === minimumValue) { return 0; }
    return (width * (v - minimumValue)) / (maximumValue - minimumValue);
  };
  const xToValue = (x: number) => {
    'worklet';
    if (maximumValue === minimumValue) { return minimumValue; }
    return (x / width) * (maximumValue - minimumValue) + minimumValue;
  };
  const valueX = valueToX(value);
  const translateX = useSharedValue(valueToX(value));

  const tapRef = useRef<TapGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);

  useEffect(() => {
    translateX.value = clamp(valueX, 0, width - knobSize);
  }, [valueX]);

  useAnimatedReaction(
    () => translateX.value,
    (cur, prev) => {
      if (cur !== prev && onValueChange) { runOnJS(onValueChange)(xToValue(cur)); }
    }
  );

  const _onSlidingStart = () => {
    'worklet';
    if (onSlidingStart) { runOnJS(onSlidingStart)(xToValue(translateX.value)); }
  };

  const _onSlidingComplete = (xValue: number) => {
    'worklet';
    if (onSlidingComplete) { runOnJS(onSlidingComplete)(xToValue(xValue)); }
  };

  const _onActive = (value: number) => {
    'worklet';
    _onSlidingStart();
    translateX.value = clamp(value, 0, width - knobSize);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => (ctx.offsetX = translateX.value),
    onActive: (event, ctx) => _onActive(event.translationX + ctx.offsetX),
    onEnd: () => _onSlidingComplete(translateX.value),
  });

  const onTapEvent = (event: HandlerStateChangeEvent<any>) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      _onActive(event.nativeEvent.x);
      _onSlidingComplete(event.nativeEvent.x);
    }
  };

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + knobSize,
    };
  });

  return (
    <TapGestureHandler ref={tapRef} onHandlerStateChange={onTapEvent} simultaneousHandlers={panRef}>
      <View style={[styles.sliderContainer, { height: knobSize, width }]}>
        <View style={[styles.slider, { height: trackSize, borderRadius: trackSize / 2, backgroundColor: tintInactive, width }]}>
          <Animated.View style={[styles.progress, { backgroundColor: tint, borderRadius: trackSize / 2 }, progressStyle]} />
          {/* <PanGestureHandler ref={panRef} onGestureEvent={onGestureEvent} simultaneousHandlers={tapRef}>
            <Animated.View style={[styles.knob, { height: knobSize, width: knobSize, borderRadius: knobSize / 2, backgroundColor: tint }, scrollTranslationStyle]} />
          </PanGestureHandler> */}
        </View>
      </View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    justifyContent: 'center',
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
  },
  knob: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
