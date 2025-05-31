import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface ItemCartProps {
  item: {
    domain?: string;
    price: number;
    id?: string;
    // ...other properties...
  };
  index: number;
}

const ItemCart = ({ item, index }: ItemCartProps) => {
  const [selectedYear, setSelectedYear] = React.useState('1');
  const [autoRenew, setAutoRenew] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false); // New checkbox state
  const years = ['1', '2', '3']; // options for years

  return (
    <View style={{ marginVertical: 8, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 }}>
      {/* Domain name display with checkbox */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
          <Text style={{ fontSize: 18, marginRight: 8 }}>
            {isSelected ? '☑' : '☐'}
          </Text>
        </TouchableOpacity>
        <Text>{item.name || `Domain ${index + 1}`}</Text>
      </View>
      {/* Custom dropdown for yearly package selection */}
      <SelectDropdown
        data={years}
        defaultValue="1"
        buttonStyle={{ height: 50, width: 150, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }}
        onSelect={(selectedItem) => setSelectedYear(selectedItem)}
        buttonTextAfterSelection={(selectedItem: any) => `${selectedItem} năm`}
        rowTextForSelection={(year: any) => `${year} năm`}
      />
      {/* Action buttons row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <TouchableOpacity style={{ marginRight: 8, padding: 8, backgroundColor: '#e74c3c', borderRadius: 4 }}>
          <Text style={{ color: '#fff' }}>Xoá</Text>
        </TouchableOpacity>
        <Switch value={autoRenew} onValueChange={setAutoRenew} />
        <TouchableOpacity style={{ marginHorizontal: 8, padding: 8 }}>
          <Text>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 8, backgroundColor: '#3498db', borderRadius: 4 }}>
          <Text style={{ color: '#fff' }}>Switch</Text>
        </TouchableOpacity>
      </View>
      {/* Price button */}
      <TouchableOpacity style={{ marginTop: 8, padding: 8, backgroundColor: '#2ecc71', borderRadius: 4 }}>
        <Text style={{ color: '#fff' }}>Giá: {item.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCart;
