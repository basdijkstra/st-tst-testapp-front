import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppIoService } from 'src/app/services/app-io.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent {
  delaUserData$ = this.appIoService.getDelaUserData();
  constructor(private appIoService: AppIoService, private router: Router) {}

  delete(id: number) {
    this.appIoService.deleteDelaUser(id).subscribe((x) => {
      x === id.toString()
        ? this.router.navigate(['/badrequest'])
        : (this.delaUserData$ = this.appIoService.getDelaUserData());
    });
  }
}
