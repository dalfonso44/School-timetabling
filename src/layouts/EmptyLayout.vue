<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EmptyLayout',

  components: {},

  setup() {
    console.log('Calling inside empty layout');
    return {};
  },
});
</script>
