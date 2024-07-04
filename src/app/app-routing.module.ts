import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './pages/edit/edit.component';
import { UserEditComponent } from './pages/edit/user-edit/user-edit.component';
import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { StartComponent } from './pages/start/start.component';
import { BadRequestComponent } from './shared/pages/bad-request/bad-request.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'start', component: StartComponent, pathMatch: 'full' },
  { path: 'list', component: ListComponent, pathMatch: 'full' },
  { path: 'new', component: NewComponent, pathMatch: 'full' },
  { path: 'edit', component: EditComponent, pathMatch: 'full' },
  { path: 'edit/:id', component: UserEditComponent, pathMatch: 'full' },
  { path: 'badrequest', component: BadRequestComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
