<template>
  <h4>Документы</h4>
  <div lass="col-md-3 order-md-1"
  v-if="isPackagesRequest &&
  isTemplatesRequest &&
  isTemplateVersionsRequest &&
  isPackageResultsRequest &&
  isBuildResultsRequest"
  >
    <button class="btn btn-primary" @click="buildPackage()">Сформировать пакет</button>
    <div v-for="template in templates">
      {{template.name}}
      <button class="btn btn-primary" @click="buildTemplate(template.id)">Сформировать документ</button>
    </div>

    <table bordеr="1">
      <tr >
        <th width = "30%"> Ссылка на файл</th>
        <th> UID Пакета</th>
        <th> UID шаблона</th>
        <th> UID версии шаблона</th>
      </tr>
      <tr v-for = "document in buildResults">
        <td><a v-bind:href="document.file">{{document.file}}</a></td>
        <td>{{document.package}}</td>
        <td>{{document.template}}</td>
        <td>{{document.version}}</td>
      </tr>
    </table>
<br><br><br><br><br><br>


    {{packages}}<br>
    {{templates}}<br>
    {{templateVersions}}<br>
    {{packageResults}}<br>
    {{buildResults}}<br>


  </div>
</template>

<script>
import DocumentsService from "../../services/document.service.js";

export default {
  name: "documents",
  data() {
    return {
      packages: {},
      templates: {},
      templateVersions: {},
      packageResults: {},
      buildResults: {},

      isPackagesRequest: false,
      isTemplatesRequest: false,
      isTemplateVersionsRequest: false,
      isPackageResultsRequest: false,
      isBuildResultsRequest: false,

    };
  },

  methods: {

    buildTemplate(template_id){
      let data = {}
      data['template_id'] = template_id
      console.log(data)
      DocumentsService.documentBuild(data).then(
          response => {
            console.log(response.data);
          },
          error => {
            console.log(error);
          }
      )
    },

    buildPackage(){
      let data = {}
      data['document_package_id'] = "d2850777-24ef-44c8-9630-1e92cb96d504"
      console.log(data)
      DocumentsService.packageBuild(data).then(
          response => {
            console.log(response.data);
          },
          error => {
            console.log(error);
          }
      )
    },

    getPackages(){
      DocumentsService.getPackages().then(
          (response) => {
            this.packages = response.data;

            this.isPackagesRequest = true;
          },
          (error) => {console.log(error);}
      );
    },
    getTemplates(){
      DocumentsService.getTemplates().then(
          (response) => {
            this.templates = response.data;

            this.isTemplatesRequest = true;
          },
          (error) => {console.log(error);}
      );
    },
    getTemplateVersions(){
      DocumentsService.getTemplateVersions().then(
          (response) => {
            this.templateVersions = response.data;

            this.isTemplateVersionsRequest = true;
          },
          (error) => {console.log(error);}
      );
    },
    getPackageResults(){
      DocumentsService.getPackageResults().then(
          (response) => {
            this.packageResults = response.data;

            this.isPackageResultsRequest = true;
          },
          (error) => {console.log(error);}
      );
    },

    getBuildResults(){

      DocumentsService.getBuildResults().then(
          (response) => {
            this.buildResults = response.data;
            this.isBuildResultsRequest = true;
          },
          (error) => {console.log(error);}
      );
    },



  },

  mounted() {
    this.getPackages();
    this.getTemplates();
    this.getTemplateVersions();
    this.getPackageResults();
    this.getBuildResults();
  },
};

</script>
