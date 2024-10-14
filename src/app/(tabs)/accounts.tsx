import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import AccountsList from '../../components/AccountsList';
import { useState } from 'react';
import database, { accountsCollection } from '../../db';
import { useAuth } from '../../providers/AuthProvider';
import { useEffect } from 'react';
import { mySync } from '../../db/sync';

export default function AccountsScreen() {
  const [name, setName] = useState('');
  const [cap, setCap] = useState('');
  const [tap, setTap] = useState('');

  const { user } = useAuth();

  const createAccount = async () => {
    await database.write(async () => {
      await accountsCollection.create((account) => {
        account.name = name;
        account.cap = Number.parseFloat(cap);
        account.tap = Number.parseFloat(tap);
        account.userId = user?.id;
      });
    });

    //Reset các giá trị input sau khi thêm tài khoản
    setName('');
    setCap('');
    setTap('');

    // //Gọi hàm mySync sau khi nhấn nút add account và reset là các giá trị
    await mySync();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>CAP</Text>
        <Text style={styles.headerText}>TAP</Text>
      </View>

      <AccountsList />

      <View style={styles.inputRow}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
        <TextInput
          value={cap}
          onChangeText={setCap}
          placeholder="CAP %"
          style={styles.input}
        />
        <TextInput
          value={tap}
          onChangeText={setTap}
          placeholder="TAP %"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Add Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F9FAFB', // Light background for modern look
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F34F5E', // Header background with color matching "Sign In" button
    borderRadius: 10,
    marginBottom: 10,
    top: -5,
  },
  headerText: {
    color: 'white', // White text for the header
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for a floating input area
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    borderColor: '#D1D5DB', // Light gray border for inputs
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F3F4F6', // Slightly off-white background for inputs
  },
  button: {
    backgroundColor: '#F34F5E', // Same red as "Sign In" button
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for the button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
