import api from './api';

class OrganisationService {
  getOrganisations() {
    return api.get('/organisations/');
  };

  getOrganisation(uid) {
      return api.get('/organisations/'+uid+'/');
  };

  patchOrganisation(uid, organisation) {
    return api.put(
        '/organisations/'+uid+'/',
        organisation
    );
  };

  getRbPosts(){
      return api.get('/ref_books/posts/');
  };

  getDepartments() {
      return api.get('/departments/');
  };

  postDepartment(uid, data){
      return api.post('/departments/', data);
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

  getPosts() {
     return api.get('/posts/');
  };

  patchPosts(post) {
      return api.patch(
          '/posts/'+post['id']+'/',
          post
      );
  };

  postPost(uid, data) {
        return api.post('/posts/', data);
  };


  getRooms(){
      return api.get('/rooms/');
  };

  postRoom(data){
      return api.post('/rooms/', data);
  };

    getEmployees(){
        return api.get('/employees/')
    };

  postEmployee(uid, data){
      return api.post('/employees/', data)
  };



  getSpheres(){
      return api.get('/ref_books/org_spheres/');
  };

  getTypes(){
      return api.get('/ref_books/org_types/');
  };
  getFoundationDocument(){
      return api.get('/ref_books/foundation-documents/');
  };

  getCommissionTypes(){
      return api.get('/ref_books/commission-types/');
  };

    getResponsibilities(){
        return api.get('/ref_books/responsibilities/');
    };

  getNames(){
      return api.get('/ref_books/org_names/');
  };

}

export default new OrganisationService();
