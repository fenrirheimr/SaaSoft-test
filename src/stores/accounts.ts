import { defineStore } from 'pinia'

interface Label {
    text: string
}

interface Account {
    id: string
    labels: Label[]
    type: 'LDAP' | 'Локальная'
    login: string
    password: string | null
    showPassword: boolean
}

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as Account[],
    }),
    actions: {
        addAccount(account: Omit<Account, 'id'>) {
            this.accounts.push({
                id: crypto.randomUUID(),
                ...account
            })
        },
        updateAccount(id: string, updatedAccount: Partial<Account>) {
            const index = this.accounts.findIndex(acc => acc.id === id)
            if (index !== -1) {
                this.accounts[index] = {
                    ...this.accounts[index],
                    ...updatedAccount
                }
            }
        },
        removeAccount(id: string) {
            this.accounts = this.accounts.filter(acc => acc.id !== id)
        },
    },
    persist: true
})