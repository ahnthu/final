import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AccountsList from '../../components/AccountsList';
import { useLayoutEffect, useState } from 'react';
import database, { accountsCollection } from '../../db';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { mySync } from '../../db/sync';

export default function AccountsScreen() {
  const [name, setName] = useState('');
  const [cap, setCap] = useState('');
  const [tap, setTap] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const { user } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View style={styles.customHeader}>
          <Text style={styles.welcomeText}>
            Account
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <View style={styles.ringRedIcon} />
          <View style={styles.ringIcon}>
            <Ionicons name="notifications-outline" size={28} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, user]);

  const createAccount = async () => {
    await database.write(async () => {
      await accountsCollection.create((account) => {
        account.name = name;
        account.cap = Number.parseFloat(cap);
        account.tap = Number.parseFloat(tap);
        account.userId = user?.id;
      });
    });
    setName('');
    setCap('');
    setTap('');

    await mySync();
  };

  const handleFocus = () => {
    setIsInputActive(true);
  };

  const handleBlur = () => {
    setIsInputActive(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>CAP      </Text>
        <Text style={styles.headerText}>TAP</Text>
        <Text style={styles.headerText}>            </Text>
      </View>

      <View style={{ flex: 1, marginBottom: 100 }}>
        <AccountsList />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={[styles.input, isInputActive ? styles.activeInput : {}]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TextInput
          value={cap}
          onChangeText={setCap}
          placeholder="CAP %"
          style={[styles.input, isInputActive ? styles.activeInput : {}]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TextInput
          value={tap}
          onChangeText={setTap}
          placeholder="TAP %"
          style={[styles.input, isInputActive ? styles.activeInput : {}]}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
    backgroundColor: '#F9FAFB',
    flex: 1,
  },

  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111827',
  },

  notification: {
    fontSize: 18,
    color: '#F43F5E',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F43F5E',
    borderRadius: 10,
    marginBottom: 8,
    top: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height:50
  },

  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 50,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Stronger shadow position (height: 4 for more depth)
    shadowOpacity: 0.2, // Slightly darker shadow
    shadowRadius: 6, // Increased blur radius for softer edges
    elevation: 6, // Increased elevation for Android
    marginBottom: 15,
    bottom: 85,
  },
  

  input: {
    flex: 1,
    marginHorizontal: 5,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#F3F4F6',
  },

  activeInput: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  button: {
    backgroundColor: '#F43F5E',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    bottom: 90,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  ringIcon: {
    paddingRight: 15,
    zIndex: -50,
  },

  ringRedIcon: {
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 5,
    position: 'absolute',
    zIndex: 1,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: 2,
  },

  headerRing: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    height: 50,
    top: -20,
  },

  headerRingText: {
    fontSize: 18,
    color: 'black',
  },
});
