<template>
  <q-dialog
    :model-value="show"
    @update:model-value="$emit('onClose')"
    @before-hide="resetValidation"
  >
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form ref="formR" @submit.prevent>
          <q-input
            dense
            :label="label"
            v-model="value"
            autofocus
            :rules="[(v) => (!!v && v.length > 0) || 'Field is required']"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn no-caps outline label="Cerrar" color="secondary" v-close-popup />

        <q-btn
          color="primary"
          no-caps
          v-close-popup
          label="Crear"
          :disable="!value"
          @click="onCreate($event)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InputDialog',
  props: {
    show: {
      type: Boolean
    },

    title: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    }
  },
  emits: ['onNext', 'onClose'],
  setup(props, { emit }) {
    const value = ref('');
    const formR = ref(null as any);

    const resetValidation = () => {
      value.value = '';
      return formR.value.resetValidation();
    };
    function onCreate(event: any) {
      formR.value.validate().then((res: boolean) => {
        if (res) {
          emit('onNext', value.value);
        }
      });
    }

    return {
      value,
      onCreate,
      formR,
      resetValidation
    };
  }
});
</script>
