<template>
  <q-page class="row items-center justify-evenly">
    <tabling-component />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TablingComponent from 'components/TablingComponent.vue';

export default defineComponent({
  name: 'TablingPage',
  components: { TablingComponent },
  setup() {
    return {};
  }
});
</script>
