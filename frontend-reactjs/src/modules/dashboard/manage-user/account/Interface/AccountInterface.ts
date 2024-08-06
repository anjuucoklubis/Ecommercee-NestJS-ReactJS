export interface GetAllUserInterface {
  id: string;
  email: string;
  UserRole: UserRole;
  userprofile: userprofile;
  useraddress: Useraddress[];
  createdAt: string;
  updateAt: string;
}

export interface UserRole {
  id: number;
  role_name: string;
  role_description: string;
  createdAt: string;
  updateAt: string | null;
}

export interface userprofile {
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  telephone: string;
  image: string;
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
