import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ConfirmBoxModalService } from './core/services/confirm-box-modal.service';
import { ToastBoxModalService } from './core/services/toast-box-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nb-view';

  faCircleUser = faCircleUser;
  panelOpenState = false;

  notice: {
    isDisplay: boolean,
    message: string,
    icon: string
  } = {isDisplay: false, message: 'abc', icon: 'success'}

  constructor(private toastSV: ToastBoxModalService) {
    
  }

  ngOnInit() {
    this.toastSV.getMessage().subscribe((message : any) => {
      this.notice.isDisplay = message.isDisplay;
      this.notice.message = message.message;
      this.notice.icon = message.icon;
    })
  }
}
