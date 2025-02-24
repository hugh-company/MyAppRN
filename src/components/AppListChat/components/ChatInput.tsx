import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from './ImagePicker';
import StickerPicker from './StickerPicker';
import { useKeyboard } from './keyboardHelper';

const ChatInput = ({ onSend }: { onSend: (msg: any) => void }) => {
  const [message, setMessage] = useState('');
  const [showImages, setShowImages] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const bottomAnim = new Animated.Value(0); // Animation để đẩy UI lên xuống

  const togglePicker = (type: 'image' | 'sticker') => {
    if (type === 'image') {
      setShowImages(!showImages);
      setShowStickers(false);
    } else {
      setShowImages(false);
      setShowStickers(!showStickers);
    }

    // if (showImages || showStickers) {
    //   Keyboard.dismiss(); // Đóng bàn phím nếu đang mở
    // }
    console.log({ keyboardHeight });

    Animated.timing(bottomAnim, {
      toValue: (showImages || showStickers) ? 0 : keyboardHeight || 300, // Đẩy UI lên đúng chiều cao
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {

    Animated.timing(bottomAnim, {
      toValue: isKeyboardVisible ? keyboardHeight : 0, // Đẩy UI lên đúng chiều cao
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isKeyboardVisible]);

  return (
    <Animated.View style={{ position: 'absolute', bottom: bottomAnim, width: '100%' }}>
      <Animated.View style={{ bottom: bottomAnim }}>
        {showImages && <ImagePicker onSelect={(img) => onSend({ type: 'image', content: img })} />}
        {showStickers && <StickerPicker onSelect={(sticker) => onSend({ type: 'sticker', content: sticker })} />}
      </Animated.View>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
        <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => togglePicker('image')}>
          <Text>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => togglePicker('sticker')}>
          <Text>😀</Text>
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            padding: 10,
            borderWidth: 1,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
          placeholder="Nhập tin nhắn..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={() => onSend({ type: 'text', content: message })}>
          <Text>Gửi</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default ChatInput;
