import api from './api';

class OrganisationService {
  getOrganisations() {
    return api.get('/registrators/me/organisations/');
  };

  getOrganisation(uid) {
      return api.get('/organisations/'+uid);
  };


  patchOrganisation(uid, organisation) {
    return api.patch(
        '/organisations/'+uid+'/',
        organisation
  );
  };

  getDepartments(uid) {

        return api.get('/organisations/'+uid+'/departments/');
  };
  postDepartment(data){
        return api.post('/departments/', data);
    };


    patchDepartment(department) {
        return api.patch(
            '/departments/'+department['id']+'/',
                 department
        );
  }
  getDepartment(org_uid, dep_uid) {
        return api.get('/organisations/'+org_uid+'/departments/'+dep_uid+'/');
  };

  getPosts(uid) {
     return api.get('/organisations/'+uid+'/posts/');
  };

  postPost(data) {
      return api.post('/posts/', data);
  };

  getEmployees(uid) {
        return api.get('/organisations/'+uid+'/employees/');
  };


  getRooms(uid){
      return api.get('/organisations/'+uid+'/rooms/');
  };

  postRoom(uid, data){
      return api.post('/organisations/'+uid+'/rooms/', data);
  };

  postEmployee(data){
    api.post('/employees/', data)
  };

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
