import api from './api';

class OrganisationService {
  getOrganisations() {
    return api.get('/registrators/me/organisations/');
  }

  patchOrganisation(uid, organisation) {
    return api.patch(
        '/organisations/'+uid+'/',
        organisation
  );

  }
  getOrganisation(uid) {
        return api.get('/organisations/'+uid);
    }

    getDepartments(uid) {
        return api.get('/organisations/'+uid+'/departments/');
    }
  getEmployees(uid) {
    console.log('testtt')
    console.log(uid)
     return api.get('/organisations/'+uid+'/employees/');
  }

  postEmployee(){
    api.post('/organisations/employees/',
        {
          "organisation": "62064727-e751-4a9b-9eda-a5045819a2ea",
          "department": null,
          "post": "eb962bce-b7cb-4a95-806a-2c13bcf84b13",
          "surname": "теест",
          "name": "теест",
          "теест": "Житомирович",
          "email": "s.pushkarev@itnov.ru",
          "phone": "1234346425" }
    )
  }

  //
  // getUserBoard() {
  //   return api.get('/test/user');
  // }
  //
  // getModeratorBoard() {
  //   return api.get('/test/mod');
  // }
  //
  // getAdminBoard() {
  //   return api.get('/test/admin');
  // }
}

export default new OrganisationService();
