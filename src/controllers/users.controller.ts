import { usersService } from '../services/users.service';
import { IUserDomain, IUserDTO } from '../typings/user';

class UserController {
  async getUsers(): Promise<IUserDTO[]> {
    const users = await usersService.getUsers();
    return users.map((user) => this.toDTO(user));
  }

  async createUser({
    name = '',
    email = '',
    avatar = '',
  }: IUserDTO): Promise<IUserDTO> {
    // TODO: validation first
    if (!email || !name) {
      throw new Error('Email and Name required');
    }

    const createdUser = await usersService.createUser({ name, email, avatar });

    return this.toDTO(createdUser);
  }

  private toDTO(user: IUserDomain): IUserDTO {
    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }
}

const userController = new UserController();
export { userController };
