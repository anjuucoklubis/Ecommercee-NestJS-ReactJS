// types.ts
export interface User {
  email: string;
  createdAt: string;
  updateAt: string;
  userprofile: Userprofile;
  useraddress: Useraddress[];
  UserRole: UserRole;
}

export interface UserRole {
  role_name: string;
}

export interface Userprofile {
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  image: string;
  telephone: string;
}

export interface Useraddress {
  id: string;
  full_name: string;
  number_phone: string;
  province: string;
  city: string;
  postal_code: string;
  address_line: string;
  houseOroffice: string;

  createdAt: string;
  updateAt: string;
  userId: string;
}
