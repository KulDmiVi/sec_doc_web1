<template>
  <!-- The sidebar component contains the main menu and other important links for the application. -->
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
    <div class="sd-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <!-- The sidebar heading contains the name of the section and a link to the section's page. -->
        <ul class="nav" >
          <li class="nav-item">
            <a class="btn btn-primary active"
             data-bs-toggle="collapse"
             href="#org-submenu"
             aria-expanded="true"
             aria-controls="org-submenu">
             Организация
            </a>
            <ul class="flex-column ms-1">
              <router-link
                v-for="link in org_links"
                class="nav-item"
                id="org-submenu"
                :key="link.url"
                tag="li"
                active-class="active"
                :to="link.url"
                :exact="link.exact">
                <a class="nav-link" href="#">{{link.title}}</a>
              </router-link>
            </ul>
          </li>
          <li class="nav-item">
            <a class="btn btn-primary active"
               data-bs-toggle="collapse"
               href="#commission-submenu"
               aria-expanded="false"
               aria-controls="commission-submenu">
              Комиссии
            </a>
            <ul class="flex-column ms-1" >
              <router-link
                v-for="link in commissionTypes"
                id="commission-submenu"
                class="nav-item"
                :key="link.url"
                tag="li"
                active-class="active"
                :to="link.url"
                :exact="link.exact">
                <a class="nav-link" href="#">{{link.title}}</a>
              </router-link>
            </ul>
          </li>
          <li class="nav-item">
            <a class="btn btn-primary active"
               data-bs-toggle="collapse"
               href="#resp-submenu"
               aria-expanded="false"
               aria-controls="resp-submenu">Ответственные</a>
            <ul class="flex-column ms-1">
              <router-link
                v-for="link in responsibilities"
                class="nav-item"
                id="resp-submenu"
                :key="link.url"
                tag="li"
                active-class="active"
                :to="link.url"
                :exact="link.exact">
                <a class="nav-link" href="#">{{link.title}}</a>
              </router-link>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Объекты КИИ</a>
          </li>
        </ul>
      </div>
    </div>
</template>



<script>
import OrganisationService from "@/services/organisation.service";


export default {
  name: "sidebar",

  data() {
    return {
      org_links: [
        {title: 'Реквизиты', url: '/organisation', exact: true},
        {title: 'Подразделения', url: '/departments'},
        {title: 'Сотрудники', url: '/employees'},
        {title: 'Должности', url: '/posts'},
        {title: 'Помещения', url: '/rooms'},
      ],
      kii_links: [],
      commissionTypes: [],
      responsibilities: [],
      isCommissionRequest: false,
      isResponsibleRequest: false,
    };
  },

  methods: {
    getCommissionTypes(){
      OrganisationService.getCommissionTypes().then(
          (response) => {
            this.commissionTypes = response.data.map(item => ({title: item['value'], url:"/commissions/"+item['id'] }));
            console.log(this.commissionTypes )
            this.isCommissionRequest = true;
          },
          (error) => {
            console.log(error);
          }
      );
    },
    getResponsibilities(){
      OrganisationService.getResponsibilities().then(
          (response) => {
            this.responsibilities = response.data.map(item => ({title: item['value'], url:'/responsibilities' }));
            this.isResponsibleRequest = true;
          },
          (error) => {
            console.log(error);
          }
      );
    }
  },
  created(){
    this.getCommissionTypes();
    this.getResponsibilities();
  },
  mounted() {
    // eslint-disable-next-line no-new
    // new Collapse(this.$refs.menuCollapse, { toggle: false })
  },
};
</script>