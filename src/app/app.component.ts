import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenService } from "./token.service";
import { UserData } from "./userdata";

@Component({
  selector: "app-root",
  providers: [TokenService],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  
  userData : UserData = new UserData();
  tokenService;
  username = '';
  password = '';
  token = '';
  error = '';
  // private _http acts as a shortcut of creating instance variable and setting it to constructor value
  constructor(private _http: HttpClient, tokenService : TokenService) {
    this.tokenService = tokenService;
  }

  // Authentication that we need to send to OAuth.
  getToken() {
    this.tokenService.getToken(this.userData).subscribe(res => {
      this.token = (res.access_token);
      this.error = '';
    }, err => {
      this.token = '';
      this.error = 'ERROR';
    });
  }

  getUserNameOfToken(tokenInfo) {
    this._http.post(
      "http://localhost:8080/api/getUserName",
      {
        withCredentials: true
      },
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + tokenInfo['access_token']
        })
      }
      // Log our response to the console
    ).subscribe(res => console.log(res));
  }
}
