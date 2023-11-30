<template>
  <div class="full-width">
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
          <template :key="days" v-for="(days, index) in sch.config.daysOptions">
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
          <template :key="days" v-for="(days, index) in sch.config.daysOptions">
            <template :key="turn" v-for="turn in sch.config.hoursOptions">
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

          <q-td
            :key="item"
            :props="props"
            v-for="item in dotDaysXHours"
            :style="
              props.row[item] && props.row[item].length > 0
                ? `background-color: ${getColor(
                    props.row[item][0].group.substring(0, 2),
                    0.75
                  )}`
                : ''
            "
            dropzone
            :id="`td-${item}`"
            @drop="onDrop($event, item, props.rowIndex)"
            @dragover="$event.preventDefault()"
          >
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
              v-for="(base, i) in props.row[item] || []"
              :key="`badge-${i}-${item}`"
            >
              <q-badge
                :style="`border-color: white`"
                square
                outline
                text-color="white"
                :class="`q-px-sm q-py-xs ${i != 0 && 'q-mt-xs'}`"
              >
                <div
                  :id="`drag-${i}-${item}`"
                  class="cursor-pointer"
                  draggable="true"
                  @dragstart="startDrag($event, base)"
                >
                  {{ base.group }}
                </div>
                <q-tooltip
                  class="text-white font-subtitle1"
                  :style="`background-color: ${getColor(base.group)}`"
                >
                  {{ getVerbose(base) }}
                  <br />
                  {{ !base.cp ? 'c' : 'cp' }}:
                  {{
                    base.subject
                      ? sch.config.subjectsByProfessors[base.year][base.group][
                          base.subject
                        ].professors[!base.cp ? 'c' : 'cp']
                      : ''
                  }}
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
import { BaseSchedule, Dictionary, Schedule } from '../models/basic';
import { PropType, ref } from 'vue';

export default {
  props: {
    rooms_school_data: {
      type: Array,
      required: true
    },
    sch: {
      type: Object as PropType<Schedule>,
      required: true
    }
  },

  emits: ['update', 'change-schedule'],
  setup(props, { emit }) {
    const dotDaysXHours = props.sch.config.daysOptions
      .map((day: string) => {
        return props.sch.config.hoursOptions
          .filter((hour: string) => hour != 'Receso')
          .map((hour: string) => `${day}-${hour}`);
      })
      .reduce((prev, curr) => [...prev, ...curr], []);

    const columns: QTableColumn[] = [
      { name: 'turn', align: 'center', field: 'turn', label: '' },
      ...dotDaysXHours.map(
        (dot) =>
          ({
            name: dot,
            align: 'center',
            label: dot,
            field: dot
          } as QTableColumn)
      )
    ];

    const toBin = (x: number): string => {
      if (x == 0) return '0';
      if (x % 2) return `1${toBin((x - 1) / 2)}`;
      return `0${toBin(x / 2)}`;
    };

    const moveSch = ref({} as BaseSchedule);

    const startDrag = (ev: any, sch: BaseSchedule) => {
      moveSch.value = sch;
    };

    const onDrop = (ev: any, place: string, row_index: number) => {
      const [day, hour] = place.split('-');
      const bs = moveSch.value;
      const id = `${bs.year}-${bs.hour}-${bs.group}-${bs.day}`;
      emit('change-schedule', id, {
        ...bs,
        day: day,
        room: (row_index + 1).toString(),
        hour: hour
      });

      // const clone = (props.rooms_school_data[row_index] as Dictionary<[]>)[
      //   place
      // ] as any[];
      // clone.push(moveSch.value);
    };

    return {
      getVerbose,
      getColor,
      dotDaysXHours,
      columns,
      startDrag,
      onDrop,
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
