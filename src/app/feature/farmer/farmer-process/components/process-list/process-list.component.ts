import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ConfirmBoxModalService } from 'src/app/core/services/confirm-box-modal.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss'],
})
export class ProcessListComponent {
  faPlus = faPlus;
  personalProcessBool: Boolean = false; //true: co quy trinh, false: chua co quy trinh
  projectList: Array<any> = []; //template 
  projectListByCreatorId: Array<any> = []; //project cua nguoi dung

  deletedProject: any;

  currentAction: string;

  constructor(
    private confirmSV: ConfirmBoxModalService,
    private projectSV: ProjectService,
    private authenSV: AuthenticationService,
    private localStorageSV: LocalStorageService,
    private router: Router
  ) {
    this.confirmSV.getMessage().subscribe((data) => {
      console.log('data: ', data);
      if(this.currentAction=="addnew") {
        if (data.action == 'close') {
          if (data.acceptance) {
            this.addNewProcess2();
          }
        }
      }
    });


    this.projectSV.getAllProjectByCreatorId(this.localStorageSV.getItem('userId')).subscribe((data: any) => {
      console.log("project list by creator id: ", data);
      if(data.length!=0) {
        this.projectListByCreatorId = data;
        this.personalProcessBool = true;
      } 
      this.projectSV.getProjectIstemplate().subscribe((data: any) => {
        this.projectList = data;
        console.log("project template: ", data);
      })
    })

    

  }

  confirmAddNewProcess(process: any) {
    this.currentAction = "addnew";
    this.confirmSV.sendMessage({
      isDisplay: true,
      message: {
        title: `${process.projectName}`,
        description: 'Bạn có muốn thêm quy trình này không?',
      },
    });
  }

  openTemplateProcessPage() {
    this.personalProcessBool = false;
  }

  addNewProcess2() {
    console.log('Add new process');
  }

  getAllProject() {
    this.projectSV.getAllProject().subscribe({
      next: (data: any) => {
        this.projectList = data;
        console.log('data:', this.projectList);
      },
      error: () => {
        console.log('error: getAllProject');
      },
    });
  }

  openProjectDetail(projectId: any) {
    this.localStorageSV.setItem("project", {projectId: projectId});
    this.router.navigateByUrl(`/farmer/process/detail`)
  }

  confirmDeleteProcess(process: any) {
    this.deletedProject = process;
    this.confirmSV.sendMessage({
      isDisplay: true,
      message: {
        title: `${process.projectName}`,
        description: 'Bạn có muốn xóa quy trình này không?',
      },
    });
  }

  deleteProcess(projectId: any) {
    
  } 
}
