<template>
  <div class="full-width">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="abb"
      separator="cell"
      :pagination="{
        rowsPerPage: -1
      }"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="abb" :props="props">
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              size="sm"
              @click="removeRow(rows[props.rowIndex].abb)"
            />
            {{ rows[props.rowIndex].abb }}
          </q-td>
          <q-td key="name" :props="props">
            <q-input
              :model-value="rows[props.rowIndex].name"
              type="text"
              dense
              :key="`${props.rowIndex}-name`"
              borderless
              hide-bottom-space
              lazy-rules
              :input-class="`text-center`"
              @update:model-value="changeName(props.row.abb, $event)"
            />
          </q-td>

          <q-td key="ctch" :props="props">
            <q-input
              :model-value="rows[props.rowIndex].ctch"
              type="textarea"
              autogrow
              dense
              :key="`${props.rowIndex}-ctch`"
              borderless
              hide-bottom-space
              lazy-rules
              :input-class="`text-center`"
              @update:model-value="changeCtch(props.row.abb, $event, 'c')"
            />
          </q-td>
          <q-td key="cptch" :props="props">
            <q-input
              :model-value="rows[props.rowIndex].cptch"
              type="textarea"
              autogrow
              dense
              :key="`${props.rowIndex}-cptch`"
              borderless
              hide-bottom-space
              lazy-rules
              :input-class="`text-center`"
              @update:model-value="changeCtch(props.row.abb, $event, 'cp')"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { PropType, computed, ref } from 'vue';
import {
  BaseSchedule,
  Dictionary,
  Schedule,
  SubjectDefinition
} from '../models/basic';
import { QTableColumn } from 'quasar';

export default {
  name: 'BaseAcronymTableComponent',
  emits: ['change-subject', 'delete-subject'],
  props: {
    subjectDefinitions: {
      type: Object as PropType<
        Dictionary<Dictionary<Dictionary<SubjectDefinition>>>
      >,
      required: true
    },
    selected_group: {
      type: String,
      required: true
    },
    selected_year: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const fields = ref([]);
    const columns: QTableColumn[] = [
      { name: 'abb', align: 'center', field: 'abb', label: 'Abreviatura' },
      { name: 'name', align: 'center', field: 'name', label: 'Nombre' },
      { name: 'ctch', align: 'center', field: 'ctch', label: 'Conferencia' },
      {
        name: 'cptch',
        align: 'center',
        field: 'cptch',
        label: 'Clase Práctica'
      }
    ];

    const rows = computed(() => {
      return Object.entries(
        props.subjectDefinitions[props.selected_year][props.selected_group] ||
          {}
      ).map(([abb, def]) => {
        return {
          abb: abb,
          name: def.name,
          ctch: def.professors.c.reduce((prev, curr, index) => {
            if (curr.length > 0)
              return (
                prev +
                curr +
                (index == def.professors.c.length - 1 ? ';' : '; ')
              );
            return prev;
          }, ''),
          cptch: def.professors.cp.reduce((prev, curr, index) => {
            if (curr.length > 0)
              return (
                prev +
                curr +
                (index == def.professors.cp.length - 1 ? ';' : '; ')
              );
            return prev;
          }, '')
        };
      });
    });
    return {
      columns,
      rows,
      fields,
      changeCtch(key: string, value: any, upkey: 'c' | 'cp') {
        value = value.trim();
        const li = value.trim().split(';');
        if (
          value.length > 1 &&
          value[value.length - 1] == ';' &&
          li.length > 0 &&
          !li[li.length - 1]
        ) {
          const payload: SubjectDefinition = {
            ...props.subjectDefinitions[props.selected_year][
              props.selected_group
            ][key]
          };
          payload.professors[upkey] = li
            .map((y: string) => y.trim())
            .filter((x: string) => !!x);
          emit('change-subject', key, payload);
        }
      },
      changeName(key: string, value: any) {
        emit('change-subject', key, {
          ...props.subjectDefinitions[props.selected_year][
            props.selected_group
          ][key],
          name: value
        });
      },
      removeRow(key: string) {
        emit('delete-subject', key, {
          ...props.subjectDefinitions[props.selected_year][
            props.selected_group
          ][key]
        });
      }
    };
  }
};
</script>
