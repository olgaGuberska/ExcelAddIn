import { Component, OnInit, Inject, OnChanges, OnDestroy } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { GetService } from "../get.service";
import { StorageService } from "../storage.service";
import { DataToRenderService } from "./dataToRender.service";

export interface Countries {
  city: string;
  country: string;
  id: number;
  iso3: string;
  population: number;
}

@Component({
  selector: "app-home",
  template: require("./app.component.html").default,
})
export class AppComponent implements OnChanges, OnDestroy, OnInit {
  private _getServ: GetService;
  private _storage: StorageService;
  private _dataToRender: DataToRenderService;
  private _getDataRequestObs$: Subscription;
  private _getWebAppConfigRequestObs$: Subscription;
  public dateOfRefreshing: String;
  public text: string;
  public data: any = [];
  public dataFromSQL: Array<Object> = [];
  public field: Object;
  public shown: boolean = false;
  public name: string = "";
  public pushedIdNameToMakeItFLat: Object = {};
  public autocompleteCategories: { [key: string]: Object }[] = [];
  public fieldsVeg: Object = { value: "City" };
  public searchText: string = "";
  public width: string = "400px";
  public height: string = "500px";
  public text2: string = "Find a city";

  public appMainInstructions: string = "Search for a city:";
  public appMainInstructions2: string = "Or choose one from the list:";
  public appName: string= "City Aggregator";
  public searchInputPlaceHolder: string = "Enter a city";

  @ViewChild("tree") tree;
  @ViewChild("auto") auto;

  constructor(
    @Inject(GetService) _getService: GetService,
    @Inject(StorageService) _storage: StorageService,
    @Inject(DataToRenderService) _dataToRender: DataToRenderService
  ) {
    this._getServ = _getService;
    this._storage = _storage;
    this._dataToRender = _dataToRender;
    this.dateOfRefreshing = _storage.getDateRefreshingFromLocalStorage();
    this.dataFromService();
  }

  public ngOnInit(): void {}
  public ngOnChanges(): void {}
  public ngOnDestroy(): void {
    this._getDataRequestObs$.unsubscribe();
    this._getWebAppConfigRequestObs$.unsubscribe();
  }

  public passDataToTreeComponent(dataPassed): Array<Object> {
    this.dataFromSQL = [...dataPassed];
    this.field = { dataSource: this.dataFromSQL, id: "id", text: "name", child: "subChild", tooltip: "tooltip" };
    this.shown = true;
    this.flatteringDataById(this.dataFromSQL);
    return this.dataFromSQL;
  }

  public serverRequest(): void {
    this._getWebAppConfigRequestObs$ = this._getServ.getRestUrl().subscribe((config) => {
      this._getDataRequestObs$ = this._getServ.get(config.restApiUrl).subscribe((result) => {
        this._storage.setData(result);
        this.passDataToTreeComponent(result);
        this._storage.setRefreshingDate();
        this.dateOfRefreshing = this._storage.getDateRefreshingFromLocalStorage();
        return this.dataFromSQL;
      });
    });
  }

  public dataFromService() {
    let data = this._dataToRender.loadData();
    if (data) {
      this.shown = true;
      this.passDataToTreeComponent(data);
      return;
    }
    this.serverRequest();
  }

  public flatteringDataById(dataToFlat) {
    const dataFromServisToFlat = [...dataToFlat];
    dataFromServisToFlat.forEach((el, index1) => {
      if (el.hasOwnProperty("id")) {
        let idVal = el["id"];
        let state = { State: el["name"] };
        let nameVal = el["name"];
        this.pushedIdNameToMakeItFLat[idVal] = el["name"];
        this.pushedIdNameToMakeItFLat[nameVal] = el["name"];

        if (el.hasOwnProperty("subChild")) {
          let el2leyer = el["subChild"];
          el2leyer.forEach((el2, index2) => {
            if (el2.hasOwnProperty("id")) {
              let idVal2 = el2["id"];
              let county = { ...state };
              county["County"] = el2["name"];
              this.pushedIdNameToMakeItFLat[idVal2] = el2["name"];

              state["County"] = el2["name"];
              if (el2.hasOwnProperty("subChild")) {
                let el3layer = el2["subChild"];
                el3layer.forEach((el3, index3) => {
                  if (el3.hasOwnProperty("id")) {
                    let idVal3 = el3["id"];
                    let cityVal = el3["name"];
                    let city = { ...county };
                    city["City"] = el3["name"];

                    this.autocompleteCategories.push(city);
                    this.pushedIdNameToMakeItFLat[idVal3] = el3["name"];
                    this.pushedIdNameToMakeItFLat[cityVal] = el3["name"];
                  }
                });
              }
            }
          });
        }
      }
    });
  }

  public findNameById(id): string {
    const valById = this.pushedIdNameToMakeItFLat[id];
    return valById;
  }

  public onDblAutoComplete(): void {
    const id = this.auto.angularValue;
    this.writeDataToExcelCell(id);
  }

  public onDblTreeComponent(): void {
    const id = this.tree.selectedNodes;
    this.writeDataToExcelCell(id);
  }

  public async writeDataToExcelCell(id) {
    const value = this.findNameById(id);

    try {
      await Excel.run(async (context) => {
        const rangeCell = context.workbook.getActiveCell();

        // Read the range address - first load
        rangeCell.load("address");
        rangeCell.values = [[value]];
        await context.sync();
      });
    } catch (error) {
      console.error(error);
    };
  };
};
