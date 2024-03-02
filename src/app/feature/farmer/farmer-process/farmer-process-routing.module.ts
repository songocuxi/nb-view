import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessDetailComponent } from './components/process-detail/process-detail.component';
import { ProcessListComponent } from './components/process-list/process-list.component';

const routes: Routes = [
  { path: 'detail', component: ProcessDetailComponent },
  { path: 'list', component: ProcessListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerProcessRoutingModule {}
