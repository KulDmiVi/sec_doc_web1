
<template>
      <h4>Объект КИИ</h4>
      <div class="row" v-if="isKiiRequest && isKiiElectroRequest">
        <div class="col-md-10 order-md-1">
          <form class="needs-validation"  @submit.prevent="submit">
            <h4 @click="basic_info_open = !basic_info_open"> + Общие сведения об объекте КИИ </h4>
            <div :class="{selectHide: basic_info_open}">
              <label for="username">Наименование объекта</label>
              <div class="input-group">
                <input type="text" class="form-control" id="name" required=""  v-model="kii_object.name">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: basic_info_open}">
              <label for="username">Назначение объекта</label>
              <div class="input-group">
                <input type="text" class="form-control" id="purpose" v-model="kii_object.purpose">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: basic_info_open}">
              <label>Тип объекта</label>
              <select  class="form-control"  v-model="kii_object.type">
                <option v-for ="type in kii_types">{{type}}</option>
              </select>
            </div>
            <div class="mb-1" :class="{selectHide: basic_info_open}">
              <label>Сфера (область) деятельности, в которой функционирует объект КИИ</label>
              <select  class="form-control"  v-model="kii_object.field_activity">
                <option v-for ="field_activity in kii_field_activities">{{field_activity}}</option>
              </select>
            </div>
            <div class="mb-1" :class="{selectHide: basic_info_open}">
              <label for="username">Архитектура объекта КИИ</label>
              <AdvancedSelect
                  :options="kii_architectures"
                  :value="kii_object.architecture"
                  v-model="kii_object.architecture"
                  class="select"/>
            </div>
            <div class="mb-1" :class="{selectHide: basic_info_open}">
              <label for="username">Адреса размещения объекта КИИ</label>
              <div class="input-group">
                <input type="text" class="form-control" id="address" v-model="kii_object.address">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: basic_info_open}">
              <label for="username">Почтовый индекс</label>
              <div class="input-group">
                <input type="text" class="form-control" id="postcode" v-model="kii_object.postcode">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: basic_info_open}">
              <label for="username">Наименование критического процесса, который обеспечивается объектом</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>



          <h4 @click="electro_info_open = !electro_info_open">+ Сведения о взаимодействии объекта КИИ и сетей электросвязи</h4>
            <div class="mb-1" :class="{selectHide: electro_info_open}">
              <label >Категория сети электросвязи или сведения об отсутствии взаимодействия объекта КИИ с сетями электросвязи</label>
              <AdvancedSelect
                  :options="kii_electro_categories"
                  :value="kii_object_electro.category"
                  v-model="kii_object_electro.category"
                  class="select"/>
            </div>
            <div class="mb-1" :class="{selectHide: electro_info_open}">
              <label for="username">Наименование оператора связи и (или) провайдера хостинга</label>
              <div class="input-group">
                <input type="text" class="form-control" id="operator" v-model="kii_object_electro.operator">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: electro_info_open}">
              <label >Цель взаимодействия с сетью электросвязи</label>
              <AdvancedSelect
                  :options="kii_electro_purposes"
                  :value="kii_object_electro.purpose"
                  v-model="kii_object_electro.purpose"
                  class="select"/>
            </div >
            <div class="mb-1" :class="{selectHide: electro_info_open}">
              <label >Способ взаимодействия с сетью электросвязи с указанием типа доступа к сети электросвязи</label>
              <AdvancedSelect
                  :options="kii_electro_ways"
                  :value="kii_object_electro.way"
                  v-model="kii_object_electro.way"
                  class="select"/>
            </div>
            <div class="mb-1" :class="{selectHide: electro_info_open}">
              <label>Протокол взаимодействия с сетью электросвязи</label>
              <AdvancedSelect
                  :options="kii_electro_protocols"
                  :value="kii_object_electro.protocol"
                  v-model="kii_object_electro.protocol"
                  class="select"/>
            </div>


            <h4 @click="exploiter_info_open = !exploiter_info_open">+ Сведения о лице, эксплуатирующем объект КИИ</h4>
            <div class="mb-1" :class="{selectHide: exploiter_info_open}">
              <label>Наименование лица, эксплуатирующего объект</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="kii_object_exploiter.name">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: exploiter_info_open}">
              <label>Адрес местонахождения лица, эксплуатирующего объект</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="kii_object_exploiters1.adress">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: exploiter_info_open}">
              <label>Элемент (компонент) объекта КИИ, который эксплуатируется лицом</label>
              <TableEditor
                  v-bind:fields="ComponentsFields"
                  v-bind:items="ComponentsData"
                  v-bind:enableEditForm=false
                  @saveRow="addComponent"
                  @updateRow="updateComponent"
                  @deleteRow="deleteComponent"
              />
            </div>
            <div class="mb-1" :class="{selectHide: exploiter_info_open}">
              <label>ИНН</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="kii_object_exploiter.INN">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: exploiter_info_open}">
              <label>КПП</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="kii_object_exploiter.KPP">
              </div>
            </div>

            <h4 @click="tools_info_open = !tools_info_open">+ Сведения о программных и программно-аппаратных средствах, используемых на объекте КИИ</h4>
            <div :class="{selectHide: tools_info_open}">
              <label>Наименование общесистемного программного обеспечения</label>
              <multiselect
                  v-model="os_value"
                  label="name"
                  track-by="code"
                  placeholder="Выберите из списка или добавьте свой вариант"
                  selectLabel = "Нажмите enter для выбора"
                  selectedLabel = "Выбран"
                  deselectLabel = "Нажмите enter для удаления"
                  :options="os_options"
                  :multiple="true"
                  :taggable="true"
                  @tag="addOs">
              </multiselect>
            </div>
            <div :class="{selectHide: tools_info_open}">
                <label>Наименование прикладного программного обеспечения</label>
                <multiselect
                    v-model="software_value"
                    label="name"
                    track-by="code"
                    placeholder="Выберите из списка или добавьте свой вариант"
                    selectLabel = "Нажмите enter для выбора"
                    selectedLabel = "Выбран"
                    deselectLabel = "Нажмите enter для удаления"
                    :options="software_options"
                    :multiple="true"
                    :taggable="true"
                    @tag="addSoftware">
                </multiselect>
            </div>
            <div class="mb-1" :class="{selectHide: tools_info_open}">
              <label>Сведения о средстве защиты информации</label>
              <TableEditor
                  v-bind:fields="SecurityFields"
                  v-bind:items="SecurityData"
                  v-bind:enableEditForm=false
                  @saveRow="addSecurity"
                  @updateRow="updateSecurity"
                  @deleteRow="deleteSecurity"
              />
            </div>

            <h4 @click="treats_info_open = !treats_info_open">+ Сведения об угрозах безопасности информации и категориях нарушителей в отношении объекта КИИ</h4>
            <div class="mb-1" :class="{selectHide: treats_info_open}">
              <label for="username">Категория нарушителя:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>
            <div class="mb-1" :class="{selectHide: treats_info_open}">
              <label for="username">Перечень основных угроз безопасности информации:</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>

            <h4 @click="damages_info_open = !damages_info_open">+ Возможные последствия в случае возникновения компьютерных инцидентов</h4>
            <div class="mb-1" :class="{selectHide: damages_info_open}">
              <label for="username">Типы компьютерных инцидентов, которые могут произойти в результате реализации угроз безопасности информации, в том числе вследствие целенаправленных компьютерных атак</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
                </div>
            </div>
            <div class="mb-1" :class="{selectHide: damages_info_open}" >
              <label for="username">Ущерб, который может быть причинен в результате возникновения компьютерных инцидентов, или обоснование отсутствия возможности причинения ущерба вследствие компьютерных инцидентов</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>

            <h4 @click="measures_info_open = !measures_info_open">+ Организационные и технические меры, применяемые для обеспечения безопасности значимого объекта критической информационной инфраструктуры</h4>
            <div class="mb-1" :class="{selectHide: measures_info_open}">
              <label for="username">рганизационные меры, применяемые для обеспечения безопасности значимого объекта критической информационной инфраструктуры</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
                </div>
            </div>
            <div class="mb-1" :class="{selectHide: measures_info_open}">
              <label for="username">Технические меры, применяемые для обеспечения безопасности значимого объекта критической информационной инфраструктуры</label>
              <div class="input-group">
                <input type="text" class="form-control" id="short_name" v-model="organisation.short_name">
              </div>
            </div>



            <div class="mb-1" >
              <h4> TEST TREEE</h4>

              <TreeItem
                 v-bind:nodes = "kii_incident_damages"
              />

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
import AdvancedSelect from '@/components/AdvancedSelect.vue';
import TableEditor from '@/components/VueEditortable.vue';

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

