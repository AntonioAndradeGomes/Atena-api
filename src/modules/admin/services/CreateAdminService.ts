
interface IRequest{
  username: string;
  mail : string;
  password: string;
}

class CreateAdminService{
  async execute({username, mail, password} : IRequest){
    
  }
}

export {CreateAdminService}
