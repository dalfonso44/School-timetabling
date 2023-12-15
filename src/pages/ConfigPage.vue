<template>
  <q-page
    class="items-center row"
    :style="`background-image: url(${CONFIG_IMAGE});`"
    padding
  >
    <div class="q-pa-md row justify-center items-center full-width full-height">
      <q-form ref="form">
        <q-card
          class="col-10 row justify-center items-start bg-custom-transparent"
        >
          <q-card-section class="col-12 q-mb-md test-center">
            <p class="text-h5 q-mb-sm">Agregar configuaración de horario</p>

            <p class="text-h6 q-mb-sm">Campos Requeridos</p>
          </q-card-section>
          <div class="col-md-6 col-12 row justify-center items-start">
            <q-card-section class="col-12 q-pa-md">
              <q-select
                class="bg-custom-transparent"
                label="Días"
                filled
                v-model="config.config.daysOptions"
                use-input
                use-chips
                multiple
                :rules="[(v) => (!!v && v.length > 0) || 'Field is required']"
                hide-dropdown-icon
                hide-bottom-space
                input-debounce="0"
                @new-value="createValue"
              />
            </q-card-section>

            <q-card-section class="col-12 q-pa-md">
              <q-select
                class="bg-custom-transparent"
                label="Turnos"
                filled
                v-model="config.config.hoursOptions"
                use-input
                use-chips
                multiple
                :rules="[(v) => (!!v && v.length > 0) || 'Field is required']"
                hide-dropdown-icon
                hide-bottom-space
                input-debounce="0"
                @new-value="createValue"
              />
            </q-card-section>

            <q-card-section class="col-12 q-pa-md">
              <q-select
                class="bg-custom-transparent"
                label="Validaciones"
                filled
                v-model="config.config.validationFunctions"
                use-chips
                multiple
                :options="Object.keys(validationFunctionMapped)"
                input-debounce="0"
                :option-label="(key) => validationFunctionMapped[key].name"
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    @click="scope.toggleOption(scope.opt)"
                  >
                    <q-item-section>
                      {{ validationFunctionMapped[scope.opt].name }}
                    </q-item-section>
                    <q-item-section caption>
                      {{ validationFunctionMapped[scope.opt].description }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-card-section>

            <q-card-section class="col-12 q-pa-md">
              <q-select
                class="bg-custom-transparent"
                label="Aulas"
                filled
                v-model="config.config.roomsOptions"
                use-input
                use-chips
                multiple
                :rules="[(v) => (!!v && v.length > 0) || 'Field is required']"
                hide-dropdown-icon
                hide-bottom-space
                input-debounce="0"
                @new-value="createValue"
              />
            </q-card-section>
          </div>
          <div class="col-md-6 col-12 row justify-center items-start">
            <q-card-section class="col-12 q-pa-md">
              <q-select
                class="bg-custom-transparent"
                label="Horario"
                filled
                v-model="config.config.yearsOptions"
                use-input
                use-chips
                multiple
                :rules="[(v) => (!!v && v.length > 0) || 'Field is required']"
                hide-dropdown-icon
                hide-bottom-space
                input-debounce="0"
                @new-value="createValue"
              />
            </q-card-section>
            <q-card-section class="col-12 q-pa-md">
              <q-select
                class="bg-custom-transparent"
                label="Grupos"
                filled
                v-model="config.config.groupsOptions"
                use-input
                use-chips
                multiple
                :rules="[(v) => (!!v && v.length > 0) || 'Field is required']"
                hide-dropdown-icon
                hide-bottom-space
                input-debounce="0"
                @new-value="createValue"
              />
            </q-card-section>
            <q-card-section class="col-12 q-pa-md">
              <q-select
                class="bg-custom-transparent"
                label="Asignaturas que se impartenen otros edificios"
                filled
                v-model="config.config.subjectsWithoutRooms"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                @new-value="createValue"
              />
            </q-card-section>
          </div>
          <q-card-actions align="right" class="full-width row">
            <q-btn label="GO" class="col-1" color="primary" @click="onGo">
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { config } from 'process';
import { useScheduleHandler } from 'src/components/base/hooks/useSchedule.hooks';
import { persistanceSchedule } from 'src/components/base/hooks/usePersistanceSchedule.hooks';
import { validationFunctionMapped } from 'src/components/base/hooks/validations.hooks';
import { Schedule, MyBasicSquedule } from 'src/components/base/models/basic';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CONFIG_IMAGE from 'src/assets/config.jpg';
export default {
  setup() {
    const router = useRouter();
    const config = ref<Schedule>({
      ...(persistanceSchedule.loadData() || MyBasicSquedule)
    });

    config.value.schedule = [];
    const form = ref(null as any);
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
        form.value.validate().then((ack: boolean) => {
          if (ack) {
            persistanceSchedule.saveData(config.value);

            router.push({ name: 'home' }).then(() => {
              window.location.reload();
            });
          }
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
      form,
      CONFIG_IMAGE
    };
  }
};
</script>
