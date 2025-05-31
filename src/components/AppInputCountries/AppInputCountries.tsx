import { Spacing, useTheme } from '@theme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { countryInterface } from '../AppInputPhone/AppInputPhoneDefault';
import { ModalCountry } from '../AppInputPhone/ModalCountry';
import { AppText } from '../AppText';

interface AppInputCountriesProps {
  value: string;
  onSelectCountry: (value: countryInterface) => void;
  placeholder?: string;
  error?: string;
}

export const AppInputCountries = ({ value, onSelectCountry, placeholder, error }: AppInputCountriesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCountry = (country: countryInterface) => {
    onSelectCountry(country);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <AppText style={styles.text}>
          {value || placeholder || 'Select a country'}
        </AppText>
      </TouchableOpacity>
      {error && <AppText style={[styles.error]}>{error}</AppText>}
      <ModalCountry
        visible={modalVisible}
        value={value}
        onClose={() => setModalVisible(false)}
        onSelectCountry={handleSelectCountry}
      />
    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.height16,

    },
    input: {
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      borderRadius: 8,
      padding: 12,
      backgroundColor: themeColors.inputBackground,
    },
    text: {
      color: themeColors.inputText,
    },
    error: {
      color: themeColors.error,
      marginTop: 4,
    },
  });
