<template>
  <div class="q-pa-md">
    <q-table
      title="Horario"
      :rows="rows"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td key="turn" :props="props">{{ props.row.turn }}</q-td>
          
          <q-td key = "lunes" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.lunes" maxLength=6
              @blur="$v.form.$each[props.row.__index].lunes.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "martes" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.martes" maxLength=6
              @blur="$v.form.$each[props.row.__index].martes.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "miercoles" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.miercoles" maxLength=6
              @blur="$v.form.$each[props.row.__index].miercoles.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "jueves" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.jueves" maxLength=6
              @blur="$v.form.$each[props.row.__index].jueves.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          
          <q-td key = "viernes" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.viernes" maxLength=6
              @blur="$v.form.$each[props.row.__index].viernes.$touch()" 
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
  { name: 'lunes', align: 'center', label: 'Lunes', field: 'lunes'},
  { name: 'martes', align: 'center', label: 'Martes', field: 'martes'},
  { name: 'miercoles', align: 'center', label: 'Miercoles', field: 'miercoles' },
  { name: 'jueves', align: 'center', label: 'Jueves', field: 'jueves' },
  { name: 'viernes', align: 'center', label: 'Viernes', field: 'viernes' }
  
]

const rows = [
  {
    turn: '1',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
  },
  {
    turn: '2',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
  },
  {
    turn: '3',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
  },
  {
    turn: 'Receso',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
  },
  {
    turn: '4',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
  },
  {
    turn: '5',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
  },
  {
    turn: '6',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
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