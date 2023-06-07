<template>
   <h1>Должности</h1>
    <TableEditor
        v-if="isRequest1 && isRequest2"
        v-bind:fields="fields"
        v-bind:items="posts"
        v-bind:enableEditForm="enableEditForm"
        @saveRow="addPost"
        @updateRow="updatePost"
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
      posts_option:[],
      fields: [
        { key: "post",
          default:'',
          label: "Должность",
          class: 'form-control',
          type: 'text',
          teg: 'AdvancedSelect',
          options: []
        },
      ],
      posts: [],
      rb_posts: [],
      isRequest1: false,
      isRequest2: false,
      enableEditForm: false
    };
  },

  components: {
    TableEditor,
  },

  methods: {
    addPost(data){
      let current_user = JSON.parse(localStorage.getItem("user"))
      data['organisation'] = current_user.organisation
      OrganisationService.postPost(current_user.organisation, data).then(
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

    updatePost(data){
      let current_user = JSON.parse(localStorage.getItem("user"))
      console.log(current_user.organisation)
      data['organisation'] = current_user.organisation
      OrganisationService.patchPosts(data).then(
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
    OrganisationService.getRbPosts().then(
        (response) => {
          this.rb_posts = response.data;
          this.rb_posts.forEach(item =>
          {this.fields[0].options.push(item.value)});
           this.isRequest2=true
        },
        (error) => {
          this.response =
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

    OrganisationService.getPosts(user.organisation).then(
        (response) => {
          this.posts = response.data;

          this.isRequest1=true
        },
        (error) => {
          this.posts =
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

