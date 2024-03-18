import api from './api';

class OrganisationService {
  getOrganisations() {
    return api.get('/organisations/');
  };

  getOrganisation(uid) {
      return api.get('/organisations/'+uid+'/');
  };

  patchOrganisation(organisation) {
    return api.put(
        '/organisations/'+organisation.id+'/',
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

  postPost(data) {
        return api.post('/posts/', data);
  };

  deletePost(uid) {
      return api.delete('/posts/'+uid+'/');
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

  postEmployee(data){
      return api.post('/employees/', data)
  };

  updateEmployee(data){
      return api.patch('/employees/'+data.id+'/', data)
  };

  deleteEmployee(uid){
      return api.delete('/employees/'+uid+'/');
  };


  getCommissionTypes(){
      return api.get('/ref_books/commission-types/');
  };

  getCommissions(){
        return api.get('/commissions/');
    }
  getCommissionMembers(){
      return api.get('/commission_members/');
  }

  updateCommissionMember(data)
  {
      return api.patch(
          '/commission_members/'+data.id+'/',
          data
      );
  }

  deleteCommissionMember(uid) {
        return api.delete('/commission_members/'+uid+'/');
  };
  getRbResponsibilities(){
        return api.get('/ref_books/responsibilities/');
    };

  getResponsibilities(){
        return api.get('/responsibilities/');
    };
  postResponsibilities(data){
        return api.post('/responsibilities/', data);
  };
  postCommission(data){
        return api.post('/commissions/', data)
    };

  postCommissionMember(data){
      return api.post('/commission_members/', data)
  };

  getKiiObjects(){
      return api.get('/kii/kiis/');
  };

  getKiiObject(uid){
      return api.get('/kii/kiis/'+uid);
  };

  getKiiProcess(uid){
      return api.get('/kii/processes/'+uid);
  };
    getKiiProcesses(){
        return api.get('/kii/processes/');
    };

    updateKiiObject( data){
        return api.patch('/kii/kiis/'+data.id+'/', data)

    };

    addKiiObject(data) {
        return api.post('/kii/kiis/'+data.id+'/', data);
    };


    getKiiObjectElectro(){
        return api.get('/kii/electro/');
    };
    getKiiObjectExploiter(){
        return api.get('/kii/exploiters/');
    };

    updateKiiObjectElectro(data){
        return api.patch('/kii/electro/'+data.id+'/', data)
    };

    addKiiObjectElectro(data){
        return api.post('/kii/electro/', data);
    };

    updateKiiObjectExploiter(data){
        return api.patch('/kii/exploiters/'+data.id+'/', data)
    };

    addKiiObjectExploiter(data){
        return api.post('/kii/exploiters/', data);
    };


}

export default new OrganisationService();
