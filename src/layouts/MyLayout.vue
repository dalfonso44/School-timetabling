<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MyLayout',

  components: {},

  setup() {
    console.log('Calling inside empty layout');
    return {};
  },
});
</script>