<template>
  <p>{{ hi }} {{ name }}</p>
  <q-btn
    align="between"
    class="btn-fixed-width"
    color="accent"
    label="add s"
    icon="flight_takeoff"
    @click="$emit('onClick')"
  />
  <div class="q-pa-md q-gutter-sm">
    <q-avatar square color="red" text-color="white" icon="directions" />
    <q-avatar square color="primary" text-color="white">J</q-avatar>
    <q-avatar
      square
      size="100px"
      font-size="52px"
      color="teal"
      text-color="white"
      icon="directions"
    />
    <q-avatar square size="24px" color="orange">J</q-avatar>
    <q-avatar square>
      <img src="https://cdn.quasar.dev/img/avatar.png" />
    </q-avatar>
  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-banner inline-actions rounded class="bg-orange text-white">
      You have lost connection to the internet. This app is offline.

      <template v-slot:action>
        <q-btn flat label="Turn ON Wifi" @click="onClickWifi(name)" />
        <q-btn flat label="Dismiss" />
      </template>
    </q-banner>
  </div>

  <div v-for="(item,index) in array" :key="index" >
    <div v-if="item !== 'Diamis'"> {{ index }} - {{ item }} </div>
  </div>

  <div v-for="item in n" :key="item" >
    <div v-if="item % 2 === 0"> {{ item }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const array = ['Diamis', 'Alain', 'Dali'];
const n = 10;

export default defineComponent({
  name: 'HelloName',
  props: {
    name: {
      type: String,
      default: 'Diamis by default',
    },
  },
  emits: ['onClick'],
  setup(props) {
    const hi = ref<string>('Hola, ');

    hi.value = 'hi ';
    const onClickWifi = (name: string) => {
      console.log('aaaa', name);
    };

    if (props.name === 'Diamis') {
      hi.value = 'Hola señorita ';
    }

    return {
      hi,
      onClickWifi,
      array,
      n,
    };
  },
});
</script>
