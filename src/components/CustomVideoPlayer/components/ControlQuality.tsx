import { SettingVideoIcon } from '@assets';
import React, { useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { ItemQualityProps } from '../CustomVideoPlayer.hook';
import { ButtonAction } from './ButtonAction';
export interface ControlQualityProps {
  onQuality?: () => void
  qualities: ItemQualityProps[]
}


export function ControlQuality(props: ControlQualityProps) {
  const { qualities = [], onQuality } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    console.log({ qualities });
  }, [qualities]);

  return (
    <View>
      <ButtonAction Icon={SettingVideoIcon} onPress={() => setIsVisible(true)} />
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20 }}>
            {qualities.map((quality, index) => (
              <TouchableOpacity key={index} onPress={() => {
                onQuality?.();
                setIsVisible(false);
              }}>
                <Text style={{ padding: 10 }}>{quality.title || quality.resolution}</Text>
              </TouchableOpacity>
            ))}
            <ButtonAction Icon={SettingVideoIcon} onPress={() => setIsVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
