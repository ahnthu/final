import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link, Stack, useNavigation } from 'expo-router';
import AllocationsList from '../../../components/AllocationsList';
import { Feather } from '@expo/vector-icons';
import { mySync } from '../../../db/sync';
import { useLayoutEffect } from 'react';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Hide the header for this screen
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View style={styles.customHeader}>
          <Text style={styles.welcomeText}>
            Allocations

          </Text>
        </View>
      )
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Allocations',
          // headerRight: () => (
          //   <Feather
          //     name="refresh-cw"
          //     size={20}
          //     color="#f34f55e"
          //     onPress={mySync}
          //   />
          // ),
        }}
      />
    <View style = {{paddingBottom: 100}}>
      <AllocationsList />
    </View>

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
  // dien so 
  container: {
    flex: 1,
    position: 'relative',
    top:15
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 115,
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

  customHeader:{
    paddingHorizontal: 1,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:5
  },

  welcomeText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111827', // Dark text color for welcome message

  },
});
