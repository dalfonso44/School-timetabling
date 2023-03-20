<template>
  <div class="q-pa-md full-width">
    <q-table
      title="Horario"
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator = "cell"
      :pagination="{
        rowsPerPage: -1
      }"
      hide-pagination
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Salvar"
          no-caps
          rounded
          class="q-mr-md"
          @click="onSave"
        />
        <q-btn
          color="warning"
          icon-right="close"
          label="Limpiar"
          no-caps
          outline
          rounded
          @click="onClear"
        />
        
      </template>
      <template v-slot:header>
        <q-tr>
          <q-th colspan="1"></q-th>
          <q-th colspan="6" class="bg-teal-9 text-white">Lunes</q-th>
          <q-th colspan="6" class="bg-deep-orange-9 text-white">Martes</q-th>
          <q-th colspan="6" class="bg-light-blue-9 text-white">Miercoles</q-th>
          <q-th colspan="6" class="bg-purple-5 text-white">Jueves</q-th>
          <q-th colspan="6" class="bg-pink-13 text-white">Viernes</q-th>
        </q-tr>
        <q-tr>
          <q-th colspan="1"></q-th>

          <q-th colspan="1" class="bg-teal-9 text-white">1</q-th>
          <q-th colspan="1" class="bg-teal-9 text-white">2</q-th>
          <q-th colspan="1" class="bg-teal-9 text-white">3</q-th>
          <q-th colspan="1" class="bg-teal-9 text-white">4</q-th>
          <q-th colspan="1" class="bg-teal-9 text-white">5</q-th>
          <q-th colspan="1" class="bg-teal-9 text-white">6</q-th>

          <q-th colspan="1" class="bg-deep-orange-9 text-white">1</q-th>
          <q-th colspan="1" class="bg-deep-orange-9 text-white">2</q-th>
          <q-th colspan="1" class="bg-deep-orange-9 text-white">3</q-th>
          <q-th colspan="1" class="bg-deep-orange-9 text-white">4</q-th>
          <q-th colspan="1" class="bg-deep-orange-9 text-white">5</q-th>
          <q-th colspan="1" class="bg-deep-orange-9 text-white">6</q-th>

          <q-th colspan="1" class="bg-light-blue-9 text-white">1</q-th>
          <q-th colspan="1" class="bg-light-blue-9 text-white">2</q-th>
          <q-th colspan="1" class="bg-light-blue-9 text-white">3</q-th>
          <q-th colspan="1" class="bg-light-blue-9 text-white">4</q-th>
          <q-th colspan="1" class="bg-light-blue-9 text-white">5</q-th>
          <q-th colspan="1" class="bg-light-blue-9 text-white">6</q-th>

          <q-th colspan="1" class="bg-purple-5 text-white">1</q-th>
          <q-th colspan="1" class="bg-purple-5 text-white">2</q-th>
          <q-th colspan="1" class="bg-purple-5 text-white">3</q-th>
          <q-th colspan="1" class="bg-purple-5 text-white">4</q-th>
          <q-th colspan="1" class="bg-purple-5 text-white">5</q-th>
          <q-th colspan="1" class="bg-purple-5 text-white">6</q-th>

          <q-th colspan="1" class="bg-pink-13 text-white">1</q-th>
          <q-th colspan="1" class="bg-pink-13 text-white">2</q-th>
          <q-th colspan="1" class="bg-pink-13 text-white">3</q-th>
          <q-th colspan="1" class="bg-pink-13 text-white">4</q-th>
          <q-th colspan="1" class="bg-pink-13 text-white">5</q-th>
          <q-th colspan="1" class="bg-pink-13 text-white">6</q-th>

        </q-tr>
      </template>
      <template v-slot:body="props">

        <q-tr :props="props">

          <q-td key="turn" :props="props">{{ props.row.turn }}</q-td>
          
          <q-td key = "monday1" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.monday1" maxLength=6
              @blur="$v.form.$each[props.row.__index].monday1.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          <q-td key = "monday2" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.monday2" maxLength=6
              @blur="$v.form.$each[props.row.__index].monday2.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td><q-td key = "monday3" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.monday3" maxLength=6
              @blur="$v.form.$each[props.row.__index].monday3.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td><q-td key = "monday4" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.monday4" maxLength=6
              @blur="$v.form.$each[props.row.__index].monday4.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td><q-td key = "monday5" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.monday5" maxLength=6
              @blur="$v.form.$each[props.row.__index].monday5.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td><q-td key = "monday6" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.monday6" maxLength=6
              @blur="$v.form.$each[props.row.__index].monday6.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "tuesday1" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.tuesday1" maxLength=6
              @blur="$v.form.$each[props.row.__index].tuesday1.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          <q-td key = "tuesday2" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.tuesday2" maxLength=6
              @blur="$v.form.$each[props.row.__index].tuesday2.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td><q-td key = "tuesday3" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.tuesday3" maxLength=6
              @blur="$v.form.$each[props.row.__index].tuesday3.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td><q-td key = "tuesday4" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.tuesday4" maxLength=6
              @blur="$v.form.$each[props.row.__index].tuesday4.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td><q-td key = "tuesday5" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.tuesday5" maxLength=6
              @blur="$v.form.$each[props.row.__index].tuesday5.$touch()" 
              @change="changedField(props)" />
            </q-field>
           </q-td><q-td key = "tuesday6" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.tuesday6" maxLength=6
              @blur="$v.form.$each[props.row.__index].tuesday6.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          
          <q-td key = "wednesday1" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.wednesday1" maxLength=6
              @blur="$v.form.$each[props.row.__index].wednesday1.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
           <q-td key = "wednesday2" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.wednesday2" maxLength=6
              @blur="$v.form.$each[props.row.__index].wednesday2.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "wednesday3" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.wednesday3" maxLength=6
              @blur="$v.form.$each[props.row.__index].wednesday3.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "wednesday4" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.wednesday4" maxLength=6
              @blur="$v.form.$each[props.row.__index].wednesday4.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "wednesday5" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.wednesday5" maxLength=6
              @blur="$v.form.$each[props.row.__index].wednesday5.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "wednesday6" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.wednesday6" maxLength=6
              @blur="$v.form.$each[props.row.__index].wednesday6.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>

          <q-td key = "thursday1" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.thursday1" maxLength=6
              @blur="$v.form.$each[props.row.__index].thursday1.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
           <q-td key = "thursday2" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.thursday2" maxLength=6
              @blur="$v.form.$each[props.row.__index].thursday2.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "thursday3" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.thursday3" maxLength=6
              @blur="$v.form.$each[props.row.__index].thursday3.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "thursday4" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.thursday4" maxLength=6
              @blur="$v.form.$each[props.row.__index].thursday4.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "thursday5" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.thursday5" maxLength=6
              @blur="$v.form.$each[props.row.__index].thursday5.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td> <q-td key = "thursday6" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.thursday6" maxLength=6
              @blur="$v.form.$each[props.row.__index].thursday6.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          
          <q-td key = "friday1" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.friday1" maxLength=6
              @blur="$v.form.$each[props.row.__index].friday1.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          <q-td key = "friday2" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.friday2" maxLength=6
              @blur="$v.form.$each[props.row.__index].friday2.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          <q-td key = "friday3" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.friday3" maxLength=6
              @blur="$v.form.$each[props.row.__index].friday3.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          <q-td key = "friday4" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.friday4" maxLength=6
              @blur="$v.form.$each[props.row.__index].friday4.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          <q-td key = "friday5" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.friday5" maxLength=6
              @blur="$v.form.$each[props.row.__index].friday5.$touch()" 
              @change="changedField(props)" />
            </q-field>
          </q-td>
          <q-td key = "friday6" :props="props">
            <q-field>
              <q-input type="text" v-model="props.row.friday6" maxLength=6
              @blur="$v.form.$each[props.row.__index].friday6.$touch()" 
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
import { schoolTableData } from 'src/hooks/PersistanceDB.hooks'

