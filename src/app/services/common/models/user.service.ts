import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { access } from 'fs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService) { }

  async create(user:User) : Promise<Create_User>{
   const observable : Observable<Create_User | User> =  this.httpClientService.post<Create_User | User>({
      controller:"users",
    },user);
   return await firstValueFrom(observable) as Create_User;
  }
}
