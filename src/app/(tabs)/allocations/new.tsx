import { Stack, router, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import database, {
  accountAllocationCollection,
  accountsCollection,
  allocationsCollection,
} from '../../../db';
import { withObservables } from '@nozbe/watermelondb/react';
import Account from '../../../model/Account';
import { useAuth } from '../../../providers/AuthProvider';
import { mySync } from '../../../db/sync';

function NewAllocationScreen({ accounts }: { accounts: Account[] }) {
  const [income, setIncome] = useState('0');

  const { user } = useAuth();

  const navigation = useNavigation();

  // Hide the header for this screen
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => 
        <View style={styles.customHeader}>
          <Text style={styles.welcomeText}>
            Add Allocations
          </Text>
        </View>
    })
  }, [navigation]);

  const save = async () => {
    await database.write(async () => {
      const allocation = await allocationsCollection.create((newAllocation) => {
        newAllocation.income = Number.parseFloat(income);
        newAllocation.userId = user?.id;
      });

      await Promise.all(
        accounts.map((account) =>
          accountAllocationCollection.create((item) => {
            item.account.set(account);
            item.allocation.set(allocation);
            item.cap = account.cap;
            item.amount = (allocation.income * account.cap) / 100;
            item.userId = user?.id;
          })
        )
      );
    });
    await mySync();
    setIncome('');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'New Allocation' }} />

      <View style={styles.inputRow}>
        <Text style={styles.label}>Income</Text>
        <TextInput
          value={income}
          onChangeText={setIncome}
          placeholder="123 VND"  // Updated placeholder
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      {/* Wrap the list in a ScrollView to make it scrollable */}
      <ScrollView style={styles.scrollContainer}>
        {accounts.map((account) => (
          <View key={account.id} style={[styles.inputRow, { borderRadius: 50, marginBottom: 8 }]}>
            <Text style={styles.accountText}>
              {account.name}: {account.cap}%
            </Text>
            <Text style={styles.amount}>
              {(Number.parseFloat(income) * account.cap / 100).toFixed(2)} VNĐ
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const enhance = withObservables([], () => ({
  accounts: accountsCollection.query(),
}));

export default enhance(NewAllocationScreen);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F9FAFB', // Light background for modern look
    flex: 1,
    paddingBottom: 120,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#374151', // Dark gray for a modern text color
    width: 100,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for floating effect
    marginBottom: 2,
    top: 10,
  },
  
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F3F4F6', // Off-white background for input
    borderRadius: 8,
    borderColor: '#D1D5DB', // Light gray border
    borderWidth: 1,
  },
  accountText: {
    flex: 1,
    fontSize: 16,
    color: '#374151', // Modern dark text color
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F43F5E', // Red to match the design accent
  },
  button: {
    backgroundColor: '#F43F5E', // Red button for save action
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Floating button effect
    top: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  customHeader: {
    paddingHorizontal: 1,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111827', // Dark text color for welcome message
    right: 15,
    bottom: 3,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
});
