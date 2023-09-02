<template>
  <q-page class="row items-center justify-evenly">
    <gschedule-component
      :school_data="school_data[selected_year].groups"
      :group_keys="group_keys"
      :year_keys="year_keys"
      :selected_group="selected_group"
      :selected_year="selected_year"
      :selected_color="selected_color"
      @update-group="selected_group = $event"
      @update-year="onChangeYear"
      @update="school_data[selected_year].groups = $event"
      @on-save="onSave"
      @on-clear="onClear"
      @create-year="add_year"
      @create-group="add_group"
      @update-color="($event) => (selected_color = $event)"
    />
    <sschedule-component
      :rooms_school_data="school_data[selected_year].rooms"
      @update="school_data[selected_year].rooms = $event"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GscheduleComponent from 'components/GscheduleComponent.vue';
import SscheduleComponent from 'components/SscheduleComponent.vue';
import { useTimetabling } from 'src/hooks/timetabling.hooks';
import { ref } from 'vue';

export default defineComponent({
  name: 'TimetablingPage',
  components: { GscheduleComponent, SscheduleComponent },
  setup() {
    const selected_color = ref('rgb(0,0,0)');
    const {
      school_data,
      group_keys,
      year_keys,
      selected_year,
      selected_group,
      add_group,
      add_year,
      onSave,
      onClear,
      onChangeYear
    } = useTimetabling();
    return {
      school_data,
      group_keys,
      year_keys,
      selected_year,
      selected_group,
      selected_color,
      add_group,
      add_year,
      onSave,
      onClear,
      onChangeYear
    };
  }
});
</script>
