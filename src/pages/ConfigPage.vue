<template>
  <q-page padding style="background-black">
    <!-- <div class="row">
      <div class="col q-gutter-md">
        <div class="q-gutter-md row items-end">
          <q-input
            outlined
            v-model="year"
            label="Año"
            style="width: 300px"
            :rules="[(year) => !!year || 'Field is required']"
          />
        </div>

        <div class="q-gutter-md row items-start">
          <q-input
            v-model.number="rooms"
            type="number"
            outlined
            style="width: 300px"
            label="Aulas"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>

        <div class="q-gutter-md row items-center">
          <q-input
            v-model.number="hours"
            type="number"
            outlined
            style="width: 300px"
            label="Turnos"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
      </div>

      <div class="col q-gutter-md">
        <div class="q-gutter-md row items-start">
          <q-card
            flat
            bordered
            class="my-card"
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
          >
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6">Días</div>
                </div>
              </div>
              <q-separator />
            </q-card-section>

            <q-card-section>
              <div>
                <q-option-group
                  v-model="group"
                  :options="options"
                  color="primary"
                />
              </div>
            </q-card-section>

            <q-separator />
            <q-card-actions>
              <q-select
                outlined
                v-model="selected_days"
                multiple
                :options="days"
                label="Otra"
                style="width: 250px"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div class="q-gutter-md col items-end">
        <q-card
          flat
          bordered
          class="my-card"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
        >
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">Grupos</div>
              </div>
            </div>
            <q-separator />
          </q-card-section>

          <q-card-actions>
            <q-btn
              outline
              color="bg-grey-9"
              label="Cargar de la base de datos"
              style="width: 250px"
            />
          </q-card-actions>

          <q-card-actions>
            <div class="q-pa-md text-black" style="width: 300px">
              <q-input
                v-model="groups"
                filled
                type="textarea"
                label="Escribir"
              />
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <h6>Campos Opcionales</h6>
    <div class="col-12 justify-evenly" style="height: 150px">
      <div class="col-12 q-gutter-md row items-start">
        <q-input
          outlined
          v-model="name"
          label="Nombre del horario"
          style="width: 250px"
        />
      </div>
      <fieldset>
        <legend><strong>Profesores</strong></legend>

        <div class="row">
          <div class="col">
            <q-btn outline color="bg-grey-9" label="Cargar BD" class="mp" />
          </div>
          <div class="q-pa-md" style="width: 900px">
            <q-input v-model="professors" filled autogrow label="Escribir" />
          </div>
        </div>
      </fieldset>

      <div class="prof row">
        <div class="col">
          <p>Asignaturas</p>
          <q-btn outline color="bg-grey-9" label="Cargar BD" class="ml" />
        </div>
        <div class="q-pa-md" style="width: 900px">
          <q-input v-model="subjects" filled autogrow label="Escribir" />
        </div>
      </div>

      <div class="prof row">
        <div class="col">
          <p>Asignaturas que se imparten en otro centro</p>
          <q-btn outline color="bg-grey-9" label="Cargar BD" class="ml" />
        </div>
        <div class="q-pa-md" style="width: 900px">
          <q-input
            v-model="subjectsWithoutRoom"
            filled
            autogrow
            label="Escribir"
          />
        </div>
      </div>

      <div class="prof row">
        <div class="col">
          <p>Asignaturas y horas clase</p>
          <q-select
            outlined
            v-model="model"
            :options="options"
            label="Asignatura"
            style="width: 250px"
            class="ml"
          />
          <q-btn outline color="bg-grey-9" label="Cargar BD" class="load" />
        </div>

        <div class="marg q-pa-md" style="width: 900px">
          <q-input v-model="hoursXsubject" filled autogrow label="Horas" />
        </div>
      </div>

      <div class="prof row">
        <div class="col" outline>
          <p>Profesores por asignatura</p>
          <q-select
            outlined
            v-model="model"
            :options="options"
            label="Profesor"
            style="width: 250px"
            class="ml"
          />
          <q-btn outline color="bg-grey-9" label="Cargar BD" class="load" />
        </div>
        <div class="marg q-pa-md" style="width: 900px">
          <q-select
            v-model="modelMultiple"
            outlined
            multiple
            :options="options"
            use-chips
            stack-label
            label="Asignaturas"
          />
        </div>
      </div>
    </div> -->

    <div class="q-pa-md row justify-center items-center">
      <q-card class="col-10 row justify-center items-start">
        <q-card-section class="col-12">
          <p class="text-h5">Agregar configuaración de horario</p>

          <p class="text-h6">Campos Requeridos</p>
        </q-card-section>
        <q-card-section class="col-4 q-pa-md">
          <q-select
            label="Días"
            filled
            v-model="config.config.daysOptions"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            @new-value="createValue"
          />
        </q-card-section>
        <q-card-section class="col-4 q-pa-md">
          <q-select
            label="Grupos"
            filled
            v-model="config.config.groupsOptions"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            @new-value="createValue"
          /> </q-card-section
        ><q-card-section class="col-4 q-pa-md">
          <q-select
            label="Años"
            filled
            v-model="config.config.yearsOptions"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            @new-value="createValue"
          />
        </q-card-section>

        <q-card-actions align="right" class="full-width row">
          <q-btn label="GO" class="col-1" color="primary" @click="onGo">
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { persistanceSchedule } from 'src/components/base/hooks/usePersistanceSchedule.hooks';
import { Schedule, MyBasicSquedule } from 'src/components/base/models/basic';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const config = ref<Schedule>({
      ...MyBasicSquedule
    });
    return {
      config,
      hoursXsubject: ref(''),
      modelMultiple: ref(null),
      model: ref(null),
      groups: ref(''),
      professors: ref(''),
      subjects: ref(''),
      subjectsWithoutRoom: ref(''),
      hourXsubject: ref(''),
      year: ref(''),
      name: ref(''),
      rooms: ref(),
      hours: ref(),
      selected_days: ref(null),
      group: ref('op1'),
      onGo() {
        persistanceSchedule.saveData(config.value);
        router.push({ name: 'home' }).then(() => {
          window.location.reload();
        });
      },
      createValue(val: any, done: any) {
        // specific logic to eventually call done(...) -- or not
        done(val);

        // done callback has two optional parameters:
        //  - the value to be added
        //  - the behavior (same values of new-value-mode prop,
        //    and when it is specified it overrides that prop –
        //    if it is used); default behavior (if not using
        //    new-value-mode) is to add the value even if it would
        //    be a duplicate
      },

      options: [
        {
          label: 'Lunes-Viernes',
          value: 'op1'
        },
        {
          label: 'Lunes-Sábado',
          value: 'op2'
        }
      ],

      days: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo'
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px

.prof
  border: 1px solid gray
  margin-top: 20px
  margin-bottom: 20px

.marg
  margin-top:20px

.load
  margin-top:10px
  margin-bottom:10px
  margin-left:10px

.ml
  margin-left:10px

.mp
  margin-top:20px
  margin-left:10px
</style>
