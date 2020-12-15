import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

const FriendList: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

        <Text>List De amigos</Text>
    </View>
  );
};

export default FriendList;