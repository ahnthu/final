import { Stack, router } from 'expo-router';
import { useState } from 'react';
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
    setIncome('');
    router.back();
    
    // // Gọi mySync
    // await mySync();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'New Allocation' }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Income</Text>
          <TextInput
            value={income}
            onChangeText={setIncome}
            placeholder="$123"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        {accounts.map((account) => (
          <View key={account.id} style={styles.inputRow}>
            <Text style={styles.accountText}>
              {account.name}: {account.cap}%
            </Text>
            <Text style={styles.amount}>
              {((Number.parseFloat(income) * account.cap) / 100)}VNĐ
            </Text>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const enhance = withObservables([], () => ({
  accounts: accountsCollection.query(),
}));

export default enhance(NewAllocationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 100, // Make sure there's space at the bottom
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#374151',
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
    elevation: 3,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  accountText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F43F5E',
  },
  button: {
    backgroundColor: '#F43F5E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 20, // Ensure space above the button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
