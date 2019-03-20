import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private _http: HttpClient) {}

  // Authentication that we need to send to OAuth.
  getToken() {
    this._http.post(
      "http://localhost:8080/oauth/token?grant_type=password&username=Grayson&password=123",
      {
        withCredentials: true
      },
      {
        headers: new HttpHeaders({
          Authorization: "Basic " + btoa("client:secret")
        })
      }
      // Log our response to the console
    ).subscribe(res => {console.log(res);this.getUserNameOfToken(res)});
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
