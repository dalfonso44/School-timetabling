<template>
  <q-page class="row items-center justify-evenly">
    <timetabling-component
      :groupData="groupData[selectedYear].groups"
      :groupKeys="groupKeys"
      :yearKeys="yearKeys"
      :selectedGroup="selectedGroup"
      :selectedYear="selectedYear"
      @update-group="selectedGroup = $event"
      @update-year="selectedYear = $event"
      @update="groupData[selectedYear].groups = $event"
      @on-save="onSave"
      @on-clear="onClear"
    />
    <school-component
      :schoolData="groupData[selectedYear].rooms"
      @update="groupData[selectedYear].rooms = $event"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimetablingComponent from 'components/TimetablingComponent.vue';
import SchoolComponent from 'components/SchoolComponent.vue';
import { useTimetabling } from 'src/hooks/timetabling.hooks';
export default defineComponent({
  name: 'TimetablingPage',
  components: { TimetablingComponent, SchoolComponent },
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
    } = useTimetabling();
    return {
      groupData,
      groupKeys,
      selectedGroup,
      selectedYear,
      yearKeys,
      addGroup,
      onSave,
      onClear,
    };
  },
});
</script>
