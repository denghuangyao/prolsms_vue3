import { defineStore, acceptHMRUpdate } from 'pinia';
import { type UserInfo } from '@/types';
interface AccessState {
  userInfo: UserInfo | null;
}
export const useUserStore = defineStore('user', {
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
    },
  },
  state: (): AccessState => ({
    userInfo: null,
  }),
  persist: true,
});
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
