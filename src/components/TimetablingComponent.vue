<template>
  <div class="q-pa-md full-width">
    <q-table
      title="Horario C111"
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator = "cell"
      :pagination="{
        rowsPerPage: -1
      }"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td key="turn" :props="props">{{ props.row.turn }}</q-td>
          
          <q-td  :props="props"
            v-for="(item) in fieldForEditing"
            :key="item" 
          >
            <q-input v-if="props.rowIndex != 3" type="text" v-model="props.row[item]" input-class="text-center" maxLength=6 />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'

const columns = [
  { name: 'turn', align: 'center', field: 'turn'},
  { name: 'monday', align: 'center', label: 'Lunes', field: 'monday'},
  { name: 'tuesday', align: 'center', label: 'Martes', field: 'tuesday'},
  { name: 'wednesday', align: 'center', label: 'Miercoles', field: 'wednesday' },
  { name: 'thursday', align: 'center', label: 'Jueves', field: 'thursday' },
  { name: 'friday', align: 'center', label: 'Viernes', field: 'friday' }
  
]

const fieldForEditing = columns.filter((c) => c.name !== "turn").map((c) => c.name)

const rows = ref([
  {
    turn: '1',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  },
  {
    turn: '2',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  },
  {
    turn: '3',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  },
  {
    turn: 'Receso',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  },
  {
    turn: '4',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  },
  {
    turn: '5',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  },
  {
    turn: '6',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  }
])

export default {
  setup () {
    return {
      columns,
      rows,
      fieldForEditing
    }
  }
}
</script>