import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface WebAppConfig {
  restApiUrl: string;
}
@Injectable({
  providedIn: "root",
})
export class GetService {
  private _http: HttpClient;
  private _someString: string = "Test get z serwera";

  constructor(@Inject(HttpClient) http: HttpClient) {
    this._http = http;
  }

  getRestUrl(): Observable<WebAppConfig> {
    return this._http.get<WebAppConfig>("web.app.config.json");
  }

  get(restApiUrl: string): Observable<any> {
    return this._http.get<any>(restApiUrl);
  }
}
