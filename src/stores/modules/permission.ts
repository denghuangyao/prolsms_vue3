import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const usePermissionStore = defineStore('permission', () => {
  let permissions = ref<string[]>([]);
  const setPermissions = (permis: string[]) => {
    permissions.value = permis;
  };
  const getPermission = () => permissions.value;
  return { setPermissions, getPermission };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
}
