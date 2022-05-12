
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns'



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, TreeViewModule, FormsModule, AutoCompleteModule], 
  bootstrap: [AppComponent],
})
export default class AppModule {}
