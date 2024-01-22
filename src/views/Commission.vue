<template>
      <h1>{{commission.type}}</h1>
      <div class="row" >
        <div class="col-md-10 order-md-1">
          <form class="needs-validation"  @submit.prevent="submit">
            <div class="md-1">
              <label for="username">Председатель</label>
              <div class="input-group">
                <select class="form-select"
                        type="text"
                        v-model=commission.chairman>
                  <option v-for = 'employee in employees' v-bind:value="employee.id" >{{employee.name}}</option>
                </select>
              </div>
            </div>
            <div class="md-1">
              <label for="username">Заместитель председателя</label>
              <div class="input-group">
                <select class="form-select"
                        type="text"
                        v-model=commission.deputy>
                  <option v-for = 'employee in employees' v-bind:value="employee.id" >{{employee.name}}</option>
                </select>
              </div>
            </div>
            <div class="mb-1">
              <label for="username">Члены комиссии</label>
              <TableEditor
                  v-if="isRequest"
                  v-bind:fields="fields"
                  v-bind:items="members"
                  v-bind:enableEditForm=false
                  @saveRow="addMember"
                  @updateRow="updateMember"
                  @deleteRow="deleteMember"
              />
            </div>
            <div class="row">
              <div class="offset-md-9">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Сохранить изменения</button>
              </div>
            </div>
          </form>
        </div>
      </div>
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'


export default {
  name: "commission",
  data() {
    return {
      isRequest: true,

      employees: [
          {
            id: 1,
            name: "Иванов",
            email: "upchh@example.com",
            phone: "0123456789"
          },
          {
            id: 2,
            name: "Перов",
            email: "upchh@example.com",
            phone: "0123456789"
          },

      ],
      fields: [
        { key: "role", label: "Роль", class: 'form-control', type: 'text', teg: 'input'  },
        { key: "member",
          label: "Сотрудник",
          class: 'form-control',
          type: 'text',
          teg: 'select',
          options: [
            {id: 1, select_name: 'Иванов'},
            {id: 2, select_name: 'Петров'}
          ] },
      ],
      members: [
            { role: "Директор",
              member: 2,
            },
            { role: "Зам. директор",
              member: 1,
            },
      ],
      commission: {
        type: 'test',
        chairman: null,
        deputy: null,
      },
    };
  },
  components: {
    TableEditor,
  },
  methods: {
    submit() {  },
    addMember() {},
    updateMember() {},
    deleteMember() {},

  },

  mounted() {
  },
};

</script>
