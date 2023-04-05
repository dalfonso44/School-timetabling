<template>
  <q-dialog :model-value="show" @update:model-value="$emit('onClose')">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          :label="label"
          v-model="value"
          autofocus
          :rules="[(val) => !!val || 'Este campo es requerido']"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn no-caps outline label="Cerrar" color="secondary" v-close-popup />

        <q-btn
          color="primary"
          no-caps
          v-close-popup
          label="Crear"
          :disable="!value"
          @click="$emit('onNext', value)"
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
      type: Boolean,
    },

    title: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
  },
  emits: ['onNext', 'onClose'],
  setup() {
    const value = ref('');
    return {
      value,
    };
  },
});
</script>
