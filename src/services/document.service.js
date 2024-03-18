import api from './api/';

class DocumentsService {
  getPackages() {
    return api.get('/docs/packages/');
  };
  getTemplates() {
    return api.get('/docs/templates/');
  };
  getTemplateVersions() {
      return api.get('/docs/template-versions/');
  };
  getPackageResults(){
      return api.get('/docs/package-results/');
  };
  getBuildResults() {
      return api.get('/docs/build-results/');
  };
  documentBuild(data){
      return api.post('/docs/document-build/', data);
  };
  packageBuild(data) {
      return api.post('/docs/package-build/', data);
  };
}

export default new DocumentsService();
