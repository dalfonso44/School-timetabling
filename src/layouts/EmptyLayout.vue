<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class = "bg-cyan-8">
      <q-toolbar>
        <q-toolbar-title> Header</q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon ="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model = "drawer"
      show-if-above
      :width = "200"
      :breakpoint="400"
    >
      <q-scroll-area style = "height: calc(100% - 150px); margin-top:150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple to = "/timetabling" active-class="my-menu-link" exact>
            <q-item-section avatar>
              <q-icon name="inbox"/>
            </q-item-section>

            <q-item-section>
              Table
            </q-item-section>
          </q-item>

          <q-item aticve clickable v-ripple to = "/timetabling/test" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name ="star"/>
            </q-item-section>
          
            <q-item-section>
              Test
            </q-item-section>
          </q-item>

          <q-item aticve clickable v-ripple to = "/timetabling/tabling" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name ="send"/>
            </q-item-section>
          
            <q-item-section>
              Timetable
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Diamis Alfonso</div>
          <div>@dalfpz</div>
        </div>
      </q-img>

    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'EmptyLayout',

  components: {},

  setup() {
    const drawer = ref(false)
    console.log('Calling inside empty layout');
    return {
      drawer
    };
  },
});
</script>


<style lang="scss">
.my-menu-link{
  color: white;
  background: #F2C037;
}
</style>