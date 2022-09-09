<template>
  <div class="pa-6">
    <v-progress-linear
      v-model="skill"
      color="blue-grey"
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  setup () {
    const skill = 20
    const knowledge = 33

    return {
      skill,
      knowledge,
    }
    
  }
}
</script>