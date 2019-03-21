import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todoList = [];

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    const token = sessionStorage.getItem("jsessionid");
    console.log(token);
    if (token != null || JSON.parse(token).expires_in < new Date().getTime()) {
      const url: string = "http://localhost:8080/getTasks";
      const getTaskHeaders: HttpHeaders = new HttpHeaders().append(
        "Authorization",
        "Bearer" + JSON.parse(token).access_token
      );
      this.http
        .post(
          url,
          {
            withCredentials: true
          },
          {
            headers: getTaskHeaders
          }
        )
        .subscribe(res => {
          console.log(res);
          for(let i = 0; ; i++) {
            if(res[i] == null) {
              break;
            }
            this.todoList.unshift(res[i].task)
          }
        });
    }
  }

  addItem(task: string, token: string) {
    this.todoList.unshift(task);

    const url: string = "http://localhost:8080/insertTask";
    const insertTaskParameters: HttpParams = new HttpParams().append(
      "task",
      task
    );

    const insertTaskHeaders: HttpHeaders = new HttpHeaders().append(
      "Authorization",
      "Bearer" + token
    );

    this.http
      .post(
        url,
        {
          withCredentials: true
        },
        {
          params: insertTaskParameters,
          headers: insertTaskHeaders
        }
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
