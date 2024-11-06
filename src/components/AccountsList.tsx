

import { FlatList } from 'react-native';
import AccountListItem from './AccountListItem';
import { accountsCollection } from '../db';
import Account from '../model/Account';

import { withObservables } from '@nozbe/watermelondb/react';

function AccountsList({ accounts }: { accounts: Account[] }) {
  return (
    <FlatList
      data={accounts}
      contentContainerStyle={{ 
        gap: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9, // Adjust shadow opacity
        shadowRadius: 5,
        elevation: 3,
      }}
      renderItem={({ item }) => <AccountListItem account={item} />}
    />
  );
}

const enhance = withObservables([], () => ({
  accounts: accountsCollection.query(),
}));

export default enhance(AccountsList);
