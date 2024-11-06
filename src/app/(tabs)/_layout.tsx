import { Redirect, Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useAuth } from '../../providers/AuthProvider';
import { View, Text, StyleSheet } from 'react-native';

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={'/login'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide default tab labels
        tabBarStyle: styles.tabBar, // Custom tab bar style
        tabBarActiveTintColor: '#F43F5E', // Active tab color
        tabBarInactiveTintColor: '#8e8e93', // Inactive tab color
      }}
    >
      <Tabs.Screen
        name="allocations"
        options={{
          title: 'Allocations',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <View style={styles.tabButton}>
              <MaterialIcons name="account-tree" size={size} color={color} />
              <Text style={[styles.tabText, { color }]}>Allocations</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <View style={styles.tabButton}>
              <MaterialIcons name="account-balance-wallet" size={size} color={color} />
              <Text style={[styles.tabText, { color }]}>Accounts</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="session"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <View style={styles.tabButton}>
              <FontAwesome6 name="user-large" size={size} color={color} />
              <Text style={[styles.tabText, { color }]}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F9FAFB', // Light background color for the tab bar
    borderTopWidth: 0, // Remove the default border
    height: 70, // Increase height to accommodate larger buttons
    borderRadius: 50, // Rounded corners
    marginHorizontal: 20, // Margin for the rounded effect
    position: 'absolute', // Floating tab bar
    bottom: 10, // Adjust the bottom space
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Shadow for a soft look
  },

  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 5, // Adjust icon positioning
  },

  tabText: {
    marginTop: 4, // Spacing between icon and text
    fontSize: 12,
    fontWeight: 'bold',
  },
});
