<template>
  <q-page class="row items-start justify-evenly q-pa-sm">
    <gschedule-component
      :sch="schedule"
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
      @add-subject="add_subject"
      @update-base="onUpdateBase"
      @update="school_data[selected_year].groups = $event"
      @update-color="($event) => (selected_color = $event)"
      @on-print="onPrint"
      @on-export="onExport"
      @on-import="onImport"
      class="page-break"
      v-if="!printing"
    >
      <template #bottom>
        <q-expansion-item
          v-model="expandedSubjects"
          class="q-mt-md"
          default-opened
          dense
          :label="`Profesores & Asignaturas - ${selected_group}`"
        >
          <acronym-table
            class="page-break"
            :subject-definitions="schedule.config.subjectsByProfessors"
            :selected_group="selected_group"
            :selected_year="selected_year"
            @change-subject="onChangeSubject"
          />
        </q-expansion-item>
      </template>
    </gschedule-component>

    <div id="printID" class="full-width page-break">
      <q-expansion-item
        v-model="expandedRooms"
        default-opened
        class="q-mt-md"
        dense
        :label="`Distribución de aulas ${selected_year}`"
      >
        <sschedule-component
          :rooms_school_data="school_data[selected_year].rooms"
          :sch="schedule"
          @update="school_data[selected_year].rooms = $event"
          @change-schedule="updateBaseSch"
        />
      </q-expansion-item>

      <div class="full-width" v-if="printing">
        <gschedule-component
          v-for="group in sch.config.groupsOptions"
          :key="`group-${group}`"
          :sch="sch"
          :school_data="school_data[selected_year].groups"
          :group_keys="group_keys"
          :year_keys="year_keys"
          :selected_group="group"
          :selected_year="selected_year"
          :selected_color="selected_color"
          @update-group="selected_group = $event"
          :readonly="true"
          class="full-height page-break"
        >
          <template #bottom>
            <acronym-table
              :subject-definitions="schedule.config.subjectsByProfessors"
              class="q-mt-md"
              :selected_group="group"
              :selected_year="selected_year"
              @change-subject="onChangeSubject"
            />
          </template>
        </gschedule-component>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import GscheduleComponent from 'components/base/component/BaseGscheduleComponent.vue';
import SscheduleComponent from 'components/base/component/BaseSscheduleComponent.vue';
import AcronymTable from 'components/base/component/BaseAcronymTableComponent.vue';
import { useScheduleTimetabling } from 'components/base/hooks/useTimetabling.hooks';
import { ref } from 'vue';

export default defineComponent({
  name: 'TimetablingPage',
  components: { GscheduleComponent, SscheduleComponent, AcronymTable },
  setup() {
    const selected_color = ref('rgb(0,0,0)');
    const printing = ref(false);
    const expandedSubjects = ref(true);
    const expandedRooms = ref(true);

    const {
      sch,
      school_data,
      group_keys,
      year_keys,
      selected_year,
      selected_group,
      schedule,
      updateBaseSch,
      add_group,
      add_year,
      add_subject,
      onSave,
      onClear,
      onChangeYear,
      onUpdateBase,
      onChangeBase,
      onExport,
      onImport,
      onChangeSubject
    } = useScheduleTimetabling();
    // const;
    return {
      sch,
      school_data,
      schedule,
      group_keys,
      year_keys,
      selected_year,
      selected_group,
      selected_color,
      printing,
      expandedSubjects,
      expandedRooms,

      updateBaseSch,
      onChangeBase,
      add_group,
      add_year,
      add_subject,
      onSave,
      onClear,
      onChangeYear,
      onUpdateBase,
      onExport,
      onImport,
      onChangeSubject,
      onPrint() {
        printing.value = true;
        nextTick(() => {
          const eApi = (window as any).myWindowAPI;
          if (eApi) {
            eApi?.print(sch.config.scheduleName || 'Horario', () => {
              printing.value = false;
            });
            return;
          }
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
    <title> ${sch.config.scheduleName || 'Horario'} ${selected_year.value}
    </title>
    ${stylesHtml}
  </head>
  <body>
    ${toPrint}
  </body>
</html>`);
          console.log(' >>>', WinPrint);

          WinPrint?.document.close();
          WinPrint?.focus();
          console.log('___', eApi);
          setTimeout(() => {
            (WinPrint as any).print();

            setTimeout(() => {
              WinPrint?.close();
              printing.value = false;
            }, 200);
          }, 200);
        });
      }
    };
  }
});
</script>
