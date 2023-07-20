<template>
  <div class="q-pa-md full-width">
    <q-table
      :title="`Horario ${selected_group}`"
      :rows="school_data[selected_group]"
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
            :model-value="selected_group"
            @update:model-value="$emit('update-group', $event)"
            :options="group_keys"
          >
            <template v-slot:selected>
              <q-badge
                v-if="selected_group"
                :style="`border-color: ${getColor(selected_group)}`"
                square
                outline
                text-color="dark"
                class="q-px-sm q-py-xs"
              >
                {{ selected_group }}
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
            :model-value="selected_year"
            @update:model-value="$emit('update-year', $event)"
            :options="year_keys"
            label="Año"
          />
        </div>

        <q-space />
        <div class="row col-sm-6 col-12 items-center justify-end q-px-sm">
          <q-btn
            color = "secondary"
            icon-right="palette"
            label="Color"
            no-caps
            rounded
            class="q-mr-sm"
            :style="`background-color: ${selected_color} !important  ;`"
            @click="card = true"
          />
          <q-dialog v-model="card">
            <q-card class="my-card">
              <div class="q-pa-md row items-start">
                <q-color
                  class="full-width"
                  :model-value="selected_color"
                  @update:model-value="
                    ($event) => $emit('update-color', $event)
                  "
                />
              </div>
              <q-separator />
              <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Seleccionar" />
                <q-btn v-close-popup flat color="primary" label="Cancelar" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-btn
            round
            dense
            :style="`color: ${selected_color} !important  ;`"
            :icon="editing ? 'edit' : 'format_color_fill'"
            @click="editing = !editing"
            class="q-mr-sm"
          ></q-btn>
          
          <q-btn
            color="secondary"
            icon-right="add"
            label="Nuevo horario"
            no-caps
            rounded
            class="q-mr-sm"
            @click="show_new_year = true"
          />
          <q-btn
            color="accent"
            icon-right="add_circle"
            label="Nuevo grupo"
            no-caps
            rounded
            class="q-mr-sm"
            @click="show_new_group = true"
          />
          <q-btn
            color="primary"
            icon-right="archive"
            label="Salvar"
            no-caps
            rounded
            class="q-mr-sm"
            @click="onSave"
          />
          <q-btn
            color="warning"
            icon-right="close"
            label="Limpiar"
            no-caps
            outline
            rounded
            class = "q-mr-sm"
            @click="onClear"
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
            :class="{
              'bg-grey-3': props.rowIndex==3,
              'cursor-pointer': !editing,
              'text-white': !!props.row[`${item}_custom_color`],
              }"
            :style="
              !!props.row[`${item}_custom_color`] &&
              `background-color: ${props.row[`${item}_custom_color`]}`"
            style="padding-bottom: 0 !important"
            @click="!editing && onPaint(props.rowIndex, item)"
          >
            <q-input
              v-if="props.rowIndex != 3"
              type="text"
              dense
              :readonly="!editing"
              borderless
              :maxlength="6"
              :model-value="props.row[item]"
              :class="{
                'cursor-pointer': !editing,
              }"
              :input-class="`text-center text-${
                props.row[`${item}_custom_color`] ? 'white' : 'dark'
              }`"
              @update:model-value="onUpdate(props.rowIndex, item, $event)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <input-dialog
      :title="'Crea un nuevo horario'"
      :label="'Nombre'"
      @on-next="$emit('create-year', $event)"
      :show="show_new_year"
      @on-close="show_new_year = false"
    />

    <input-dialog
      :title="'Crea un nuevo grupo'"
      :label="'Grupo'"
      :show="show_new_group"
      @on-next="$emit('create-group', $event)"
      @on-close="show_new_group = false"
    />
  </div>
</template>

<script lang="ts">
import InputDialog from './dialogs/InputDialog.vue';
import { ref } from 'vue';
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
    school_data: {
      type: Object,
      required: true,
    },
    group_keys: {
      type: Array,
      required: true,
    },
    year_keys: {
      type: Array,
      required: true,
    },
    selected_group: {
      type: String,
      required: true,
    },
    selected_year: {
      type: String,
      required: true,
    },
    selected_color:{
      type: String,
      required: true,
    },
  },
  components: { InputDialog },
  emits: [
    'on-clear',
    'on-save',
    'update',
    'update-group',
    'update-year',
    'create-year',
    'create-group',
    'update-color',
    
  ],
  setup(props, { emit }) {
    const showNewTime = ref(false);
    const showNewGroup = ref(false);
    const editing = ref(true)

    return {
      card:ref(false),
      editing,
      show_new_year: showNewTime,
      show_new_group: showNewGroup,
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
          ...props.school_data[props.selected_group].map((x: any) => ({ ...x })),
        ];
        newList[row][column] = value;
        emit('update', {
          ...props.school_data,
          [props.selected_group]: newList,
        });
      },
      onPaint(row: number, column: string){
        const newList = [
          ...props.school_data[props.selected_group].map((x:any) => ({...x})),
        ];
        newList[row][`${column}_custom_color`] = props.selected_color;
        emit('update', {
          ...props.school_data,
          [props.selected_group]:newList,
        });
      },
    };
  },
};
</script>
