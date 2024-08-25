import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegisterUrl = `${environment.apiBaseUrl}/users/register`;
  private apiLoginUrl = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetailUrl = `${environment.apiBaseUrl}/users/detail`

  private apiConfig = {
    headers: this.createHeaders()
  }

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi'
    });
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegisterUrl, registerDTO, this.apiConfig);
  }

  // helloWorld()

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLoginUrl, loginDTO, this.apiConfig);
  }

  getUserDetail(token: string) {
    debugger;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUserDetailUrl, null, { headers });
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      if (userResponse == null || userResponse == undefined) {
        return;
      }
      const userResponseJSON = JSON.stringify(userResponse);

      localStorage.setItem('user', userResponseJSON);

      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  getUserResponseFromLocalStorage() {
    try {
      if (typeof window === 'undefined' || !localStorage) {
        return null;
      }
      const userResponseJSON = localStorage.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return;
      }
      const userResponse = JSON.parse(userResponseJSON);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  removeUserFromLocalStorage(): void {
    try {
      if (typeof window === 'undefined' || !localStorage) {
        return;
      }
      localStorage.removeItem("user");
      console.log("User date removed from local storage!");

    } catch(error){
      console.error(error);
    }
  }
}
