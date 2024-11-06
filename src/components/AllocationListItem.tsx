import { View, Text, StyleSheet } from 'react-native';
import Allocation from '../model/Allocation';
import { withObservables } from '@nozbe/watermelondb/react';
import AccountAllocation from '../model/AccountAllocation';
import AccountAllocationItem from './AccountAllocationItem';

type AllocationListItem = {
  allocation: Allocation;
  accountAllocations: AccountAllocation[];
};

const AllocationListItem = ({
  allocation,
  accountAllocations,
}: AllocationListItem) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {allocation.createdAt.toLocaleDateString()}
        </Text>
        <Text style={styles.income}>{allocation.income} VNĐ</Text>
      </View>

      <View style={{ gap: 10, padding: 10, shadowOpacity: 0.9, }}>
        {accountAllocations.map((item) => (
          <AccountAllocationItem key={item.id} accountAllocation={item} />
        ))}
      </View>
    </View>
  );
};

const enhance = withObservables(
  ['allocation'],
  ({ allocation }: { allocation: Allocation }) => ({
    allocation,
    accountAllocations: allocation.accountAllocations,
  })
);

export default enhance(AllocationListItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fad7da',
  
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F43F5E',
    padding: 10,
  },

  income: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  date:{
    color: 'white',
    fontWeight: 'bold',
  },
});
