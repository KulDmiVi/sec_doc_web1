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
            <router-link
                class="nav-item"
                id="commissions"
                key="/commissions"
                tag="li"
                active-class="active"
                to="/commissions">
              <a class="nav-link" href="#">Коммиссии</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                class="nav-item"
                id="responsibilities"
                key="/responsibilities"
                tag="li"
                active-class="active"
                to="/responsibilities">
              <a class="nav-link" href="#">Ответственные</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                class="nav-item"
                id="kii"
                key="/kii_objects"
                tag="li"
                active-class="active"
                to="/kii_objects">
              <a class="nav-link" href="#"> Объекты КИИ</a>
             </router-link>
          </li>
          <li class="nav-item">
            <router-link
                class="nav-item"
                id="docs"
                key="/documents"
                tag="li"
                active-class="active"
                to="/documents">
              <a class="nav-link" href="#">Документы</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
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

    };
  },

};
</script>