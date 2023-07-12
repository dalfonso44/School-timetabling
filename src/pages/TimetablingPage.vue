<template>
  <q-page class="row items-center justify-evenly">
    <gschedule-component
      :groupData="groupData[selectedYear].groups"
      :groupKeys="groupKeys"
      :yearKeys="yearKeys"
      :selectedGroup="selectedGroup"
      :selectedYear="selectedYear"
      @update-group="selectedGroup = $event"
      @update-year="onChangeYear"
      @update="groupData[selectedYear].groups = $event"
      @on-save="onSave"
      @on-clear="onClear"
      @create-year="addYear"
      @create-group="addGroup"
    />
    <sschedule-component
      :schoolData="groupData[selectedYear].rooms"
      @update="groupData[selectedYear].rooms = $event"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GscheduleComponent from 'components/GscheduleComponent.vue';
import SscheduleComponent from 'components/SscheduleComponent.vue';
import { useTimetabling } from 'src/hooks/timetabling.hooks';
export default defineComponent({
  name: 'TimetablingPage',
  components: { GscheduleComponent, SscheduleComponent },
  setup() {
    const {
      groupData,
      groupKeys,
      selectedGroup,
      selectedYear,
      yearKeys,
      addGroup,
      onSave,
      onClear,
      addYear,
      onChangeYear,
    } = useTimetabling();
    return {
      groupData,
      groupKeys,
      selectedGroup,
      selectedYear,
      yearKeys,
      onChangeYear,
      addGroup,
      onSave,
      onClear,
      addYear,
    };
  },
});
</script>
