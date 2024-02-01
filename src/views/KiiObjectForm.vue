<template>
      <h4>Объект КИИ</h4>
      <div class="row" v-if="isOrganisatonRequest">
        <div class="col-md-10 order-md-1">
          <form class="needs-validation"  @submit.prevent="submit">
            <div class="mb-1">
              <h4>Общие сведения об объекте КИИ</h4>
              <label for="username">Наименование объекта</label>
              <div class="input-group">
                <input type="text" class="form-control" id="full_name" required=""  v-model="organisation.full_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Назначение объекта</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Тип объекта</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Наименование критического процесса, который обеспечивается объектом</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Сфера (область) деятельности, в которой функционирует объект КИИ</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Архитектура объекта КИИ</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >

              <label for="username">Адреса размещения объекта КИИ</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" ><br></div>
            <div class="mb-1" >
              <h4>Сведения о взаимодействии объекта КИИ и сетей электросвязи</h4>
              <label for="username">Категория сети электросвязи или сведения об отсутствии взаимодействия объекта КИИ с сетями электросвязи</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Наименование оператора связи и (или) провайдера хостинга</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Цель взаимодействия с сетью электросвязи</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Способ взаимодействия с сетью электросвязи с указанием типа доступа к сети электросвязи</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Протокол взаимодействия с сетью электросвязи</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>

            <div class="mb-1" >
              <h4>Сведения о лице, эксплуатирующем объект КИИ</h4>
              <label for="username">Наименование лица, эксплуатирующего объект</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Адрес местонахождения лица, эксплуатирующего объект</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Элемент (компонент) объекта КИИ, который эксплуатируется лицом</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">ИНН</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">КПП</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>

            <div class="mb-1" >
              <h4>Сведения о программных и программно-аппаратных средствах, используемых на объекте КИИ</h4>
              <label for="username">Наименование общесистемного программного обеспечения</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Наименование прикладного программного обеспечения</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Применяемые средства защиты информации</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>


            <div class="mb-1" >
              <h4>Сведения об угрозах безопасности информации и категориях нарушителей в отношении объекта КИИ</h4>
              <label for="username">Категория нарушителя:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" >
              <label for="username">Перечень основных угроз безопасности информации:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>

            <div class="mb-1" >
              <h4>Возможные последствия в случае возникновения компьютерных инцидентов</h4>
              <label for="username">Типы компьютерных инцидентов, которые могут произойти в результате реализации угроз безопасности информации, в том числе вследствие целенаправленных компьютерных атак</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
                </div>
            </div>
            <div class="mb-1" >
              <label for="username">Ущерб, который может быть причинен в результате возникновения компьютерных инцидентов, или обоснование отсутствия возможности причинения ущерба вследствие компьютерных инцидентов</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>

            <div class="mb-1" >
              <h4>Организационные и технические меры, применяемые для обеспечения безопасности значимого объекта критической информационной инфраструктуры</h4>
              <label for="username">рганизационные меры, применяемые для обеспечения безопасности значимого объекта критической информационной инфраструктуры</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
                </div>
            </div>
            <div class="mb-1" >
              <label for="username">Технические меры, применяемые для обеспечения безопасности значимого объекта критической информационной инфраструктуры</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="row">
              <div class="offset-md-10">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Сохранить изменения</button>
              </div>
            </div>
          </form>
        </div>
      </div>
</template>

<script>
import UserService from "../services/organisation.service";

export default {
  name: "organisation",
  data() {
    return {
      isOrganisatonRequest: false,
      organisation: {},
      names: [],
      types: [],
      foundation_document: [],
      spheres: [],
    };
  },
  methods: {
    submit() {
      let user = JSON.parse(localStorage.getItem("user"))
      delete  this.organisation.registrator
      UserService.patchOrganisation(user.organisation, this.organisation).then(
          (response) => {
            this.organisations = response.data;
          },
          (error) => {console.log(error);}
      );
    },

    getOrganisation(){
      let user = JSON.parse(localStorage.getItem("user"));
      UserService.getOrganisation(user.organisation).then(
          (response) => {
            this.organisation = response.data;
            this.isOrganisatonRequest = true;
          },
          (error) => {console.log(error);}
      );
    },

    getFoundationDocument(){
      UserService.getFoundationDocument().then(
          (response) => {
            this.foundation_document = response.data;
          },
          (error) => {console.log(error);}
      );
    },
  },

  mounted() {
    this.getOrganisation();
    this.getFoundationDocument();
  },
};

</script>
