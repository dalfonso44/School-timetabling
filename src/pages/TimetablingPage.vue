<template>
  <q-page class="row items-center justify-evenly">
    <timetabling-component
      :selectedColor="selectedColor"
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
<<<<<<< Updated upstream
      @on-load = "onLoad"
=======
      @create-year="addYear"
      @create-group="addGroup"
      @on-paint = "onPaint"
      @update-color="$event => selectedColor = $event"
>>>>>>> Stashed changes
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
    const selectedColor = 'rgb(0,0,0)'
    const {
      groupData,
      groupKeys,
      selectedGroup,
      selectedYear,
      yearKeys,
      addGroup,
      onSave,
      onClear,
      onLoad,
    } = useTimetabling();
    return {
      groupData,
      groupKeys,
      selectedGroup,
      selectedYear,
      yearKeys,
<<<<<<< Updated upstream
      addGroup,
      onSave,
      onClear,
      onLoad,
=======
      selectedColor,
      onChangeYear,
      addGroup,
      onSave,
      onClear,
      addYear,
      onPaint(){
        console.log("aaaa")
      },
>>>>>>> Stashed changes
    };
  },
});
</script>
