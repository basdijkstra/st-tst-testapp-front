import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AppIoService } from 'src/app/services/app-io.service';
import { DelaUserModel } from 'src/app/shared/models/dela-user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  delaUser$ = new Observable<DelaUserModel>();
  delaUser: any;

  constructor(
    private appIoService: AppIoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.delaUser$ = this.appIoService.getDelaUser(id);
      this.appIoService.getDelaUser(id).subscribe((user) => {
        this.delaUser = user;
      });
    } else {
      this.router.navigate(['/edit']);
    }
  }

  onSubmit(userData: NgForm): void {
    if (this.isDirty(userData.value)) {
      this.router.navigate(['/edit']);
    } else {
      this.appIoService.saveDelaUserData(this.trackChanges(userData.value));
    }
  }

  isDirty(formInput: any): boolean {
    let userData = formInput as DelaUserModel;
    if (
      userData.name === '' &&
      userData.address === '' &&
      userData.country === '' &&
      userData.information === ''
    )
      return true;
    return false;
  }

  trackChanges(delaUser: any): DelaUserModel {
    let user = {} as DelaUserModel;
    user.id = this.delaUser?.id as number;
    delaUser.name === ''
      ? (user.name = this.delaUser?.name as string)
      : (user.name = delaUser.name);
    delaUser.address === ''
      ? (user.address = this.delaUser?.address as string)
      : (user.address = delaUser.address);
    delaUser.country === ''
      ? (user.country = this.delaUser?.country as string)
      : (user.country = delaUser.country);
    delaUser.information === ''
      ? (user.information = this.delaUser?.information as string)
      : (user.information = delaUser.information);
    return user;
  }
}
