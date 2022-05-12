import { Injectable, Inject } from "@angular/core";
import { StorageService } from "../storage.service";
import { GetService } from "../get.service";

@Injectable({
  providedIn: "root",
})
export class DataToRenderService {
  private _storage: StorageService;
  private _getServ: GetService;

  constructor(@Inject(StorageService) _storage: StorageService, @Inject(GetService) _getService: GetService) {
    this._storage = _storage;
    this._getServ = _getService;
  }

  public loadData() {
    const fromStorage = JSON.parse(this._storage.getDataFromLocalStorage());

    if (fromStorage) {
      const data = [...fromStorage];
      return data;
    }
  }
}
