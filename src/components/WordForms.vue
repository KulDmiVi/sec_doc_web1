<template>
  <div class="word_container">
      <input type="text" class="form-control" id="full_name"  v-model="wordForm.singular.IP">
      <button  style="border:none;"  @click="showWordForm">
        <img src="./icons/2931167_documents_doc_document_sheet_file_text_archive.svg" alt="Получить формы слова"  width="20" height="20">
      </button>
  </div>

  <div class="modal" v-show="wordFormsVisible" >
    <div class="modal-content">

      <div>
        <label>Единственное число</label><br>
        <label>{{inputText}}</label>
        <div class="word-item" v-if="showForms.includes('s_ip')">
          <label>ИП</label>
          <input type="text" class="form-control" id="singular_ip"  v-model="wordForm.singular.IP">
        </div>
        <div class="word-item" v-if="showForms.includes('s_rp')">
          <label>РП</label>
          <input type="text" class="form-control" id="singular_rp"   v-model="wordForm.singular.RP">
        </div>
        <div class="word-item"  v-if="showForms.includes('s_dp')">
          <label>ДП</label>
          <input type="text" class="form-control" id="singular_dp" v-model="wordForm.singular.DP">
        </div>
        <div class="word-item" v-if="showForms.includes('s_vp')">
          <label>ВП</label>
          <input type="text" class="form-control" id="singular_vp"   v-model="wordForm.singular.VP">
        </div>
        <div class="word-item" v-if="showForms.includes('s_tp')">
          <label>ТП</label>
          <input type="text" class="form-control" id="singular_tp"  v-model="wordForm.singular.TP">
        </div>
        <div class="word-item"  v-if="showForms.includes('s_pp')">
          <label>ПП</label>
          <input type="text" class="form-control" id="singular_pp"   v-model="wordForm.singular.PP">
        </div>
      </div>

      <div v-show="false">
        <label>Множественное число</label>
        <div class="word-item" >
          <label>ИП</label>
          <input type="text" class="form-control" id="plural_ip"  v-model="wordForm.plural.IP">
        </div>
        <div class="word-item">
          <label>РП</label>
          <input type="text" class="form-control" id="plural_rp"  v-model="wordForm.plural.RP">
        </div>
        <div class="word-item">
          <label>ДП</label>
          <input type="text" class="form-control" id="plural_dp"   v-model="wordForm.plural.DP">
        </div>
        <div class="word-item">
          <label>ВП</label>
          <input type="text" class="form-control" id="plural_vp" r  v-model="wordForm.plural.TP">
        </div>
        <div class="word-item">
          <label>ТП</label>
          <input type="text" class="form-control" id="plural_tp"   v-model="wordForm.plural.PP">
        </div>
        <div class="word-item">
          <label>ПП</label>
          <input type="text" class="form-control" id="plural_pp"   v-model="inputText">
        </div>
      </div>

      <div class="btn-box">
        <button class="btn btn-primary btn-lg btn-block" @click="saveForm()">Сохранить</button>
        <button class="btn btn-primary btn-lg btn-block" @click="closeForm()">Отмена</button>
      </div>

    </div>
  </div>

</template>


<script>

  import UserService from "../services/organisation.service";

  export default {

    name: "WordForms",

    props: {
      showForms:  Array,
    },

    data() {
      return {
        inputText: "",
        wordForm: {
          singular:{IP: "", RP: "", DP: "", VP: "", TP: "",  PP: "",},
          plural:{IP: "", RP: "", DP: "", VP: "", TP: "",  PP: "",},
        },
        wordFormsVisible: false,
      }
    },

    methods: {

      saveForm(){
        this.$emit('saveWordForms', this.wordForm);
        this.wordFormsVisible = false;
      },

      closeForm(){
        this.wordFormsVisible = false;
      },

      showWordForm(){

        this.getWordsForm();
        this.wordFormsVisible = true;
      },

       getWordsForm(){
        let origin =  this.wordForm.singular.IP
        UserService.getWordForms({word: origin}).then(
          (response) => {
            this.wordForm = response.data.result
            this.wordForm.singular.IP = origin
           },
          (error) => {
            console.log(error);
          }
        );
      },
    },

  }

</script>

<style>
  .word_container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .word-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 1rem;
  }
  .btn{
    margin: 1rem;
  }
  .btn-box{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 1rem;
  }
  .modal {

    top: 100px;
    left: 150px;
    right: 0px;
    bottom: 0px;
    display: grid;
    width: 80%;
    height: 80%;
    background: rgba(0,0,0,0.5);
    border-radius: .3rem;
     padding: 20px;
  }

  .form-control{
    width: 80%;
  }

  .modal-content {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: left;
    padding: 2rem;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3rem;
    outline: 0;
  }
</style>