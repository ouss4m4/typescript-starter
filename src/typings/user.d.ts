export interface IUserDTO {
  name: string;
  email: string;
  avatar?: string;
}

export interface IUserDomain {
  name: string;
  email: string;
  avatar?: string;
  // todo: Oauth session ids
}
