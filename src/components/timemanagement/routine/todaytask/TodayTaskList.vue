<template>
  <v-list>
    <v-alert
    color="error"
    theme="dark"
    density="compact"
    >緊急・臨時タスク</v-alert>
    <template
      v-for="i of 2"
      :key="i"
    >
      <v-list-item
        rounded
        variant="elevated"
        class="mt-2"
      >
        <template v-slot:append="{ isActive }">
          <v-list-item-action start>
            <v-btn
              :model-value="isActive"
              icon="mdi-feature-search-outline"
              size="small"
            ></v-btn>
            <v-btn
              :model-value="isActive"
              icon="mdi-check-bold"
              size="small"
            ></v-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>12:00 テストタスク</v-list-item-title>
      </v-list-item>
      <!-- サブタスクあり -->
      <v-list-item
        rounded
        variant="elevated"
        class="subtask-card"
      >
        <template v-slot:append="{ isActive }">
          <v-list-item-action start>
            <v-btn
              :model-value="isActive"
              icon="mdi-feature-search-outline"
              size="small"
            ></v-btn>
            <v-btn
              :model-value="isActive"
              icon="mdi-check-bold"
              size="small"
            ></v-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>12:00 テストタスク</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
  <v-list>
    <v-alert
    color="#2A3B4D"
    theme="dark"
    density="compact"
    >時間指定あり</v-alert>
    <template
      v-for="i of 2"
      :key="i"
    >
      <v-list-item
        rounded
        variant="elevated"
        class="mt-2"
      >
        <template v-slot:append="{ isActive }">
          <v-list-item-action start>
            <v-btn
              :model-value="isActive"
              icon="mdi-feature-search-outline"
              size="small"
            ></v-btn>
            <v-btn
              :model-value="isActive"
              icon="mdi-check-bold"
              size="small"
            ></v-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>12:00 テストタスク</v-list-item-title>
      </v-list-item>
      <!-- サブタスクあり -->
      <v-list-item
        rounded
        variant="elevated"
        class="subtask-card"
      >
        <template v-slot:append="{ isActive }">
          <v-list-item-action start>
            <v-btn
              :model-value="isActive"
              icon="mdi-feature-search-outline"
              size="small"
            ></v-btn>
            <v-btn
              :model-value="isActive"
              icon="mdi-check-bold"
              size="small"
            ></v-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>12:00 テストタスク</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
  <v-list>
    <v-alert
    color="#2A3B4D"
    theme="dark"
    density="compact"
    >時間指定なし</v-alert>
    <template
      v-for="i of 2"
      :key="i"
    >
      <v-list-item
        rounded
        variant="elevated"
        class="mt-2"
      >
        <template v-slot:append="{ isActive }">
          <v-list-item-action start>
            <v-btn
              :model-value="isActive"
              icon="mdi-feature-search-outline"
              size="small"
            ></v-btn>
            <v-btn
              :model-value="isActive"
              icon="mdi-check-bold"
              size="small"
            ></v-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>12:00 テストタスク</v-list-item-title>
      </v-list-item>
      <!-- サブタスクあり -->
      <v-list-item
        rounded
        variant="elevated"
        class="subtask-card"
      >
        <template v-slot:append="{ isActive }">
          <v-list-item-action start>
            <v-btn
              :model-value="isActive"
              icon="mdi-feature-search-outline"
              size="small"
            ></v-btn>
            <v-btn
              :model-value="isActive"
              icon="mdi-check-bold"
              size="small"
            ></v-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>12:00 テストタスク</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>