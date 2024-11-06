import { View, Text, StyleSheet } from 'react-native';
import Account from '../model/Account';
import { withObservables } from '@nozbe/watermelondb/react';
import { AntDesign } from '@expo/vector-icons';
import database from '../db';

type AccountListItem = {
  account: Account;
};

function AccountListItem({ account }: AccountListItem) {
  const onDelete = async () => {
    await database.write(async () => {
      await account.markAsDeleted();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{account.name}</Text>
      <Text style={styles.percentage}>{account.cap}%</Text>
      <Text style={[styles.percentage, {right:35}]}>{account.tap}%</Text>
      <AntDesign name="delete" size={18} color="gray" onPress={onDelete} />
    </View>
  );
}

const enhance = withObservables(
  ['account'],
  ({ account }: AccountListItem) => ({
    account,
  })
);

export default enhance(AccountListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for floating effect
    marginBottom: 2,
    top: 10,
    flexWrap: 'wrap',

  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    borderWidth:0,
    marginRight: 90
  },

  percentage: {
    flex: 1,

    right: 70
  },

});
