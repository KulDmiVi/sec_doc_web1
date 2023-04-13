<template>
   <h1>Должности</h1>
    <TableEditor
        v-if="isRequest"
        v-bind:fields="fields"
        v-bind:items="posts"
        @addRow="addPost"
    />
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";
import EventBus from "@/common/EventBus";




export default {
  name: "departmens",
  data() {
    return {
      fields: [
        {key: "post",
          label: "Наименование",
          class: 'form-control',
          type: 'text',
          teg: 'input',
          list: 'rbPost',
          datalist: ['test1', 'test2']

        },
      ],
      posts: [],
      isRequest: false,
    };
  },

  components: {
    TableEditor,
  },

  methods: {
    addPost(data){
      let current_user = JSON.parse(localStorage.getItem("user"))
      console.log(current_user.organisation)
      data['organisation'] = current_user.organisation
      OrganisationService.postPost(data).then(
          (response) => {
            this.request = response.data;
          },
          (error) => {
            this.request =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response && error.response.status === 403){
              EventBus.dispatch("logout");
            }
          }
      );
    },
  },

  created(){
    let user = JSON.parse(localStorage.getItem("user"))
    OrganisationService.getPosts(user.organisation).then(
        (response) => {
          this.posts = response.data;
          this.isRequest=true
        },
        (error) => {
          this.getPosts =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          if (error.response && error.response.status === 403) {
            EventBus.dispatch("logout");
          }
        }
    );

  },
}
</script>

