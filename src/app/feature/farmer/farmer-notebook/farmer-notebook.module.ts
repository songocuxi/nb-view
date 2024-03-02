import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebookModificationComponent } from './components/notebook-modification/notebook-modification.component';
import { NotebookViewComponent } from './components/notebook-view/notebook-view.component';
import { FarmerNotenookRoutingModule } from './farmer-notebook-routing.module';
import { FormsModule, NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { ModificationTaskComponent } from './components/notebook-modification/modification-task/modification-task.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





@NgModule({
  declarations: [
    NotebookModificationComponent,
    NotebookViewComponent,
    ModificationTaskComponent
  ],
  imports: [
    CommonModule,
    FarmerNotenookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatDialogModule,
    FontAwesomeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class FarmerNotebookModule { }

