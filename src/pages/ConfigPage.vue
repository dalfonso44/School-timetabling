<template>
  <q-page padding style="background-black">
    <h5> Agregar configuaración de horario </h5>

    <h6>Campos Requeridos</h6>

    <div class="row">
      <div class="col q-gutter-md">
        <div class="q-gutter-md row items-end">
          <q-input 
            outlined 
            v-model="year" 
            label="Año" 
            style="width: 300px"
            :rules="[year => !!year || 'Field is required']"
          />
        </div>

        <div class="q-gutter-md row items-start">
          <q-input
            v-model.number="rooms"
            type="number"
            outlined
            style="width: 300px"
            label = "Aulas"
            :rules="[val => !!val || 'Field is required']"
          />        
        </div>
   
    
        <div class="q-gutter-md row items-center">
          <q-input
            v-model.number="hours"
            type="number"
            outlined
            style="width: 300px"
            label = "Turnos"
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
      </div>

      <div class="col q-gutter-md">
        <div class="q-gutter-md row items-start">
          <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
            <q-card-section >
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6">Días</div>
                </div>
              </div>
            <q-separator />
           
            </q-card-section>

            <q-card-section>
              <div >
                <q-option-group
                  v-model="group"
                  :options="options"
                  color="primary"
                />
              </div>
            </q-card-section>

            <q-separator />
            <q-card-actions >
              
              <q-select
                outlined
                v-model="selected_days"
                multiple
                :options="days"
                label="Otra"
                style="width: 250px"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

        <div class="q-gutter-md col items-end">
          <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
            <q-card-section >
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6">Grupos</div>
                </div>
              </div>
            <q-separator />
           
            </q-card-section>

            <q-card-actions>
              <q-btn outline color="bg-grey-9" label="Cargar de la base de datos" style="width: 250px"/>
            </q-card-actions>

            <q-card-actions >
              <div class="q-pa-md text-black" style="width: 300px">
                <q-input
                  v-model="groups"
                  filled
                  type="textarea"
                  label= "Escribir"
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>
      
    </div>

    <h6>Campos Opcionales</h6>
    <div class="col-12 justify-evenly" style= "height: 150px">
        <div class="col-12 q-gutter-md row items-start style=margin">
          <q-input outlined v-model="name" label="Nombre del horario" style="width: 250px"/>
        </div>

        <div class="prof row ">
          <div class="col ">
            <p>Profesores</p>
            <q-btn outline color="bg-grey-9" label="Cargar BD" class="ml"/>
          </div>
         <div class="q-pa-md" style="width: 900px">
            <q-input
              v-model="professors"
              filled
              autogrow
              label="Escribir"
            />
          </div>
        </div>
      
        <div class="prof row ">
          <div class="col"> 
            <p>Asignaturas</p>
            <q-btn outline color="bg-grey-9" label="Cargar BD" class="ml"/>
          </div>
         <div class="q-pa-md" style="width: 900px" >
            <q-input
              v-model="subjects"
              filled
              autogrow
              label="Escribir"
            />
          </div>
        </div>
      
        <div class="prof row">
          <div class="col">     
            <p>Asignaturas que se imparten en otro centro</p>
            <q-btn outline color="bg-grey-9" label="Cargar BD" class="ml"/>
          </div>
           <div class="q-pa-md" style="width: 900px">
               <q-input
              v-model="subjectsWithoutRoom"
              filled
              autogrow
              label="Escribir"
            />
            </div>
        </div>

       <div class="prof row" >
        <div class="col" >
          <p>Asignaturas y horas clase</p>
          <q-select outlined v-model="model" :options="options" label="Asignatura" style="width: 250px" class = "ml"/>
          <q-btn outline color="bg-grey-9" label="Cargar BD" class= "load"/>
        </div>

         <div class="marg q-pa-md" style="width: 900px">
             <q-input
              v-model="hoursXsubject"
              filled
              autogrow
              label="Horas"
            />
          </div>
        </div>
      

      
        <div class="prof row ">
          <div class="col" outline>
            <p>Profesores por asignatura</p>
            <q-select outlined v-model="model" :options="options" label="Profesor" style="width: 250px" class = "ml"/>
            <q-btn outline color="bg-grey-9" label="Cargar BD" class= "load"/>
          </div>
          <div class="marg q-pa-md" style="width: 900px">
            <q-select
            v-model="modelMultiple"
            outlined
            multiple
            :options="options"
            use-chips
            stack-label
            label="Asignaturas"
          />
          </div>
        </div>
      
    </div>
  
  </q-page>
  
</template>

<script lang="ts">

import { ref } from 'vue'


export default {
  setup () {
    return {
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

      options: [
        {
          label: 'Lunes-Viernes',
          value: 'op1'
        },
        {
          label: 'Lunes-Sábado',
          value: 'op2'
        },
       
      ],
   
      days: [
        'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo' 
      ],

      
    }
  }
}

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px

.prof
  border: 1px solid grey
  margin-top: 20px
  margin-bottom: 20px

.marg
  margin-top:20px

.load
  margin-top:10px
  margin-bottom:10px
  margin-left:10px

.ml
  margin-left:10px
 

</style>

