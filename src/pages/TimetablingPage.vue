<template>
  <q-page class="row items-center justify-evenly">
    <timetabling-component
      :groupData="groupData[selectedYear].groups"
      :groupKeys="groupKeys"
      :yearKeys="yearKeys"
      :selectedGroup="selectedGroup"
      :selectedYear="selectedYear"
      :selectedColor = "selectedColor"
      @update-group="selectedGroup = $event"
      @update-year="onChangeYear"
      @update="groupData[selectedYear].groups = $event"
      @on-save="onSave"
      @on-clear="onClear"
      @create-year="addYear"
      @create-group="addGroup"
      @on-paint = "onPaint"
      @update-color="$event => selectedColor = $event"
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
import {ref} from 'vue';
export default defineComponent({
  name: 'TimetablingPage',
  components: { TimetablingComponent, SchoolComponent },
  setup() {
    const selectedColor = ref('rgb(0,0,0)')
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
      selectedColor,
      yearKeys,
      onChangeYear,
      addGroup,
      onSave,
      onClear,
      addYear,
      onPaint(){
        console.log(selectedColor)
      },
    };
  },
});
</script>
