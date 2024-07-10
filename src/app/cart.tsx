import {Platform, Text, View, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
    const { items, total } = useCart();

    return (
        <View>
            <FlatList
            data={items}
            renderItem={({item}) => <CartListItem cartItem={item}/>}
            contentContainerStyle={{padding: 10, gap: 10}}
            />
            
            <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>Total: ${total}</Text>
            <Button text='Checkout' />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;