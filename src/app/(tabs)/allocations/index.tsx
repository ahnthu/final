import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import AllocationsList from '../../../components/AllocationsList';
import { Feather } from '@expo/vector-icons';
import { mySync } from '../../../db/sync';
import { useEffect } from 'react';

export default function HomeScreen() {

  // // Đồng bộ dữ liệu khi màn hình được load
  // useEffect(() => {
  //   const syncData = async () => {
  //     try {
  //       await mySync();  // Gọi hàm đồng bộ khi màn hình này load
  //     } catch (error) {
  //       console.log('Error syncing data: ', error);
  //     }
  //   };

  //   syncData();  // Gọi hàm sync ngay khi component được render lần đầu
  // }, []);  // Mảng rỗng để chỉ chạy khi component mount lần đầu


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Allocations',
          // headerRight: () => (
          //   <Feather
          //     name="refresh-cw"
          //     size={20}
          //     color='#F34F5E'
          //     onPress={mySync}
          //   />
          // ),
        }}
      />

      <AllocationsList />

      {/* Floating Action Button */}
      <Link href="/allocations/new" asChild>
        <TouchableOpacity style={styles.fab}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: '#F43F5E', // Same red color for the floating button
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Adds elevation to give a "floating" effect
  },
});
