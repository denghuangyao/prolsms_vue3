import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('permission', () => {
  let permissions = ref<string[]>([])
  const setPermissions = (permis: string[]) => {
    permissions.value = permis
  }
  const getPermission = () => permissions.value
  return { setPermissions, getPermission }
})
