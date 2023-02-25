export interface UserLogin {
  username: string;
  password: string;
  enterprise: string;
}

export interface Enterprise {
  id: string;
  name: string;
  logo: string;
  address: string;
  phoneNumber: string;
  createdOn: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  surnames: string;
  identificationNumber: string;
  phone: string;
  photo: string;
  role: {
    name: string;
    isSuperAdmin: boolean;
  };
  enterpriseId: string;
  createdOn: string;
  updatedAt: null;
}

export interface TimePeriod {
  id?: string;
  userId?: string;
  createdOn?: string;
  updatedAt?: string;
  monthId?: string;
  dayId?: string;
  seconds?: number;
}
