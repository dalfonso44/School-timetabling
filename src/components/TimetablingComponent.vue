<template>
  <div class="q-pa-md">
    <q-table
      title="Horario C111"
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator = "cell"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td key="turn" :props="props">{{ props.row.turn }}</q-td>
          
          <q-td key = "monday" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.monday" maxLength=6
              @blur="$v.form.$each[props.row.__index].monday.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "tuesday" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.tuesday" maxLength=6
              @blur="$v.form.$each[props.row.__index].tuesday.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "wednesday" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.wednesday" maxLength=6
              @blur="$v.form.$each[props.row.__index].wednesday.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "thursday" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.thursday" maxLength=6
              @blur="$v.form.$each[props.row.__index].thursday.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          
          <q-td key = "friday" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.friday" maxLength=6
              @blur="$v.form.$each[props.row.__index].friday.$touch()" 
              @change="changedField(props)" />
            </q-field>
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

const rows = [
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
]

export default {
  setup () {
    return {
      columns,
      rows: ref(rows)
    }
  }
}
</script>