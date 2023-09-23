export interface Account {
  id: number;
  email: string;
  password: string;
  phone: string;
  fullname: string;
  birthday: Date;
  gender: boolean;
  address: string;
  createAt: Date;
  updateAt: Date;
  errorCount: number;
  bannedTime: Date;
  active: boolean;
}
