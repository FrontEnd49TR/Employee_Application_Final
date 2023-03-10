import {LoginData} from '../model/LoginData'
export class AuthService {
    private users: LoginData[] = [
        {username: "user@gmail.com", password: "user"},
        {username: "admin@gmail.com", password: "admin"}
    ];
    login(loginData: LoginData) {
     
      const user = this.users.find(u => loginData.username === u.username);
      if (!user || user.password !== loginData.password) {
        throw 'Wrong credentials';
      }
    }

}