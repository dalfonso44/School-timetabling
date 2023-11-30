<template>
  <div class="full-width">
    <q-table
      :title="`Horario ${selected_group}`"
      :rows="school_data[selected_group]"
      :columns="columns"
      row-key="name"
      separator="cell"
      :pagination="{
        rowsPerPage: -1
      }"
      hide-pagination
    >
      <template v-slot:top v-if="!readonly">
        <div
          class="row col-sm-6 col-md-5 col-lg-4 col-12 items-center justify-start q-px-sm"
        >
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
            :class="`q-ml-md col-md-4 col-sm-4 col-12 ${
              $q.screen.xs && 'q-mt-sm'
            }`"
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
        <div
          :class="`row col-sm-6 col-md-7 col-lg-8 col-12 items-center justify-end q-px-sm ${
            $q.screen.xs && 'q-pt-sm'
          }`"
        >
          <q-btn
            color="secondary"
            :label="!$q.screen.lt.lg ? 'Color' : undefined"
            no-caps
            :rounded="!$q.screen.xs"
            :round="$q.screen.lt.lg"
            icon="palette"
            dense
            class="q-mr-sm"
            :style="`background-color: ${selected_color} !important  ;`"
            @click="card = true"
          >
            <q-tooltip
              class="text-white"
              :style="`background-color: ${selected_color} !important  ;`"
            >
              Color
            </q-tooltip>
          </q-btn>
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
            icon="print"
            dense
            round
            color="primary"
            class="q-mr-sm"
            @click="$emit('on-print')"
          ></q-btn>

          <q-btn
            color="secondary"
            :round="$q.screen.lt.lg"
            icon="add"
            :label="!$q.screen.lt.lg ? 'Nuevo horario' : undefined"
            no-caps
            rounded
            dense
            class="q-mr-sm"
            @click="show_new_year = true"
          >
            <q-tooltip class="bg-secondary text-white">
              Nuevo horario
            </q-tooltip>
          </q-btn>
          <q-btn
            color="accent"
            icon="add_circle"
            :round="$q.screen.lt.lg"
            :label="!$q.screen.lt.lg ? 'Nuevo grupo' : undefined"
            no-caps
            rounded
            dense
            class="q-mr-sm"
            @click="show_new_group = true"
          >
            <q-tooltip class="bg-accent text-white"> Nuevo grupo </q-tooltip>
          </q-btn>

          <q-btn
            color="blue-10"
            icon="note_add"
            :round="$q.screen.lt.lg"
            :label="!$q.screen.lt.lg ? 'Agregar asignatura' : undefined"
            dense
            no-caps
            rounded
            class="q-mr-sm"
            @click="show_new_subject = true"
          >
            <q-tooltip class="bg-blue-10 text-white">
              Agregar asignatura
            </q-tooltip>
          </q-btn>

          <q-btn
            color="info"
            icon="cloud_upload"
            :round="$q.screen.lt.lg"
            :label="!$q.screen.lt.lg ? 'Exportar' : undefined"
            no-caps
            dense
            rounded
            class="q-mr-sm"
            @click="onExport"
          >
            <q-tooltip class="bg-info text-white"> Exportar </q-tooltip>
          </q-btn>
          <q-btn
            color="positive"
            icon="cloud_download"
            :round="$q.screen.lt.lg"
            :label="!$q.screen.lt.lg ? 'Importar' : undefined"
            dense
            no-caps
            rounded
            class="q-mr-sm"
            @click="alert = true"
          >
            <q-tooltip class="bg-positive text-white"> Importar </q-tooltip>
          </q-btn>
          <q-dialog v-model="alert">
            <q-card>
              <q-card-section>
                <div class="text-h6">Selecciona el archivo</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-file color="teal" filled v-model="importFile">
                  <template v-slot:prepend>
                    <q-icon name="cloud_download" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop.prevent="importFile = null"
                      class="cursor-pointer"
                    />
                  </template>
                </q-file>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  @click="alert = false"
                  v-close-popup
                />

                <q-btn
                  flat
                  label="OK"
                  color="primary"
                  :disabled="!importFile"
                  @click="onImport()"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-btn
            color="orange"
            icon="settings"
            :round="$q.screen.lt.lg"
            :label="!$q.screen.lt.lg ? 'Configuraciones' : undefined"
            no-caps
            outline
            dense
            rounded
            class="q-mr-sm"
            @click="onConfig"
          >
            <q-tooltip class="bg-orange text-white">
              Configuraciones
            </q-tooltip>
          </q-btn>

          <!-- <q-btn
            color="primary"
            icon="archive"
            :round="$q.screen.lt.lg"
            :label="!$q.screen.lt.lg ? 'Salvar' : undefined"
            dense
            no-caps
            rounded
            class="q-mr-sm"
            @click="onSave"
          >
            <q-tooltip class="bg-primary text-white"> Salvar </q-tooltip>
          </q-btn> -->
          <q-btn
            color="warning"
            icon="close"
            :round="$q.screen.lt.lg"
            :label="!$q.screen.lt.lg ? 'Limpiar' : undefined"
            no-caps
            outline
            dense
            rounded
            class="q-mr-sm"
            @click="onClear"
          >
            <q-tooltip class="bg-warning text-white"> Limpiar </q-tooltip>
          </q-btn>
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
            v-for="(item, j) in sch.config.daysOptions"
            :key="item"
            :class="{
              'bg-grey-3': props.rowIndex == 3,
              'cursor-pointer': !editing,
              'text-white': !!props.row[`${item}_custom_color`]
            }"
            :style="
              !!props.row[`${item}_custom_color`] &&
              `background-color: ${props.row[`${item}_custom_color`]}`
            "
            @keyup.ctrl.stop="onkeydown"
            style="padding-bottom: 0 !important"
            @click="!editing && onPaint(props.rowIndex, item)"
          >
            <q-input
              v-if="props.rowIndex != 3 && !readonly"
              type="text"
              dense
              :ref="(field) => (fields[props.rowIndex][j] = field)"
              :key="`${props.rowIndex}${item}`"
              @focus="onfocus(props.rowIndex, j)"
              :readonly="!editing"
              borderless
              hide-bottom-space
              lazy-rules
              :model-value="props.row[item]"
              :class="{
                'cursor-pointer': !editing
              }"
              :input-class="`text-center`"
              :rules="[verifyVerbose]"
              @update:model-value="onUpdate(props.rowIndex, item, $event)"
            />
            <p v-else-if="readonly && props.rowIndex != 3">
              {{ props.row[item] }}
            </p>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <input-dialog
      :title="'Crea un nuevo horario'"
      :label="'Nombre'"
      :rules="[correctFormat]"
      @on-next="$emit('create-year', $event)"
      :show="show_new_year"
      @on-close="show_new_year = false"
    />

    <input-dialog
      :title="'Crea un nuevo grupo'"
      :label="'Grupo'"
      :rules="[(val) => !!val || 'Campo requerido']"
      :show="show_new_group"
      @on-next="$emit('create-group', $event)"
      @on-close="show_new_group = false"
    />

    <input-dialog
      :title="'Agrega una nueva asignatura'"
      :label="'Asignatura'"
      :rules="[(val) => !!val || 'Campo requerido']"
      :show="show_new_subject"
      @on-next="$emit('add-subject', $event)"
      @on-close="show_new_subject = false"
    />
  </div>
</template>

<script lang="ts">
import InputDialog from '../../dialogs/InputDialog.vue';
import { ref } from 'vue';
import { QTableColumn } from 'quasar';
import { getColor } from '../hooks/utils.hooks';
import { useRouter } from 'vue-router';
import { Dialog } from 'quasar';

export default {
  props: {
    readonly: {
      type: Boolean
    },
    sch: {
      type: Object,
      required: true
    },
    school_data: {
      type: Object,
      required: true
    },
    group_keys: {
      type: Array,
      required: true
    },
    year_keys: {
      type: Array,
      required: true
    },
    selected_group: {
      type: String,
      required: true
    },
    selected_year: {
      type: String,
      required: true
    },
    selected_color: {
      type: String,
      required: true
    }
  },
  components: { InputDialog },
  emits: [
    'on-clear',
    'on-save',
    'update',
    'update-base',
    'update-group',
    'update-year',
    'create-year',
    'create-group',
    'add-subject',
    'update-color',
    'on-print',
    'on-export',
    'on-import'
  ],
  setup(props, { emit }) {
    const showNewTime = ref(false);
    const showNewGroup = ref(false);
    const showNewSubject = ref(false);
    const editing = ref(true);
    const importFile = ref(null);

    const router = useRouter();

    const correctFormat = (val: string) => {
      const value = val.trim().split(' ');
      if (value.length == 2 && (value[1] == 's1' || value[1] == 's2')) {
        const v = value[0].split('-');
        if (!isNaN(Number(v[0])) && v[0].length == 4) return true;
        if (v.length == 2 && !isNaN(Number(v[1])) && v[1].length == 4)
          return true;
      }
      return 'Formato incorrecto';
    };

    // Wxample of how to use vue-router for change the route inside the setup logic
    // router.push('/config');

    const columns: QTableColumn[] = [
      { name: 'turn', align: 'center', field: 'turn', label: '' },
      ...props.sch.config.daysOptions.map((day: string) => ({
        name: day,
        align: 'center',
        field: day,
        label: day
      }))
    ];

    const verifyVerbose = (value: string) => {
      if (!value) return true;
      const ERROR_MSG = 'Formato incorrecto';
      const valueClean = value.trimStart();
      const spl = valueClean.split(' ');
      console.log(' hereeeeeeeeeeeee', `|${value}|`, spl);

      if (spl.length == 1) {
        if (props.sch.config.subjectsWithoutRooms.includes(spl[0])) return true;
        return ERROR_MSG;
      }

      if (spl.length < 3) return ERROR_MSG;

      if (spl.length >= 3) {
        if ((spl[1] != 'cp' && spl[1] != 'c') || !spl[2]) return ERROR_MSG;
      }

      if (spl.length > 3) {
        const io = valueClean.indexOf('(');
        const ic = valueClean.indexOf(')');
        console.log(' --->', io, ic, spl, valueClean);
        if (io >= 0 && ic >= 0 && io < ic && ic == valueClean.length - 1)
          return true;

        return ERROR_MSG;
      }
      //ToDO> change here
      return true;
      // return 'Campo incompleto';
      // if (spl[1] != 'cp' && spl[1] != 'c') return 'Formato incorrecto';
    };

    const fields = ref(
      props.school_data[props.selected_group].map(() =>
        props.sch.config.daysOptions.map(() => null)
      )
    );
    const indexFocus = ref([0, 0]);
    console.log('>>>|', fields);
    return {
      fields,
      indexFocus,
      alert: ref(false),
      card: ref(false),
      editing,
      importFile,
      verifyVerbose,
      correctFormat,
      show_new_year: showNewTime,
      show_new_group: showNewGroup,
      show_new_subject: showNewSubject,
      columns,
      onkeydown(event: any) {
        console.log('>>>', event);
        console.log(':::', fields.value);
        const n = props.school_data[props.selected_group].length;
        const m = props.sch.config.daysOptions.length;
        if (
          event.code === 'ArrowRight' &&
          !(indexFocus.value[0] == n - 1 && indexFocus.value[1] == m - 1)
        ) {
          indexFocus.value[1] += 1;
        }
        if (
          event.code === 'ArrowLeft' &&
          !(indexFocus.value[0] == 0 && indexFocus.value[1] == 0)
        ) {
          indexFocus.value[1] -= 1;
        }
        if (indexFocus.value[1] >= m) {
          indexFocus.value[0] += 1;
          indexFocus.value[1] = 0;
        }
        if (indexFocus.value[1] < 0) {
          indexFocus.value[0] -= 1;
          indexFocus.value[1] = m - 1;
        }
        if (indexFocus.value[0] == 3) {
          if (indexFocus.value[1] == 0) indexFocus.value[0] += 1;
          else indexFocus.value[0] -= 1;
        }
        if (event.code === 'ArrowUp' && !(indexFocus.value[0] == 0)) {
          indexFocus.value[0] -= 1;
          if (indexFocus.value[0] == 3) indexFocus.value[0] -= 1;
        }
        if (event.code === 'ArrowDown' && !(indexFocus.value[0] == n - 1)) {
          indexFocus.value[0] += 1;
          if (indexFocus.value[0] == 3) indexFocus.value[0] += 1;
        }
        if (indexFocus.value)
          fields.value[indexFocus.value[0]][indexFocus.value[1]]?.focus();
      },
      onfocus(i: number, j: number) {
        console.log('>>>', i, j);
        indexFocus.value[0] = i;
        indexFocus.value[1] = j;
      },
      onSave() {
        emit('on-save');
        // timeTableData.saveData(rows.value);
      },
      onClear() {
        emit('on-clear');
        // rows.value = emptyState;
      },
      onExport() {
        emit('on-export');
      },
      onImport() {
        emit('on-import', importFile.value);
      },
      getColor,

      onUpdate(row: number, column: string, value: any) {
        const verify = verifyVerbose(value);
        if (typeof verify == 'boolean') {
          const newList = [
            ...props.school_data[props.selected_group].map((x: any) => ({
              ...x
            }))
          ];
          newList[row][column] = value.trim();
          console.log(
            '>>>>',
            props.selected_year,
            props.selected_group,
            row,
            column,
            value
          );
          emit('update-base', {
            year: props.selected_year,
            group: props.selected_group,
            hour_index: row,
            column,
            value: value.trim()
          });
          emit('update', {
            ...props.school_data,
            [props.selected_group]: newList
          });
        }
      },
      onPaint(row: number, column: string) {
        const newList = [
          ...props.school_data[props.selected_group].map((x: any) => ({
            ...x
          }))
        ];
        newList[row][`${column}_custom_color`] = props.selected_color;
        emit('update', {
          ...props.school_data,
          [props.selected_group]: newList
        });
      },
      onConfig() {
        Dialog.create({
          title: 'Alerta',
          message: 'Si vas a las configuraciones se pierden todos los datos',
          cancel: true,
          persistent: true
        }).onOk(() => {
          router.push('/config');
        });
      }
    };
  }
};
</script>
