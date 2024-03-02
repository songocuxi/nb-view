import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/core/services/task/task.service';
import { ProcessDetailComponent } from 'src/app/feature/farmer/farmer-process/components/process-detail/process-detail.component';
import { format } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-information-task',
  templateUrl: './information-task.component.html',
  styleUrls: ['./information-task.component.scss'],
})
export class InformationTaskComponent {
  selectedPrerequisites: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProcessDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskSV: TaskService
  ) {
    this.getTaskById();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getTaskById() {
    this.taskSV.getTaskById(this.data.taskId).subscribe({
      next: (data: any) => {
        this.data = {
          ...data,
          taskStartAt: data.taskStartAt ? format(data.taskStartAt) : null,
          taskEndAt: data.taskEndAt ? format(data.taskEndAt) : null,
        };
        // this.getDependencies();
      },
    });
  }

  // getDependencies() {
  //   this.dependencySV.getDependencies().subscribe({
  //     next: (data: any) => {
  //       this.selectedPrerequisites = data;
  //       for (let i = 0; i < this.selectedPrerequisites.length; i++) {
  //         if (this.selectedPrerequisites[i].taskId === this.data.taskId) {
  //           this.selectedPrerequisites[i].taskName = this.data.task.taskName;
  //         }
  //       }
  //     },
  //   });
  // }
}
