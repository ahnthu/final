// /lib/auth/getLoggedInUserId.tsx
import { supabase } from '../../lib/supabase';

export const getLoggedInUserId = async (): Promise<string | null> => {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
        console.log('Error getting logged in user:', error);
        return null;
    }
    
  return user ? user.id : null;  // Trả về user_id nếu có
};
