import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppIoService } from 'src/app/services/app-io.service';
import { DelaUserModel } from 'src/app/shared/models/dela-user';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  constructor(private appIoService: AppIoService) {}

  onSubmit(userData: NgForm): void {
    let newDelaUser = userData.value as DelaUserModel;
    newDelaUser.id = 0;
    this.appIoService.saveDelaUserData(newDelaUser);
    userData.resetForm();
  }
}