export default {
  name: "organisation",
  components: {
    AdvancedSelect,
    TableEditor,
    Multiselect,
  },
  data() {
    return {
      basic_info_open: true,
      electro_info_open: true,
      exploiter_info_open: true,
      tools_info_open: true,
      treats_info_open: true,
      damages_info_open: true,
      measures_info_open: true,

      os_value: [   ],
      os_options: [
          { name: 'Windows71', code: 'Windows7' },
          { name: 'CentOS1', code: 'CentOS' },
          { name: 'AltLinux1', code: 'AltLinux' }
      ],

      selected_damage: [],
      software_value: [  ],
      software_options: [  ],
      isOrganisatonRequest: false,
      isKiiRequest: false,
      isKiiElectroRequest: false,
      isKiiObjectExploiterRequest: false,

      kii_object: {},
      kii_object_electro: {},
      kii_object_exploiter: {},

      //test
      kii_object_exploiters1: {},

      kii_object_exploiters_components:{},

      kii_architectures: [],
      kii_field_activities: [],
      kii_types:[],
      kii_electro_categories:[],
      kii_electro_purposes:[],
      kii_electro_ways:[],
      kii_electro_protocols:[],
      kii_incident_damages: {},
      ComponentsFields: [
         { key: "name", label: "Наименование", class: 'form-control', type: 'text', teg: 'input'},
         { key: "count", label: "Количество", class: 'form-control', type: 'text', teg: 'input'},
      ],
      ComponentsData: [
        {name: "центр обработки данных", count: '1'},
        {name: "серверное оборудование", count: '1'},
        {name: "автоматизированные рабочие места", count: '1'},
        {name: "средства беспроводного доступа", count: '1'},
        {name: "технологическое оборудование", count: '1'},
        {name: "производственное оборудование (исполнительные устройства)", count: '1'},
        {name: "иные элементы (компоненты)", count: '1'},
      ],

      SecurityFields: [
        { key: "type", label: "Тип", class: 'form-control', type: 'text', teg: 'input'},
        { key: "name", label: "Наименование", class: 'form-control', type: 'text', teg: 'input'},
        { key: "sertificate", label: "Сведения о сертификате", class: 'form-control', type: 'text', teg: 'input'},
        { key: "serial_number", label: "Серийный номер (заводской номер)", class: 'form-control', type: 'text', teg: 'input'},
        { key: "number", label: "Номер знака соответствия", class: 'form-control', type: 'text', teg: 'input'},
      ],
      SecurityData: [
        {type: "Средство защиты информации от несанкционированного доступа",
          name: 'bdhsbhjkhjkhgjkhkhkh',
          sertificate: '10.12.2024 выдан edkmwfhjiwerqgiofutjmc bjhzgd',
          serial_number: "serial_number",
          number: "1234657890"

        },

      ],


      organisation:{},
      spheres: [],
    };
  },


  methods: {

    changeSelectedDamage1() {
      console.log("change_selected_damage");
    },

    submit() {
      this.saveKiiObject();
      this.saveKiiObjectElectro();
      this.saveKiiObjectExploiter();
    },

    addOs (newTag) {
      const tag = {
        name: newTag,
        code: newTag
      }
      this.os_options.push(tag)
      this.os_value.push(tag)
    },

    addSoftware (newTag) {
      const tag = {
        name: newTag,
        code: newTag
      }
      this.software_options.push(tag)
      this.software_value.push(tag)
    },

    getKiiObject(){
      UserService.getKiiObject(this.$route.params.uid).then(
          (response) => {
            this.kii_object = response.data;
            this.isKiiRequest = true;
          },
          (error) => {console.log(error);}
      );
    },

    getKiiObjectElectro(){
      UserService.getKiiObjectElectro().then(
          (response) => {
            this.kii_object_electro = response.data[0];
            if(this.kii_object_electro.length == 0){
              this.kii_object_electro = {}
            }
            this.isKiiElectroRequest = true;
          },
          (error) => {console.log(error);}
      );
    },

    getKiiObjectExploiter(){
      UserService.getKiiObjectExploiter().then(
          (response) => {
            this.kii_object_exploiter = response.data[0];
            if(this.kii_object_exploiter.length == 0){
              this.kii_object_exploiter = {}
            }
            this.isKiiObjectExploiterRequest = true;
          },
          (error) => {console.log(error);}
      );
    },

    saveKiiObject(){
      console.log(this.selected_damage)
      if (this.kii_object.id){
        UserService.updateKiiObject(this.kii_object).then(
            (response) => {
              if(response.length > 0) {
                this.kii_object = response.data;
                return this.kii_object.id
              }
            },
            (error) => {console.log(error);}
        );
      }
      else{
        UserService.addKiiObject(this.kii_object).then(
            (response) => {
              this.kii_object = response.data;
              return this.kii_object.id;
            },
            (error) => {console.log(error)}
        )
      }

    },

    saveKiiObjectElectro(){
      if(this.kii_object_electro.id){
        UserService.updateKiiObjectElectro(this.kii_object_electro).then(
            (response) => {
              console.log('123');
            },
            (error) => {console.log(error);}
        );
      }
      else{
        this.kii_object_electro.kii = this.kii_object.id;
        UserService.addKiiObjectElectro(this.kii_object_electro).then(
            (response) => {
               console.log('123');
            },
            (error) => {console.log(error);}
        );
      }
      },

    saveKiiObjectExploiter(){
      if(this.kii_object_exploiter.id){
        UserService.updateKiiObjectExploiter(this.kii_object_exploiter).then(
            (response) => {
              console.log('123');
            },
            (error) => {console.log(error);}
        );
      }
      else{
        this.kii_object_exploiter.kii = this.kii_object.id;
        UserService.addKiiObjectExploiter(this.kii_object_exploiter).then(
            (response) => {
              console.log('123');
            },
            (error) => {console.log(error);}
        );
      }
    },

    getKiiArchitectures(){
      let temp_data = JSON.parse(localStorage.getItem("architectures"))
      for (var key in temp_data) {
        this.kii_architectures.push(temp_data[key].value);
      }
    },

    getKiitypes(){
      let temp_data = JSON.parse(localStorage.getItem("types"))
      for (var key in temp_data) {
        this.kii_types.push(temp_data[key].value);
      }
    },

    getKiiElectroCategories(){
      let temp_data = JSON.parse(localStorage.getItem("electro-categories"))
      for (var key in temp_data) {
          this.kii_electro_categories.push(temp_data[key].value);
      }
    },

    getKiiElectroPurposes(){
      let temp_data = JSON.parse(localStorage.getItem("electro-purposes"))
      for (var key in temp_data) {
        this.kii_electro_purposes.push(temp_data[key].value);
      }
    },

    getKiiElectroWays(){
      let temp_data = JSON.parse(localStorage.getItem("electro-ways"))
      for (var key in temp_data) {
        this.kii_electro_ways.push(temp_data[key].value);
      }
    },

    getKiiElectroProtocols(){
        let temp_data = JSON.parse(localStorage.getItem("electro-protocols"))
        for (var key in temp_data) {
          this.kii_electro_protocols.push(temp_data[key].value);
        }
    },

    getKiiFieldActivities(){
      let temp_data = JSON.parse(localStorage.getItem("field-activities"))
      for (var key in temp_data) {
        this.kii_field_activities.push(temp_data[key].value);
      }

    },

    getKiiIncidentDamages(){
      this.kii_incident_damages = JSON.parse(localStorage.getItem("incident-damages"))
    },

    makeFolder(item) {
        console.log('132')
    },
  },

  mounted() {

    this.getKiitypes();
    this.getKiiFieldActivities();
    this.getKiiArchitectures();
    this.getKiiElectroCategories();
    this.getKiiElectroPurposes();
    this.getKiiElectroWays();
    this.getKiiElectroProtocols();
    this.getKiiObjectElectro();
    this.getKiiObject();
    this.getKiiObjectExploiter();
    this.getKiiIncidentDamages();

  },
};

</script>

<style scoped>
.selectHide {
  display: none;
}
</style>