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

  getRbPosts(){
      return api.get('/ref_books/posts/');
  };

  getDepartments(uid) {
      return api.get('/organisations/'+uid+'/departments/');
  };

  postDepartment(uid, data){
      return api.post('/organisations/'+uid+'/departments/', data);
  };

  patchDepartment(department) {
        return api.patch(
            '/departments/'+department['id']+'/',
                 department
        );
  };

  deleteDepartment(uid) {
        return api.delete('/departments/'+uid+'/');
  };

  getPosts(uid) {
     return api.get('/organisations/'+uid+'/posts/');
  };

  patchPosts(post) {
      return api.patch(
          '/posts/'+post['id']+'/',
          post
      );
  };

  postPost(uid, data) {
        return api.post('/organisations/'+uid+'/posts/', data);
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
