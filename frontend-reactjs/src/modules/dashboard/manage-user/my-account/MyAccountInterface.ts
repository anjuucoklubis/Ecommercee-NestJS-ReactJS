// types.ts
export interface User {
    email: string;
    createdAt: string;
    updateAt: string;
    userprofile: Userprofile;
    useraddress: Useraddress[];
  }
  
  export interface Userprofile {
    firstname: string;
    lastname: string;
    telephone: string;
  }
  
  export interface Useraddress {
    id: number;
    address_line: string;
    postal_code: string;
    city: string;
    province: string;
    country: string;
    createdAt: string;
    updateAt: string;
    userId: string;
  }
  