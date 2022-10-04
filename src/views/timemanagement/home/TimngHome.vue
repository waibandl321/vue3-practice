<template>
  <TimngHeader />
  <v-main >
    <v-row class="pa-6">
      <v-col cols="6">
        <v-card>
          <v-card-title>レポート確認</v-card-title>
          <v-card-text>各店舗の業務状況がグラフで確認できます。</v-card-text>
          <v-card-actions>
            <v-btn 
              variant="outlined"
              color="primary"
              to="/timemanagement/report"
            >レポート</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>店舗一覧</v-card-title>
          <v-card-text>すべての店舗から検索し、店舗ごとの業務内容・チェックシートを確認できます。</v-card-text>
          <v-card-actions>
            <v-btn 
              variant="outlined"
              color="primary"
              to="/timemanagement/shops"
            >店舗一覧</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>日常業務設定</v-card-title>
          <v-card-text>すべての店舗に、カンタンに、業務を指示することができます。</v-card-text>
          <v-card-actions>
            <v-btn 
              variant="outlined"
              color="primary"
              to="/timemanagement/manage/task"
            >タスク</v-btn>
            <v-btn 
              variant="outlined"
              color="primary"
              to="/timemanagement/manage/template"
            >テンプレート</v-btn>
            <v-btn 
              variant="outlined"
              color="primary"
              to="/timemanagement/manage/pattern"
            >業務パターン</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>臨時タスク設定</v-card-title>
          <v-card-text>いつもの業務に、緊急の指示を差し込むことができます。</v-card-text>
          <v-card-actions>
            <v-btn 
              variant="outlined"
              color="primary"
              to="/timemanagement/manage/emergency"
            >臨時タスク</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>チェックシート</v-card-title>
          <v-card-text>日々のチェックシートを電子化することで、管理・提出が楽になります。</v-card-text>
          <v-card-actions>
            <v-btn 
              variant="outlined"
              color="primary"
              to="/timemanagement/manage/checksheet"
            >チェックシート</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
export default {
  components: {
    TimngHeader
  },
  setup() {
    
  },
}
</script>