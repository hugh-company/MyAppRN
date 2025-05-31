import { AppHeader } from '@components';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useCartScreen } from './CartScreen.hook';
import ItemCart from './ItemCart';

const CartScreen = () => {
  const { carts, themeColors, styles } = useCartScreen();

  // Calculate totals (assumes each cart item has a numeric 'price' property)
  const subtotal = carts.reduce((acc, item) => acc + (item.price || 0), 0);
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  return (
    <View style={styles.container}>
      <AppHeader
        title={`Giỏ hàng: ${carts.length || ''} sản phẩm`}
        isCart={false}
        style={styles.header}
      />
      {/* Cart items list using FlatList */}
      <FlatList
        data={carts}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => <ItemCart item={item} index={index} />}
        contentContainerStyle={styles.cartList}
      />
      {/* Summary section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text>Tạm tính:</Text>
          <Text>{subtotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>VAT:</Text>
          <Text>{vat}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Tổng cộng:</Text>
          <Text>{total}</Text>
        </View>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Tiến hành đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
