<template>
  <div class="account-form">
    <v-card class="mb-4">
      <v-card-title class="d-flex justify-space-between align-center">
        Учетные записи
        <v-btn color="primary" @click="addNewAccount">
          <v-icon icon="mdi-plus"></v-icon> Добавить учетную запись
        </v-btn>
      </v-card-title>
    </v-card>

    <v-alert type="info" variant="tonal" class="mb-4">
      В поле "Метка" можно вводить текстовые метки через знак <strong>;</strong>
    </v-alert>

    <v-card v-for="(account, index) in accounts" :key="account.id" class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="account.labelsInput"
              label="Метка"
              variant="outlined"
              placeholder="Введите метки через ;"
              :maxlength="50"
              @blur="updateLabels(account)"
              hint="Необязательное поле. Максимум 50 символов. Разделяйте метки точкой с запятой"
              persistent-hint
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              v-model="account.type"
              label="Тип записи"
              variant="outlined"
              :items="accountTypes"
              @update:modelValue="handleTypeChange(account)"
              hint="Выберите тип учетной записи"
              persistent-hint
              :menu-props="{ 'content-class': 'account-type-menu' }"
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="account.login"
              label="Логин"
              variant="outlined"
              :maxlength="100"
              :rules="loginRules"
              @blur="validateAndSave(account)"
              hint="Обязательное поле. Максимум 100 символов"
              persistent-hint
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3" v-if="account.type === 'Локальная'">
            <v-text-field
              v-model="account.password"
              label="Пароль"
              variant="outlined"
              :type="account.showPassword ? 'text' : 'password'"
              :maxlength="100"
              :rules="passwordRules"
              @blur="validateAndSave(account)"
              :append-inner-icon="
                account.showPassword ? 'mdi-eye-off' : 'mdi-eye'
              "
              @click:append-inner="togglePasswordVisibility(account)"
              :hint="
                account.showPassword
                  ? 'Пароль виден (не показывайте другим)'
                  : 'Нажмите иконку, чтобы показать пароль'
              "
              persistent-hint
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" class="text-right">
            <v-btn
              color="error"
              variant="text"
              @click="removeAccount(account.id)"
              class="mt-2"
            >
              <v-icon icon="mdi-delete"></v-icon> Удалить
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAccountsStore } from "@/stores/accounts";

const store = useAccountsStore();

const accountTypes = [
  { title: "LDAP", value: "LDAP" },
  { title: "Локальная", value: "Локальная" },
];

interface LocalAccount {
  id: string;
  labelsInput: string;
  labels: { text: string }[];
  type: "LDAP" | "Локальная";
  login: string;
  password: string | null;
  showPassword: boolean;
}

const accounts = computed<LocalAccount[]>(() => {
  return store.accounts.map((account) => ({
    ...account,
    labelsInput: account.labels.map((label) => label.text).join(";"),
    password: account.type === "Локальная" ? account.password || "" : null,
    showPassword: account.showPassword || false,
  }));
});

const loginRules = [
  (value: string) => !!value || "Логин обязателен для заполнения",
  (value: string) => value.length <= 100 || "Максимум 100 символов",
];

const passwordRules = [
  (value: string) => !!value || "Пароль обязателен для заполнения",
  (value: string) => value.length <= 100 || "Максимум 100 символов",
];

function parseLabels(labelsStr: string): { text: string }[] {
  if (!labelsStr.trim()) return [];
  return labelsStr
    .split(";")
    .map((label) => label.trim())
    .filter((label) => label)
    .map((text) => ({ text }));
}

function updateLabels(account: LocalAccount) {
  const labels = parseLabels(account.labelsInput);
  store.updateAccount(account.id, { labels });
}

function handleTypeChange(account: LocalAccount) {
  // Принудительно обновляем пароль при смене типа
  const password = account.type === "Локальная" ? account.password || "" : null;
  store.updateAccount(account.id, {
    type: account.type,
    password,
    showPassword: false, // Сбрасываем видимость при смене типа
  });
}

function validateAndSave(account: LocalAccount) {
  const isLoginValid = !loginRules.some((rule) => rule(account.login) !== true);
  const isPasswordValid =
    account.type === "Локальная"
      ? !passwordRules.some((rule) => rule(account.password || "") !== true)
      : true;

  if (isLoginValid && isPasswordValid) {
    const { labelsInput, showPassword, ...rest } = account;
    const password = account.type === "Локальная" ? account.password : null;
    store.updateAccount(account.id, {
      ...rest,
      password,
      labels: parseLabels(labelsInput),
      showPassword: showPassword || false,
    });
  }
}

function addNewAccount() {
  store.addAccount({
    labels: [],
    type: "Локальная", // Тип по умолчанию
    login: "",
    password: "",
    showPassword: false,
  });
}

function removeAccount(id: string) {
  store.removeAccount(id);
}
function togglePasswordVisibility(account: LocalAccount) {
  account.showPassword = !account.showPassword;
}
</script>

<style scoped>
.account-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

:deep(.account-type-menu) {
  z-index: 1000 !important;
}
</style>
