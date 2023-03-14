<template>
  <q-page class="row items-center justify-evenly">
    <!-- <p>Hola diamis !!!</p> -->
    <hello-name :name="nameT" @on-click="onClicksssss" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import HelloName from 'src/components/Test/HelloName.vue';

import HelloName from 'src/components/Test/HelloName.vue';

export default defineComponent({
  name: 'TestPage',
  components: { HelloName },
  setup() {
    const nameT = ref<string>('Diamis');
    console.log('Calling inside Test Page');
    const onClicksssss = () => {
      nameT.value += 's';
    };
    return { nameT, onClicksssss };
  },
});
</script>
