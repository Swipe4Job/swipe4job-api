import { User } from '../../../domain/User';

export class UsersListResponseDTO {
  id: string;
  name: string;
  walletAddress?: string;
  email: string;
  role: string;
  phoneNumber: string;

  constructor(user: User) {
    const { id, name, email, role, phoneNumber } = user.serialize();
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }
}
