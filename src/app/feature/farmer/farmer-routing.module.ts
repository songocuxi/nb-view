import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FarmerComponent } from "./farmer.component";

const routes: Routes = [
    {path: '', component: FarmerComponent,
        children: [
            {path: 'process',
                loadChildren: () => import('../farmer/farmer-process/farmer-process.module').then(x => x.FarmerProcessModule)
            },
            {path: 'notebook',
                loadChildren: () => import('../farmer/farmer-notebook/farmer-notebook.module').then(x => x.FarmerNotebookModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FarmerRoutingModule { }