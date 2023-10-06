<template>
  <div class="q-pa-md full-width">
    <q-table
      style="max-width: 100%"
      class="my-custom-table"
      :rows="rooms_school_data"
      row-key="name"
      :columns="columns"
      separator="cell"
      :pagination="{
        rowsPerPage: -1
      }"
      hide-pagination
    >
      <template v-slot:header>
        <q-tr>
          <q-th colspan="1"></q-th>
          <template
            :key="days"
            v-for="(days, index) in $props.sch.config.daysOptions"
          >
            <q-th colspan="6" :class="colors[index]">{{ days }}</q-th>
            <!-- :style="`background-color: red`" -->
          </template>
        </q-tr>
        <q-tr>
          <q-th colspan="1"></q-th>
          <template
            :key="days"
            v-for="(days, index) in $props.sch.config.daysOptions"
          >
            <template
              :key="turn"
              v-for="turn in $props.sch.config.hoursOptions"
            >
              <template v-if="turn != `Receso`">
                <q-th colspan="1" :class="colors[index]"> {{ turn }} </q-th>
              </template>
            </template>
          </template>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="turn" :props="props">
            {{ props.row.turn }}
          </q-td>

          <q-td :key="item" :props="props" v-for="item in dotDaysXHours">
            <!-- <q-input
              type="text"
              :style="`width: ${
                props.row[item] && props.row[item].length > 3 ? '50px' : '100%'
              } !important; margin: auto !important`"
              :model-value="props.row[item]"
              @update:model-value="onUpdate(props.rowIndex, item, $event)"
              dense
            /> -->
            <!-- <span v-html="props.row[item]"></span> -->
            <template
              v-for="(sch, i) in props.row[item] || []"
              :key="`badge-${i}-${item}`"
            >
              <q-badge
                :style="`border-color: ${getColor(sch.group)}`"
                square
                outline
                text-color="dark"
                :class="`q-px-sm q-py-xs ${i != 0 && 'q-mt-xs'}`"
              >
                {{ sch.group }}
                <q-tooltip
                  class="text-white font-subtitle1"
                  :style="`background-color: ${getColor(sch.group)}`"
                >
                  {{ getVerbose(sch) }}
                </q-tooltip>
              </q-badge>
              <br />
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { getColor } from '../hooks/utils.hooks';
import { getVerbose } from '../hooks/useSchedule.hooks';
import { QTableColumn } from 'quasar';

const colors: string[] = [
  'bg-teal-9 text-white',
  'bg-deep-orange-9 text-white',
  'bg-light-blue-9 text-white',
  'bg-purple-5 text-white',
  'bg-pink-13 text-white'
];

const columns: QTableColumn[] = [
  { name: 'turn', align: 'center', field: 'turn', label: '' },
  { name: 'monday1', align: 'center', label: '1', field: 'monday1' },
  { name: 'monday2', align: 'center', label: '2', field: 'monday2' },
  { name: 'monday3', align: 'center', label: '3', field: 'monday3' },
  { name: 'monday4', align: 'center', label: '4', field: 'monday4' },
  { name: 'monday5', align: 'center', label: '5', field: 'monday5' },
  { name: 'monday6', align: 'center', label: '6', field: 'monday6' },
  { name: 'tuesday1', align: 'center', label: '1', field: 'tuesday1' },
  { name: 'tuesday2', align: 'center', label: '2', field: 'tuesday2' },
  { name: 'tuesday3', align: 'center', label: '3', field: 'tuesday3' },
  { name: 'tuesday4', align: 'center', label: '4', field: 'tuesday4' },
  { name: 'tuesday5', align: 'center', label: '5', field: 'tuesday5' },
  { name: 'tuesday6', align: 'center', label: '6', field: 'tuesday6' },
  { name: 'wednesday1', align: 'center', label: '1', field: 'wednesday1' },
  { name: 'wednesday2', align: 'center', label: '2', field: 'wednesday2' },
  { name: 'wednesday3', align: 'center', label: '3', field: 'wednesday3' },
  { name: 'wednesday4', align: 'center', label: '4', field: 'wednesday4' },
  { name: 'wednesday5', align: 'center', label: '5', field: 'wednesday5' },
  { name: 'wednesday6', align: 'center', label: '6', field: 'wednesday6' },
  { name: 'thursday1', align: 'center', label: '1', field: 'thursday1' },
  { name: 'thursday2', align: 'center', label: '2', field: 'thursday2' },
  { name: 'thursday3', align: 'center', label: '3', field: 'thursday3' },
  { name: 'thursday4', align: 'center', label: '4', field: 'thursday4' },
  { name: 'thursday5', align: 'center', label: '5', field: 'thursday5' },
  { name: 'thursday6', align: 'center', label: '6', field: 'thursday6' },
  { name: 'friday1', align: 'center', label: '1', field: 'friday1' },
  { name: 'friday2', align: 'center', label: '2', field: 'friday2' },
  { name: 'friday3', align: 'center', label: '3', field: 'friday3' },
  { name: 'friday4', align: 'center', label: '4', field: 'friday4' },
  { name: 'friday5', align: 'center', label: '5', field: 'friday5' },
  { name: 'friday6', align: 'center', label: '6', field: 'friday6' }
];

const fieldForEditing = columns
  .filter((c) => c.name !== 'turn')
  .map((c) => c.name);

export default {
  props: {
    rooms_school_data: {
      type: Array,
      required: true
    },
    sch: {
      type: Object,
      required: true
    }
  },

  emits: ['update'],
  setup(props, { emit }) {
    const dotDaysXHours = props.sch.config.daysOptions
      .map((day: string) => {
        return props.sch.config.hoursOptions
          .filter((hour: string) => hour != 'Receso')
          .map((hour: string) => day + hour);
      })
      .reduce((prev: string, curr: string) => [...prev, ...curr], []);

    return {
      getVerbose,
      getColor,
      colors,
      dotDaysXHours,
      columns,

      onUpdate(row: number, column: string, value: any) {
        const newList = [
          ...props.rooms_school_data.map((x: any) => ({ ...x }))
        ];
        newList[row][column] = value;
        emit('update', newList);
      }
    };
  }
};
</script>
