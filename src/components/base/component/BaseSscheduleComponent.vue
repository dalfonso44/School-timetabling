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
            <q-th
              colspan="6"
              :class="'text-white'"
              :style="`background-color: ${getColorIndex(index)}`"
              >{{ days }}</q-th
            >
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
                <q-th
                  colspan="1"
                  :class="'text-white'"
                  :style="`background-color: ${getColorIndex(index)}`"
                >
                  {{ turn }}
                </q-th>
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

    console.log(dotDaysXHours);

    const columns: QTableColumn[] = [
      { name: 'turn', align: 'center', field: 'turn', label: '' },
      ...dotDaysXHours.map((dot: string) => ({
        name: dot,
        align: 'center',
        field: dot
      }))
    ];

    const toBin = (x: number): string => {
      if (x == 0) return '0';
      if (x % 2) return `1${toBin((x - 1) / 2)}`;
      return `0${toBin(x / 2)}`;
    };

    return {
      getVerbose,
      getColor,
      dotDaysXHours,
      columns,
      getColorIndex(index: number) {
        return getColor(`-${index}${toBin(index)}`);
      },
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
