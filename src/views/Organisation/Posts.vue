<template>
   <h1>Должности</h1>
    <TableEditor
        v-if="isPostRequest && isrbPostRequest"
        v-bind:fields="fields"
        v-bind:items="posts"
        v-bind:enableEditForm=false
        @saveRow="addPost"
        @updateRow="updatePost"
    />
</template>

<script>
import TableEditor from '@/components/VueEditortable.vue'
import OrganisationService from "@/services/organisation.service";


export default {
  name: "departmens",
  data() {
    return {
      posts_option:[],
      fields: [
        { key: "name",
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
      isPostRequest: false,
      isrbPostRequest: false,
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
          (response) => {this.request = response.data;},
          (error) => {console.log(error);}
      );
    },

    updatePost(data){
      let current_user = JSON.parse(localStorage.getItem("user"))
      data['organisation'] = current_user.organisation
      OrganisationService.patchPosts(data).then(
          (response) => {
            this.request = response.data;
          },
          (error) => {console.log(error);}
      );
    },

    getrbPosts(){
      OrganisationService.getRbPosts().then(
          (response) => {
            this.rb_posts = response.data;
            this.rb_posts.forEach(item =>
            {this.fields[0].options.push(item.value)});
            this.isrbPostRequest=true
          },
          (error) => {console.log(error);}
      );
    },

    getPosts(){
      OrganisationService.getPosts().then(
          (response) => {
            console.log('123');
            console.log(response.data);
            this.posts = response.data;
            this.isPostRequest = true;
          },
          (error) => {console.log(error);}
      );
    },
  },

  mounted(){
    this.getrbPosts()
    this.getPosts()
  },
}
</script>

