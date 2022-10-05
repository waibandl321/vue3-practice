<template>
  <v-card-item>
    <v-card-subtitle>タスク名</v-card-subtitle>
    <v-text-field></v-text-field>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>タスク区分</v-card-subtitle>
    <v-radio-group>
      <v-radio
        v-for="n in 3"
        :key="n"
        :label="`区分 ${n}`"
        :value="n"
        color="primary"
      ></v-radio>
    </v-radio-group>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>タスク内容</v-card-subtitle>
    <v-textarea
      value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    ></v-textarea>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>ポジション</v-card-subtitle>
    <v-select
      :items="['select1','select2']"
    ></v-select>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>所要時間</v-card-subtitle>
    <v-text-field
      type="number"
      suffix="分"
    ></v-text-field>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>チェックシート連携</v-card-subtitle>
    <v-select
      :items="['select1','select2']"
    ></v-select>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>オプション</v-card-subtitle>
    <v-checkbox
      v-for="n in 3"
      :key="n"
      :label="`オプション ${n}`"
      :value="n"
      color="primary"
      hide-details
    ></v-checkbox>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>タグ</v-card-subtitle>
  </v-card-item>
</template>