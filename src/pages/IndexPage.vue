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
      @on-save="onSave"
      @on-clear="onClear"
      @create-year="add_year"
      @create-group="add_group"
      @update-base="onUpdateBase"
      @update="school_data[selected_year].groups = $event"
      @update-color="($event) => (selected_color = $event)"
      @on-print="onPrint"
    />
    <div id="printID" class="full-width">
      <sschedule-component
        :rooms_school_data="school_data[selected_year].rooms"
        :sch="sch"
        @update="school_data[selected_year].rooms = $event"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GscheduleComponent from 'components/base/component/BaseGscheduleComponent.vue';
import SscheduleComponent from 'components/base/component/BaseSscheduleComponent.vue';
import { useScheduleTimetabling } from 'components/base/hooks/useTimetabling.hooks';
import { ref } from 'vue';

export default defineComponent({
  name: 'TimetablingPage',
  components: { GscheduleComponent, SscheduleComponent },
  setup() {
    const selected_color = ref('rgb(0,0,0)');
    const {
      sch,
      school_data,
      group_keys,
      year_keys,
      selected_year,
      selected_group,
      add_group,
      add_year,
      onSave,
      onClear,
      onChangeYear,
      onUpdateBase
    } = useScheduleTimetabling();

    // const;
    return {
      sch,
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
      onChangeYear,
      onUpdateBase,
      onPrint() {
        const toPrint = document.getElementById('printID')?.innerHTML;
        let stylesHtml = '';
        document
          .querySelectorAll('link[rel="stylesheet"], style')
          .forEach((value) => {
            stylesHtml += value.outerHTML;
          });

        // Open the print window
        const WinPrint = window.open(
          '',
          '',
          'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
        );

        WinPrint?.document.write(`<!DOCTYPE html>
<html>
  <head>
    ${stylesHtml}
  </head>
  <body>
    ${toPrint}
  </body>
</html>`);

        WinPrint?.document.close();
        WinPrint?.focus();
        WinPrint?.print();
      }
    };
  }
});
</script>
