import { User } from '../../../domain/User';
import { ApiProperty } from '@nestjs/swagger';

export class ListUserResponseDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  phoneNumber: string;

  constructor(user: User) {
    const { id, name, email, role, phoneNumber, lastName } = user.serialize();
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.lastName = lastName;
  }
}
