import { AppHeader, AppImage, AppInputSearchDomain, AppText, LoadingSearch } from '@components';
import { useTheme } from '@theme';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GoDaddyIcon, NameComLogo } from '@assets';
import { useSearchDomainApi } from '@hooks';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { addToCart, removeFromCart, RootState } from '@redux';
import { checkDomainSuffixDetail } from '@services';
import { useSearchDomain } from './SearchDomain.hook';
import SearchDomainItem from './SearchDomainItem';
import ExtraDomainList from './components/ExtraDomainList';

const SearchDomain = () => {
  const { styles } = useSearchDomain();
  const { themeColors } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [useNameCom, setUseNameCom] = useState(false);
  const { baseDomain, list_ext, domainDetail, loading, refetch } = useSearchDomainApi(
    { domain: searchValue },
    useNameCom
  );
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartSlice.items);
  const [showExtraDomains, setShowExtraDomains] = useState(false);
  const extraTailDomains = ['.express', '.lifestyle', '.study', '.beauty', '.pro', '.delivery', '.kids', '.health'];

  const handleSelect = (item: any) => {
    const itemId = item.domain; // unified id
    const exists = cartItems.find((i: any) => (i.domain) === itemId);
    if (exists) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(addToCart(item));
    }
  };

  const handleExtraDomainCheck = async (tail: string) => {
    if (!domainDetail?.domain) return;
    try {
      const response = await checkDomainSuffixDetail(domainDetail.domain, tail);
      console.log(`Response for ${domainDetail.domain}${tail}:`, response);
    } catch (error) {
      console.log(error);
    }
  };

  const renderRecommendation = () => (
    <View style={styles.recommendationContainer}>
      {domainDetail && (
        <SearchDomainItem
          item={domainDetail}
          onSelect={() => handleSelect(domainDetail)}
          isActive={!!cartItems.find((i: any) => (i.domain) === (domainDetail.domain))}
        />
      )}
      <View style={styles.recommendationContainer}>
        <AppText style={styles.txtRecommendation}>
          Gợi ý tên miền
        </AppText>
      </View>
    </View>
  );
  console.log('list_ext', list_ext, cartItems);
  return (
    <View style={styles.container}>
      <AppHeader style={styles.header} />
      <AppInputSearchDomain
        editable={true}
        autoFocus={true}
        placeholder="Nhập tên miền bạn muốn đăng ký"
        style={styles.inputSearch}
        onClickSearch={(value) => {
          setSearchValue(value);
          if (value.trim().length > 0) {
            refetch();
          }
        }}
      />
      <View style={styles.viewCategory}>
        <TouchableOpacity
          style={[
            styles.btnGoDaddy,
            !useNameCom && styles.activeButton, // Highlight active button
          ]}
          onPress={() => {
            setUseNameCom(false);
            if (searchValue.trim().length > 0) {
              refetch(); // Trigger API call
            }
          }}
        >
          <AppImage defaultSource={GoDaddyIcon} style={styles.iconGoDaddy} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnNameCom,
            useNameCom && styles.activeButton, // Highlight active button
          ]}
          onPress={() => {
            setUseNameCom(true);
            if (searchValue.trim().length > 0) {
              refetch(); // Trigger API call
            }
          }}
        >
          <NameComLogo />
        </TouchableOpacity>
      </View>

      {searchValue.trim().length > 0 && loading ? (
        <LoadingSearch />
      ) : searchValue.trim().length > 0 && list_ext && list_ext.length > 0 ? (

        <FlatList
          data={list_ext}
          ListHeaderComponent={renderRecommendation}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.domain}
          renderItem={({ item }) => (
            <SearchDomainItem
              item={item}
              onSelect={() => handleSelect(item)}
              isActive={!!cartItems.find((i: any) => (i.domain) === (item.domain))}
            />
          )}
          ListFooterComponent={
            <View>
              {!showExtraDomains ? (
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => setShowExtraDomains(true)}
                >
                  <AppText style={styles.continueButtonText}>Xem thêm</AppText>
                </TouchableOpacity>
              ) : (
                <ExtraDomainList
                  baseDomain={baseDomain} // use computed baseDomain
                  extraTailDomains={extraTailDomains}
                  onSelect={(item) => handleSelect(item)}

                  themeColors={themeColors}
                />
              )}
            </View>
          }
        />

      ) : searchValue.trim().length > 0 ? (
        <AppText style={styles.notFoundText}>Không tìm thấy kết quả</AppText>
      ) : null}

      {searchValue.trim().length > 0 && !loading &&
        <View style={styles.viewBottom}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              cartItems.length === 0 && styles.continueButtonDisabled,
            ]}
            disabled={cartItems.length === 0}
            onPress={() => navigate(SCREEN_ROUTE.CART)}
          >
            <AppText style={styles.continueButtonText}>Tiếp tục</AppText>
          </TouchableOpacity>

        </View>
      }
    </View>
  );
};

export default SearchDomain;
