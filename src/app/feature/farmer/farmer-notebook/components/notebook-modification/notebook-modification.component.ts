import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModificationTaskComponent } from './modification-task/modification-task.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FieldService } from 'src/app/core/services/field/field.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';

@Component({
  selector: 'app-notebook-modification',
  templateUrl: './notebook-modification.component.html',
  styleUrls: ['./notebook-modification.component.scss']
})

export class NotebookModificationComponent implements OnInit {

  faArrowLeft=faArrowLeft;

  panelOpenState = true;
  faTrash=faTrash;

  listDataField: any;

  isDispleyAddNewForm = false;

  newField : any = {
      fieldName: '',
      fieldTypeId: 1,
      fieldTaskIds: [],
      isEdited: true
  }

  fieldIsEditing: any = {
    fieldName: '',
    fieldTypeId: 1,
    fieldTaskIds: [],
    isEdited: true
}
  fieldList: Array<any> = [
    {
      fieldName: 'Chất lượng giống',
      fieldTypeId: 1,
      fieldTaskIds: [],
      isEdited: true
    }
  ];

  fieldListId: any = [];
  fieldListIdBackup: any = [];

  taskNameList: any = [];
  taskList: any;

  test: string = "abc"

  fieldListBackup : any = [];

  notebookId: any;

  
  constructor(public dialog: MatDialog,
              private fieldSV: FieldService,
              private localStorageSV: LocalStorageService,
              private taskSV: TaskService,
              private router: Router,
              private toastSV: ToastBoxModalService
  ) {
    this.notebookId = this.localStorageSV.getItem("notebook")?.notebookId;
    this.fieldSV.getFieldByNotebookId(this.localStorageSV.getItem("notebook")?.notebookId).subscribe((data: any) => {
      this.fieldList = data;
      console.log("field list: ", this.fieldList);
      this.fieldList.forEach((field: any, index) => {
        this.fieldListId.push(field.fieldId);
        this.fieldListIdBackup.push(field.fieldId);
        field.isEdited = false;
        console.log("object: ", field.fieldTaskIds);
        let taskName: any = [];
        field.fieldTaskIds.forEach((taskId: any) => {
          this.taskSV.getTaskById(taskId).subscribe((data: any) => {
            console.log("7777: ", data);
            taskName.push(data.taskName);
            console.log("taskName: ", taskName);
            this.taskNameList[index]=[...taskName];
          })
        })
      })
      this.fieldListBackup = [...this.fieldList];
    })

    this.taskSV.getTaskListByProjectId(this.localStorageSV.getItem("project")?.projectId).subscribe((data) => {
      this.taskList = data;
      console.log("task listtt: ", this.taskList);
    })
  }


  public addField() {
    console.log("abc");
    this.fieldList[0].isEdited = !this.fieldList[0].isEdited;
    console.log(this.fieldList);
  }

  addNewField() {
    if(this.newField.fieldName!='') {
      this.newField.isEdited = false;
      this.fieldList.push({...this.newField});
      this.newField.fieldName = '';
      this.newField.fieldType = 'text';
      this.newField.fieldTaskIds = [];
      this.newField.isEdited = true;
      console.log("fisldList: ", this.fieldList);
    } else {
      this.isDispleyAddNewForm = true;
    }
  }

  activeEditMode (index: any) {
    this.fieldList[index].isEdited = true;
    this.fieldList.forEach((field: any, i) => {
      if(index!=i) {
        field.isEdited = false;
      }
    })
    this.fieldIsEditing = {...this.fieldList[index]};
    this.newField.isEdited=false;
  }

  updateInputValue(e: any, index: number) {
    console.log("abc");
    this.fieldList[index].title = e.target.value;
    console.log("fieldList: ", this.fieldList);
  }

  resetFieldValue(index: any) {
    console.log("xyz");
    this.fieldList[index] = {...this.fieldIsEditing};
  }

  offAllEditeMode() {
    this.fieldList.forEach((field: any) => {
        field.isEdited = false;
    })
    console.log("blur: ", this.fieldList);
  }

