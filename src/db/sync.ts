import { synchronize } from '@nozbe/watermelondb/sync';
import database from './index';
import { supabase } from '../lib/supabase';
import { getLoggedInUserId } from '../app/(auth)/getLoggedInUserId'



let firstSync = true; // Cờ để xác định lần đồng bộ đầu tiên


export async function mySync() {

//
const loggedInUserId = await getLoggedInUserId();  // Lấy user_id người đăng nhập
//

  await synchronize({
    database,
    sendCreatedAsUpdated: true,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log('Pulling data');

       // Nếu là lần đồng bộ đầu tiên, bỏ qua giá trị lastPulledAt để lấy toàn bộ dữ liệu
       firstSync = true;
       let _lastPulledAt = firstSync ? 0 : lastPulledAt;
       console.log(firstSync);
       console.log(_lastPulledAt);




      ////pull function
      // const { data, error } = await supabase.rpc('pull', {
      //   last_pulled_at: lastPulledAt,
      //   schemaversion: schemaVersion,
      //   migration: migration,
      // });
      ////pull function



      //pulltest function
      //hàm pulltest
      // Gọi hàm pull với user_id của người đăng nhập
      const { data, error } = await supabase.rpc('test', {
        last_pulled_at: _lastPulledAt,      ///đổi lastPulledAt  // Sử dụng _lastPulledAt thay vì lastPulledAt
        schemaversion: schemaVersion,
        migration: migration,
        _user_id: loggedInUserId  // Truyền user_id của người đăng nhập
      });

      //pulltest function

      if (firstSync) {
            firstSync = false;  // Đặt lại cờ sau lần đồng bộ đầu tiên
        }


      console.log(error);
      console.log(JSON.stringify(data));
      return {
        changes: data.changes,
        timestamp: data.timestamp,
      };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log('Pushing data');

      const { error } = await supabase.rpc('push', { changes });

      console.log('Error: ', error);

      console.log(changes);

      // push changes to supabase
    },
  });
}
