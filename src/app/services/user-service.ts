import { Injectable, signal } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
   private usersSignal = signal<User[]>([
    {
      username: 'Admin1',
      email: 'Admin1@gmail.com',
      fullName: 'Admin Admin',
      description: 'Admin'
    },
    {
      username: 'Admin 2',
      email: 'Admin2@gmail.com',
      fullName: 'Admin Admin',
      description: 'Admin'
    }
  ]);
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.usersSignal;
  }

  getCharacters(page: number){
    return this.http.get<any>(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
  }

}
