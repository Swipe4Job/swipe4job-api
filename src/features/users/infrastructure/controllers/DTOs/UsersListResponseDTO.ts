import { User } from '../../../domain/User';

export class UsersListResponseDTO {
  id: string;
  name: string;
  walletAddress?: string;
  email: string;
  role: string;
  phoneNumber: string;
  enabled: boolean;

  constructor(user: User) {
    const { id, name, walletAddress, email, role, phoneNumber, enabled } =
      user.serialize();
    this.id = id;
    this.name = name;
    this.walletAddress = walletAddress;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.enabled = enabled;
  }
}
