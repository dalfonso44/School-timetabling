<template>
  <div class="q-pa-md full-width">
    <q-table
      :title="`Horario ${selectedGroup}`"
      :rows="groupData[selectedGroup]"
      :columns="columns"
      row-key="name"
      separator="cell"
      :pagination="{
        rowsPerPage: -1,
      }"
      hide-pagination
    >
      <template v-slot:top>
        <div class="row col-sm-6 col-12 items-center justify-start q-px-sm">
          Horario
          <q-select
            class="q-ml-md col-md-3 col-sm-4 col-12"
            outlined
            rounded
            dense
            :model-value="selectedGroup"
            @update:model-value="$emit('update-group', $event)"
            :options="groupKeys"
          >
            <template v-slot:selected>
              <q-badge
                v-if="selectedGroup"
                :style="`border-color: ${getColor(selectedGroup)}`"
                square
                outline
                text-color="dark"
                class="q-px-sm q-py-xs"
              >
                {{ selectedGroup }}
              </q-badge>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label :style="`color: ${getColor(scope.opt)}`">
                    {{ scope.opt }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            class="q-ml-md col-md-3 col-sm-4 col-12"
            outlined
            rounded
            dense
            :model-value="selectedYear"
            @update:model-value="$emit('update-year', $event)"
            :options="yearKeys"
            label="Año"
          />
        </div>

        <q-space />
        <div class="row col-sm-6 col-12 items-center justify-end q-px-sm">
          <q-btn
            color="primary"
            icon-right="archive"
            label="Salvar"
            no-caps
            rounded
            class="q-mr-md"
            @click="onSave"
          />
          <q-btn
            color="warning"
            icon-right="close"
            label="Limpiar"
            no-caps
            outline
            rounded
            @click="onClear"
          />
          <q-btn
            color="red"
            icon-right="star"
            label="Cargar"
            no-caps
            outline
            rounded
            @click="onLoad"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="turn"
            :props="props"
            :class="props.rowIndex == 3 && 'bg-grey-3'"
          >
            {{ props.row.turn }}
          </q-td>

          <q-td
            :props="props"
            v-for="item in fieldForEditing"
            :key="item"
            :class="props.rowIndex == 3 && 'bg-grey-3'"
            style="padding-bottom: 0 !important"
          >
            <q-input
              v-if="props.rowIndex != 3"
              type="text"
              dense
              borderless
              :model-value="props.row[item]"
              input-class="text-center"
              @update:model-value="onUpdate(props.rowIndex, item, $event)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { QTableColumn } from 'quasar';

const columns: QTableColumn[] = [
  { name: 'turn', align: 'center', field: 'turn', label: '' },
  { name: 'monday', align: 'center', label: 'Lunes', field: 'monday' },
  { name: 'tuesday', align: 'center', label: 'Martes', field: 'tuesday' },
  {
    name: 'wednesday',
    align: 'center',
    label: 'Miercoles',
    field: 'wednesday',
  },
  { name: 'thursday', align: 'center', label: 'Jueves', field: 'thursday' },
  { name: 'friday', align: 'center', label: 'Viernes', field: 'friday' },
];

const fieldForEditing = columns
  .filter((c) => c.name !== 'turn')
  .map((c) => c.name);

export default {
  props: {
    groupData: {
      type: Object,
      required: true,
    },
    groupKeys: {
      type: Array,
      required: true,
    },
    yearKeys: {
      type: Array,
      required: true,
    },
    selectedGroup: {
      type: String,
      required: true,
    },
    selectedYear: {
      type: String,
      required: true,
    },
  },
  emits: ['on-clear', 'on-save', 'update', 'update-group', 'update-year', 'on-load'],
  setup(props, { emit }) {
    return {
      columns,
      fieldForEditing,
      onSave() {
        emit('on-save');
        // timeTableData.saveData(rows.value);
      },
      onClear() {
        emit('on-clear');
        // rows.value = emptyState;
      },
      onLoad(){
        emit('on-load')
      },
      getColor(str: string) {
        str = str + str;
        var hash = 0;
        if (str.length === 0) return hash;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
          hash = hash & hash;
        }
        var rgb = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 255;
          rgb[i] = value;
        }
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      },
      onUpdate(row: number, column: string, value: any) {
        const newList = [
          ...props.groupData[props.selectedGroup].map((x: any) => ({ ...x })),
        ];
        newList[row][column] = value;
        emit('update', {
          ...props.groupData,
          [props.selectedGroup]: newList,
        });
      },
    };
  },
};
</script>
