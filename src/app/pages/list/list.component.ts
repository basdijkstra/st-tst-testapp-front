import { Component } from '@angular/core';
import { AppIoService } from 'src/app/services/app-io.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  delaUserData$ = this.appIoService.getDelaUserData();
  constructor(private appIoService: AppIoService) {}
}
