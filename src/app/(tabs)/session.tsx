import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Animated, Easing, Image } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigation } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons } from '@expo/vector-icons';

export default function SessionScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCancelPressed, setCancelPressed] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;  // Giá trị hoạt ảnh

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Hàm khởi chạy hoạt ảnh
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 10000, // thời gian chạy hết một vòng (10 giây)
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const handleLogoutPress = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    logout();
  };

  // Hiệu ứng di chuyển từ phải sang trái
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [400, -400], // Di chuyển từ 400px bên phải màn hình sang -400px bên trái
  });

  return (
    <View style={styles.container}>
      {/* Blue Header */}
      <View style={styles.header}>
        
      <TouchableOpacity>
        <View style ={{flex: 1, top: 130, right:-100}}>
          <Image style={{zIndex: 1}} source = {require('../../../assets/image.png')}/>
        </View>
      </TouchableOpacity>

      </View>

      <View style={styles.iconCircle}>
        <AntDesign name="user" size={50} color="#f43f5e" style={{bottom:2}}/>
      </View>
      <Text style={styles.title}></Text>

      <View style={styles.infoContainer}>
        <View style={styles.row1}>
          <FontAwesome6 name="user-large" size={24} color="#6B6B6B" />
          <Text style={styles.value1}>{user.user_metadata.userName || 'User Name'}</Text>
        </View>
        
        <View style={[styles.divider, {bottom:30}]}/>

        
        <View style={styles.row2}>
          <MaterialIcons name="phone" size={24} color="#6B6B6B" />
          <Text style={styles.value2}>{user.user_metadata.phoneNumber || 'Phone Number'}</Text>
        </View>

        <View style={[styles.divider, {bottom:70}]}/>

        <View style={styles.row3}>
          <MaterialIcons name="email" size={24} color="#6B6B6B" />
          <Text style={styles.value}>{user?.email || 'Email'}</Text>
        </View>

        <View style={[styles.divider, {bottom:110, height:3}]}/>

      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress} activeOpacity={0.3}>
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>

      {/* Câu nói khích lệ với hiệu ứng chạy */}
      {/* <Animated.Text style={[styles.encouragementText, { transform: [{ translateX }] , bottom:190 }]}>
        "You are amazing! Keep pushing forward! ✨"
      </Animated.Text> */}

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.exclamationIcon}>⚠️</Text>
            </View>
            <Text style={styles.modalText}>Do you want to log out?</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.cancelButton, isCancelPressed && styles.cancelButtonPressed]}
                onPressIn={() => setCancelPressed(true)}
                onPressOut={() => setCancelPressed(false)}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.confirmButton} onPress={confirmLogout}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#f43f5e',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    width: 500, // Full width of the screen
    bottom: -200, 
    right:30  // Adjust bottom position for spacing
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    right:40,  // Adjust right position for spacing
    bottom:20
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    alignSelf: 'center',
    top:130,
    borderColor: "#f43f5e",
    zIndex: 1000,
    right:110
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#111',
  },

  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    top:-5,
    height:'100%',
    width:412,
    right:30



  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 30,
    bottom:-17,
    left:-19
  },

  row2:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 30,
    bottom:20,
    left:-19
  },

  row3:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 30,
    bottom:60, 
    left:-19
  },

  value: {
    fontSize: 18,
    color: '#111',
    marginLeft: 10,
    bottom:-1
  },

  value1:{
    fontSize: 18,
    color: '#111',
    marginLeft: 10,
    bottom:-5
  },


  value2:{
    fontSize: 18,
    color: '#111',
    marginLeft: 10,
    bottom:-2
  },



  logoutButton: {
  
    backgroundColor: '#F43f5e',
    paddingVertical: 15,
    borderRadius: 50,
    bottom: 450,
    alignSelf: 'center',
    width: '80%',  // Make button span 80% of the screen width
    zIndex: 1000
  },
  logoutButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#FFE0B2',
    borderRadius: 50,
    padding: 10,
    marginBottom: 15,
  },
  exclamationIcon: {
    fontSize: 40,
    color: '#F57C00',
  },
  modalText: {
    fontSize: 18,
    color: '#111',
    marginBottom: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonPressed: {
    backgroundColor: '#757575',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#F43F5E',
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  encouragementText: {
    fontSize: 18,
    color: '#f43f5e',
    textAlign: 'center',
    position: 'absolute',
    bottom: 80,  // vị trí hiển thị câu khích lệ
  },

  divider:{
    height:2,
    backgroundColor:'#f43f5e',
    marginVertical:20,
    width:'100%',
    bottom:40
  },

  logo: {
    width: 200,  // Chiều rộng của logo
    height: 200,  // Chiều cao của logo
    resizeMode: 'contain',  // Đảm bảo ảnh không bị biến dạng
    marginBottom: 200,  // Khoảng cách phía dưới logo
  },

});
