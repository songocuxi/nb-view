import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { ProcessDetailComponent } from 'src/app/feature/farmer/farmer-process/components/process-detail/process-detail.component';

@Component({
  selector: 'app-update-project-name',
  templateUrl: './update-project-name.component.html',
  styleUrls: ['./update-project-name.component.scss'],
})
export class UpdateProjectNameComponent {
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.updateProjectName();
    this.dialogRef.close();
  }

  updateProjectName() {
    this.projectService.updateProjectById(this.data.projectId).subscribe({
      next: () => {
        console.log('update project name');
      },
      error: () => {
        console.log('error: update project name');
      },
    });
  }
}
