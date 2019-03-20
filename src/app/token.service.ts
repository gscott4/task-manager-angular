import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { TokenData } from './tokendata';
import { UserData } from './userdata';

@Injectable()
export class TokenService {
    
    constructor(private _http : HttpClient) {}

    getToken(userData : UserData) {
        const url : string = 'http://localhost:8080/oauth/token';
        const tokenParameters : HttpParams = new HttpParams()
            .append('grant_type', 'password')
            .append('username', userData.username)
            .append('password', userData.password);
        
        const tokenHeaders : HttpHeaders = new HttpHeaders()
            .append('Authorization', 'Basic ' + btoa('client:secret'));
        
        return this._http.post<TokenData>(
            url,
            {
              withCredentials: true
            },
            {
              params: tokenParameters,
              headers: tokenHeaders
            }
            // Log our response to the console
          );
    }
}