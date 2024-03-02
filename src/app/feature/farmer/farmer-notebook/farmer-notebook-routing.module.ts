import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotebookModificationComponent } from "./components/notebook-modification/notebook-modification.component";
import { NotebookViewComponent } from "./components/notebook-view/notebook-view.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';



const routes: Routes = [
    {path: 'modification', component: NotebookModificationComponent},
    {path: 'view', component : NotebookViewComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,MatIconModule,MatDividerModule,MatExpansionModule,MatCheckboxModule]
})

export class FarmerNotenookRoutingModule { }