  opendAssignmentRelatedTask(index: number) {
    const dialogRef = this.dialog.open(ModificationTaskComponent, {
      data: {
        fieldname: this.fieldList[index].fieldName,
        fieldIndex: index,
        taskListId: this.fieldList[index]?.fieldTaskIds
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.fieldList[index].fieldTaskIds = result;
      let taskName: any = [];
      this.fieldList[index].fieldTaskIds.forEach((taskId: any) => {
        this.taskSV.getTaskById(taskId).subscribe((data: any) => {
          console.log("7777: ", data);
          taskName.push(data.taskName);
          this.taskNameList[index]=[...taskName];
        })
      })
      console.log("field list update: ", this.fieldList);
    });
  }

  addEachField(fieldInfo: any) {
    let newField = {
      fieldName: fieldInfo.fieldName,
      fieldTypeId: 1,
      fieldNotebookId: this.notebookId,// notebookId,
      fieldTaskIds: fieldInfo.fieldTaskIds
    }
    this.fieldSV.createField(newField).subscribe((data: any) => {
      console.log("add each field: ", data);
    })
  }

  addAllField() {
    this.fieldListIdBackup.forEach((field: any) => {
      this.fieldSV.deleteField(field).subscribe((data) => {
        console.log(data);
      })
    })
    console.log("field lisy: ", this.fieldList);
    setTimeout(() => {
      this.fieldList.forEach((field: any) => {
        this.addEachField(field);
        this.toastSV.sendMessage({
          isDisplay: true,
          message: 'Cập nhật notebook thành công',
          icon: 'success',
        });
      })
      // location.reload();
    }, 1000)
    
    console.log("field List before post: ", this.fieldListBackup);
  }

  getTaskNameById(taskId: any) {
    for(let i=0; this.taskList.length; i++) {
      if(taskId==this.taskList[i].taskId) {
        return taskId.taskId;
      }
    }
  }

  backtoDetail() {
    this.router.navigateByUrl("/farmer/process/detail")
  }

  // reset() {
  //   this.userForm.reset();
  // }

  // removeField(element: any) {
  //   this.listDataField.forEach((value: any,index: any)=>{
  //     if(value == element)
  //     this.listDataField.splice(index,1);
  //   });
  // }

  // editField(element: any, title: any, type: any, task: any) {
  //   this.listDataField.forEach((value: any,index: any)=>{
  //     if(value == element)
  //     this.listDataField.splice(index,1);
  //   });
  // }

  // edit(item: any){
  //   this.listDataField.forEach((element: any) => {
  //     element.isEdit = false;
  //   });
  //   item.isEdit = true;
  // }

  // update(item: any){
  //   if(this.userForm.value != null)
  //     if(this.valueTitle != null && this.valueType != null){
  //       this.listDataField.push(this.userForm.value);
  //       this.userForm.reset();
  //       this.clearAll()
  //       item.isEdit = false;
  //       this.removeField(item)
  //     }
  // }

  // cancel(item: any){
  //   item.isEdit = false;
  // }


  // get optionImage(){
  //   return 
  // }


  ngOnInit() {}
  

  

  // list = [
  //   {
  //     id: 'ParentTaska',
  //     title: 'ParentTask a',
  //     checked: false,
  //   },
  //   {
  //     id: 'a1',
  //     title: 'Taska 1',
  //     checked: false,
  //   },
  //   {
  //     id: 'a2',
  //     title: 'Taska 2',
  //     checked: false,
  //   },
  //   {
  //     id: 'a3',
  //     title: 'Taska 3',
  //     checked: false,
  //   },
  //   {
  //     id: 'ParentTaskb',
  //     title: 'ParentTask b',
  //     checked: false,
  //   },
  //   {
  //     id: 'b1',
  //     title: 'Taskb 1',
  //     checked: false,
  //   },
  //   {
  //     id: 'b2',
  //     title: 'Taskb 2',
  //     checked: false,
  //   },
  //   {
  //     id: 'b3',
  //     title: 'Taskb 3',
  //     checked: false,
  //   },
  // ];

  // form!: FormGroup;

  // //methods
  // onChecked(id: string, checked:boolean){
  //   if(this.isParent(id)){
  //     this.list.forEach((item) => {
  //       if(item.id.charAt(0) == id.slice(-1))
  //         item.checked = checked;
  //     })
  //   }else {
  //     const allChecked = this.list.every(
  //       (item) => item.checked
  //     );
  //     this.list[0].checked = allChecked;

  //   }
  // }



  // clearAll(){
  //   this.list.forEach((item) => {
  //     item.checked = false;
  //   })
  // }

  // get selectedItems(){
  //   return this.list.filter((item) => item.checked) 
  // }

  // get valueOfItem(){
  //   return this.list.filter((item) => item.checked)
  // }

  // isParent(id: string){
  //   return id.startsWith('P')
  // }

  // identifyParent(id: string){
  //   return id.slice(-1)
  // }

  countParent: number | undefined;
  countChangedHandle(count: number) {
    this.countParent = count;
  }

  trackByFn(index: any, item: any) {
    return item.title;
  }

}

export interface DialogData {
  animal: string;
  name: string;
}