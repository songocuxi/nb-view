import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './feature/farmer/farmer-process/components/example/example.component';
import { SignInComponent } from './feature/authentication/components/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'example', component: ExampleComponent },
  {
    path: 'farmer',
    loadChildren: () =>
      import('../app/feature/farmer/farmer.module').then((x) => x.FarmerModule),
  },
  { path: 'sign-in', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