const columns = [
  { name: 'turn', align: 'center', field: 'turn'},
  { name: 'monday1', align: 'center', label: '1', field: 'monday1'},
  { name: 'monday2', align: 'center', label: '2', field: 'monday2'},
  { name: 'monday3', align: 'center', label: '3', field: 'monday3'},
  { name: 'monday4', align: 'center', label: '4', field: 'monday4'},
  { name: 'monday5', align: 'center', label: '5', field: 'monday5'},
  { name: 'monday6', align: 'center', label: '6', field: 'monday6'},
  { name: 'tuesday1', align: 'center', label: '1', field: 'tuesday1'},
  { name: 'tuesday2', align: 'center', label: '2', field: 'tuesday2'},
  { name: 'tuesday3', align: 'center', label: '3', field: 'tuesday3'},
  { name: 'tuesday4', align: 'center', label: '4', field: 'tuesday4'},
  { name: 'tuesday5', align: 'center', label: '5', field: 'tuesday5'},
  { name: 'tuesday6', align: 'center', label: '6', field: 'tuesday6'},
  { name: 'wednesday1', align: 'center', label: '1', field: 'wednesday1' },
  { name: 'wednesday2', align: 'center', label: '2', field: 'wednesday2' },
  { name: 'wednesday3', align: 'center', label: '3', field: 'wednesday3' },
  { name: 'wednesday4', align: 'center', label: '4', field: 'wednesday4' },
  { name: 'wednesday5', align: 'center', label: '5', field: 'wednesday5' },
  { name: 'wednesday6', align: 'center', label: '6', field: 'wednesday6' },
  { name: 'thursday1', align: 'center', label: '1', field: 'thursday1' },
  { name: 'thursday2', align: 'center', label: '2', field: 'thursday2' },
  { name: 'thursday3', align: 'center', label: '3', field: 'thursday3' },
  { name: 'thursday4', align: 'center', label: '4', field: 'thursday4' },
  { name: 'thursday5', align: 'center', label: '5', field: 'thursday5' },
  { name: 'thursday6', align: 'center', label: '6', field: 'thursday6' },
  { name: 'friday1', align: 'center', label: '1', field: 'friday1' },
  { name: 'friday2', align: 'center', label: '2', field: 'friday2' },
  { name: 'friday3', align: 'center', label: '3', field: 'friday3' },
  { name: 'friday4', align: 'center', label: '4', field: 'friday4' },
  { name: 'friday5', align: 'center', label: '5', field: 'friday5' },
  { name: 'friday6', align: 'center', label: '6', field: 'friday6' }
]

const emptyState = ['1', '2', '3', 'Receso', '4', '5', '6', '7', '8', '9'].map((v) => {
  return {
    turn: v,
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: ''
  }
})

const rows = ref(schoolTableData.loadData() || emptyState)
//  [
//   {
//     turn: '1',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '2',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '3',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '4',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '5',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '6',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '7',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '8',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   },
//   {
//     turn: '9',
//     monday: '',
//     tuesday: '',
//     wednesday: '',
//     thursday: '',
//     friday: ''
//   }
// ])

export default {
  setup () {
    return {
      columns,
      rows,
      onSave(){
        schoolTableData.saveData(rows.value)
      },
      onClear(){
        rows.value=emptyState
        schoolTableData.cleanData()
      }
    }
  }
}
</script>