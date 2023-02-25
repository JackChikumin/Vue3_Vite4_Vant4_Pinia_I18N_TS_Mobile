import { store } from '/@/stores';
import { defineStore } from 'pinia';

// 用户信息
interface UserState {
  // 令牌
  Token: string | null;
  // 用户是否自信修改过主题模式
  isUserDark: boolean;
}

// 导出用户信息
export const useUserStore = defineStore({
  id: 'User',
  state: (): UserState => ({
    // 令牌
    Token: null,
    // 用户是否自信修改过主题模式
    isUserDark: false,
  }),
  // getters
  getters: {
    // 获取Token
    getToken(): string | null {
      return this.Token || null;
    },
    // 获取用户是否自信修改过主题模式
    getUserDark(): boolean {
      return this.isUserDark || false;
    },
  },
  // actions
  actions: {
    // 写入令牌
    setToken(payload: string | null): void {
      this.Token = payload;
    },
    // 用户是否自信修改过主题模式
    setUserDark(payload: boolean): void {
      this.isUserDark = payload;
    }
  }
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}