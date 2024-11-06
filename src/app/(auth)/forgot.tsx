import React, { useState, useLayoutEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { router, useNavigation } from 'expo-router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState(''); // State for User Name
  const [phoneNumber, setPhoneNumber] = useState(''); // State for Phone Number
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Helper function to check email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
  };

  // Function to check if user already exists
  const checkUserExists = async (email, userName, phoneNumber) => {
    try {
      // Check if the email already exists
      const { data: emailExists } = await supabase
        .from('profiles') // Assuming 'profiles' is your user table
        .select('*')
        .eq('email', email)
        .single();

      if (emailExists) {
        Alert.alert("Error: ", "The email already exists");
        return false;
      }

      // Check if the username already exists
      const { data: userNameExists } = await supabase
        .from('profiles')
        .select('*')
        .eq('userName', userName)
        .single();

        if (userNameExists) {
          Alert.alert('Error:', 'The username is already taken. Please choose a different one.');
          return false;
        } else {
          console.log('Error: ','Username is available');
        }        

      // Check if the phone number already exists
      const { data: phoneExists } = await supabase
        .from('profiles')
        .select('*')
        .eq('phoneNumber', phoneNumber)
        .single();

      if (phoneExists) {
        Alert.alert('Error: ','Phone number is already registered.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking user existence:', error);
      Alert.alert('An error occurred while checking user information.');
      return false;
    }
  };

  async function signUpWithEmail() {
    // Check if the phone number is provided
    if (!userName) {
      Alert.alert('Error:', 'Please enter a User Name!.');
      return;

    } else if (!isValidEmail(email)) {
      Alert.alert('Error:', 'Please enter your gmail address!.');
      return;

    } else if (!phoneNumber) {
      Alert.alert('Error:', 'Please enter a Phone Number.');
      return;
    } else if (!/^0\d{9}$/.test(phoneNumber)) { // Regex for validating a 10-digit number starting with 0
      Alert.alert('Error:', 'Phone number is invalid! Must be 10 digits and start with 0.');
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Error:', 'The two passwords do not match.');
      return;
    }
    
  
    // Check if the phone number is valid
    const phoneRegex = /^0\d{9}$/; // Regex for validating a 10-digit number starting with 0
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Error:','Phone number is unvalid!');
      return;
    }
  
    // Validate email format
    if (!isValidEmail(email)) {
      Alert.alert('Error:', 'Invalid email format. Please enter a valid email address.');
      return;
    } else {
      // Check if the email already exists in the database
      const emailExists = await supabase
        .from('profiles') // Assuming 'profiles' is your user table
        .select('*')
        .eq('email', email)
        .single();
    
      if (emailExists) {
        Alert.alert('Error:', 'This email address is already exits.');
        return;
      }
    }
    
  
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error:', 'The two passwords is not the same.');
      return;
    }
  
    // Check if email, username, or phone already exist
    const isUnique = await checkUserExists(email, userName, phoneNumber);
    if (!isUnique) {
      return;
    }
  
    setLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            userName: userName, // Send userName to database
            phoneNumber: phoneNumber, // Send phoneNumber to database
          },
        },
      });
  
      if (error) {
        console.error('Error during sign up:', error);
        Alert.alert("Notes: ","Error during sign up");
      } else {
        console.log('Sign up successful:', session);
        if (!session) {
          Alert.alert('Please check your inbox for email verification!');
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.subheading}>Sign up to get started!</Text>

      {/* User Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="Enter User Name"
          placeholderTextColor="#A3A3A3"
          autoCapitalize="words"
          style={styles.input}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter Email"
          placeholderTextColor="#A3A3A3"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          placeholder="Enter Phone Number"
          placeholderTextColor="#A3A3A3"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter Password"
          placeholderTextColor="#A3A3A3"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor="#A3A3A3"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={signUpWithEmail}
        disabled={loading}
      >
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Link to Sign In */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.signInLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#111',
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#6B6B6B',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  signUpButton: {
    backgroundColor: '#F43F5E',
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    textAlign: 'center',
    color: '#6B6B6B',
  },
  signInLink: {
    color: '#000',
    fontWeight: 'bold',
  },

});