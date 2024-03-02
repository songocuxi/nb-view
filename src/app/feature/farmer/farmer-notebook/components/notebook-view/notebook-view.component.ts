import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FieldService } from 'src/app/core/services/field/field.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { ValueService } from 'src/app/core/services/value/value.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastBoxModalService } from 'src/app/core/services/toast-box-modal.service';

@Component({
  selector: 'app-notebook-view',
  templateUrl: './notebook-view.component.html',
  styleUrls: ['./notebook-view.component.scss']
})
export class NotebookViewComponent {

  faArrowLeft=faArrowLeft;

  fieldList: any = [];
  fieldListValue: any  = [];
  processInfo: any;

  constructor( private toastSV: ToastBoxModalService,
    private fieldSV: FieldService, private localStorageSV: LocalStorageService, private valueSV: ValueService, private processSV: ProjectService, private router: Router) {
    this.processSV.getProjectById(this.localStorageSV.getItem("project")?.projectId).subscribe((project) => {
      this.processInfo = project;
    })
    this.fieldSV.getFieldByNotebookId(this.localStorageSV.getItem("notebook")?.notebookId).subscribe((data: any) => {
      this.fieldList = data;
      this.fieldList.forEach((item: any) => {
        item.fieldValues.push({value: ''})
      })
      console.log("data", data);
      // this.fieldList.forEach((field: any, index) => {
      //   this.valueSV.
      // })
    })
    // this.valueSV.getValueList().subscribe((data: any) => {
    //   this.fieldList = data;
    //   this.fieldList.forEach((item: any) => {
    //     this.fieldSV.getFieldById(item.valueFieldId).subscribe((field: any) => {
    //       // console.log(field);
    //       item.fieldName = field.fieldName;
    //       console.log(this.fieldList);
    //     })
    //   })
    // })
  }

  onChangeInput() {
    console.log(this.fieldList);
  }

  save() {
    this.fieldList.forEach((item: any) => {
      console.log("item: ", item);
      if(item?.fieldValues[0]!=undefined || item?.fieldValues[0]!='') {
        let fieldValue = {
          value: item.fieldValues[0].value,
          valueFieldId: item.fieldId
        }
        console.log("field value: ", fieldValue);
        this.valueSV.createValue(fieldValue).subscribe((data) => {
          console.log(data);
        })
      }
    })

    setTimeout(() => {
      this.toastSV.sendMessage({
        isDisplay: true,
        message: 'Cập nhật notebook thành công',
        icon: 'success',
      });
    }, 1000);
    
    // this.valueSV.createValue
  }
  backtoDetail() {
    this.router.navigateByUrl("/farmer/process/detail")
  }

}
