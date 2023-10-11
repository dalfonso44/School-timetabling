<template>
  <q-page padding style="background-black">
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
        <q-card-section class="col-4 q-pa-md">
          <q-select
            label="Validaciones"
            filled
            v-model="config.config.validationFunctions"
            use-chips
            multiple
            :options="Object.keys(validationFunctionMapped)"
            input-debounce="0"
            :option-label="(key) => validationFunctionMapped[key].name"
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
import { config } from 'process';
import { persistanceSchedule } from 'src/components/base/hooks/usePersistanceSchedule.hooks';
import { validationFunctionMapped } from 'src/components/base/hooks/validations.hooks';
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
      validationFunctionMapped,
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
      }
    };
  }
};
</script>
