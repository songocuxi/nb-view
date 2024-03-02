import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerProcessComponent } from './farmer-process.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessDetailComponent } from './components/process-detail/process-detail.component';
import { ExampleComponent } from './components/example/example.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatExpansionModule } from '@angular/material/expansion'; //copy tu Angular Material
import { FarmerProcessRoutingModule } from './farmer-process-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { InformationTaskComponent } from './components/process-detail/information-box/information-task/information-task.component';
import { InformationSubtaskComponent } from './components/process-detail/information-box/information-subtask/information-subtask.component';

@NgModule({
  declarations: [
    FarmerProcessComponent,
    ProcessListComponent,
    ProcessDetailComponent,
    ExampleComponent,
    InformationTaskComponent,
    InformationSubtaskComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FarmerProcessRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule, //copy ten đe xuong day,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FarmerProcessModule {}
