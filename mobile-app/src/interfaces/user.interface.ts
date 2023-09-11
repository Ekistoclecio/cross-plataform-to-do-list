interface UserSessionInterface {
  name: string;
  lastName: string;
  token: string;
}

interface AuthUserFormInterface {
  name?: string;
  lastName?: string;
  userName: string;
  email?: string;
  password: string;
  repeatPassword?: string;
}
