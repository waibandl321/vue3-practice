<template>
  <v-card
    class="mx-auto"
    width="300"
  >
    <v-list>
      <v-list-item 
        prepend-icon="mdi-home"
        title="Home"
        link
        @click="backFunc()"
      ></v-list-item>
      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="個人"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="([title, icon], i) in admins"
          :key="i"
          :title="title"
          :prepend-icon="icon"
          :value="title"
          @click="moveRoom()"
        ></v-list-item>
      </v-list-group>
      <v-list-group value="Groups">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="グループ"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="([title, icon], i) in admins"
          :key="i"
          :title="title"
          :prepend-icon="icon"
          :value="title"
          @click="moveRoom()"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>

export default {
  props: {
    changeMode: {
      type: Function
    },
  },
  setup (props) {
    const backFunc = () => {
      props.changeMode('home')
    }
    const moveRoom = () => {
      props.changeMode('room')
    }
    return {
      backFunc,
      moveRoom
    }
  },
  data: () => ({
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline'],
    ],
  }),
}
</script>