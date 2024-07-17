export interface GetRoleAllInterface {
  id: number;
  role_name: string;
  role_description: string;
  users: [];
  createdAt: string;
  updateAt: string;
}

export interface GetRoleDetailInterface {
  role_name: string;
  role_description: string;
  users: users[];
  createdAt: string;
  updateAt: string;
}

export interface users {
  email: string;
}

export interface FormDataUpdateRoleInterface {
  role_name: string;
  role_description: string;
}
