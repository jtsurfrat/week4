namespace login.Services {

  export class UserLoginService {
    private UserResource;

    public get(id){
      return this.UserResource.get({id:id});
    }
    constructor($resource:ng.resource.IResourceService){
      this.UserResource = $resource('/api/myLogin/id');
    }
  }
}
