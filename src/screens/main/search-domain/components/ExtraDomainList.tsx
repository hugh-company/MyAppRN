import { AppText } from '@components';
import { RootState } from '@redux';
import { checkDomainSuffixDetail } from '@services';
import { FontSize, Spacing, ThemeColors } from '@theme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import SearchDomainItem from '../SearchDomainItem';

export interface ExtraDomainListProps {
  baseDomain: string;
  extraTailDomains: string[];
  themeColors: ThemeColors;

  onSelect?: (item: any) => void;
}

const ExtraDomainList: React.FC<ExtraDomainListProps> = ({
  baseDomain,
  extraTailDomains,
  themeColors, onSelect
}) => {
  const cartItems = useSelector((state: RootState) => state.cartSlice.items);
  const [loadingTail, setLoadingTail] = useState<string | null>(null);
  const [tailDetails, setTailDetails] = useState<Record<string, any>>({});

  const handleCheck = async (tail: string) => {
    setLoadingTail(tail);
    try {
      const res = await checkDomainSuffixDetail(baseDomain, tail);
      setTailDetails((prev) => ({ ...prev, [tail]: res }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTail(null);
    }
  };




  const RenderHeaderCheck = ({ tail }: { tail: string }) => {
    return (
      <View style={styles.row}>
        <AppText style={[styles.domainText, { color: themeColors.text }]}>
          {`${baseDomain}${tail}`}
        </AppText>
        <TouchableOpacity
          onPress={() => handleCheck(tail)}
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          disabled={loadingTail === tail}
        >

          <AppText style={styles.buttonText}>
            {loadingTail === tail ? 'Loading...' : 'Kiểm tra'}
          </AppText>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {extraTailDomains.map((tail) => (
        tailDetails[tail] ? (
          <SearchDomainItem
            key={tail}
            item={tailDetails[tail]}
            onSelect={() => onSelect?.(tailDetails[tail])}
            isActive={!!cartItems.find((i: any) => (i.domain) === (tailDetails[tail].domain))}
          />
        ) : <RenderHeaderCheck key={tail} tail={tail} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.width10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.width8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  domainText: {
    fontSize: FontSize.FontSize16,
    marginBottom: Spacing.width4,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ExtraDomainList;
