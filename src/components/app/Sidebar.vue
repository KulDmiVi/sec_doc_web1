<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
    <div class="sd-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Справочники</span>
        <a class="d-flex align-items-center text-muted" href="#"> </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link"
             href="#">
            Организация
          </a>
          <ul class="flex-column ms-1" id="org-submenu">
            <router-link
                v-for="link in org_links"
                class="nav-item"
                :key="link.url"
                tag="li"
                active-class="active"
                :to="link.url"
                :exact="link.exact"

            >
              <a class="nav-link" href="#">{{link.title}}</a>
            </router-link>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Комиссии
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Объекты КИИ
          </a>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Документы</span>
        <a class="d-flex align-items-center text-muted" href="#"> </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <a class="nav-link" href="#">
            КИИ
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            ПДН
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import localizeFilter from '@/filters/localize.filter'
export default {
//   props: ['value'],
  data: () => ({
     org_links: [
       {title: 'Реквизиты', url: '/organisation', exact: true },
       {title: 'Подразделения', url: '/departments' },
       {title: 'Сотрудники', url: '/employees' },
       {title: 'Должности', url: '/posts' },
       {title: 'Помещения', url: '/rooms' },
     ]
    })
  }
</script>



