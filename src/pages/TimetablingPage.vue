<template>
  
  <q-page class="row items-center justify-evenly">
    <timetabling-component />
    <school-component />
  </q-page>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimetablingComponent from 'components/TimetablingComponent.vue';
import SchoolComponent from 'components/SchoolComponent.vue';
export default defineComponent({
  name: 'TimetablingPage',
  components: { TimetablingComponent, SchoolComponent },
  setup() {
    return {};
  },
});
</script>