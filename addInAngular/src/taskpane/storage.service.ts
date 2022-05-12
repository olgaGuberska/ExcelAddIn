import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private dataFromServer: string = "";
  private _dateOfGetDataRequest: String;
  
  constructor() {}

  setData(dataFromServer): void {
    localStorage.setItem("dataFromServer", JSON.stringify(dataFromServer));
  };

  getDataFromLocalStorage() {
    this.dataFromServer = localStorage.getItem("dataFromServer");
    return this.dataFromServer;
  };

  setRefreshingDate() {
    const date = new Date().toLocaleString();
    localStorage.setItem("dateOfRefreshing", JSON.stringify(date));
  };

  getDateRefreshingFromLocalStorage() {
    this._dateOfGetDataRequest = localStorage.getItem('dateOfRefreshing');
    return this._dateOfGetDataRequest;
  };
};
