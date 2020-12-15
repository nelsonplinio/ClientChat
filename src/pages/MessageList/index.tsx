import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

const MessageList: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{JSON.stringify(user)}</Text>
      <TouchableOpacity onPress={signOut}>

        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageList;