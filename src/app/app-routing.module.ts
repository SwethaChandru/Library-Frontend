import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { AddMemberComponent } from './Components/add-member/add-member.component'
import { ViewComponent } from './Components/view/view.component';
import { RequestComponent } from './Components/request/request.component';
import {AuthGuardService} from './Shared/auth-guard.service';
import { HistoryComponent } from './Components/history/history.component';



const routes: Routes = [
  {path:'',component:SidenavComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'signup/:change',component:SignupComponent,canActivate:[AuthGuardService]},
  {path:'addmember',component:AddMemberComponent,canActivate:[AuthGuardService]},
  {path:'view/:name',component:ViewComponent,canActivate:[AuthGuardService]},
  {path:'addbook',component:AddBookComponent,canActivate:[AuthGuardService]},
  {path:'addbook/:id',component:AddBookComponent,canActivate:[AuthGuardService]},
  {path:'request/:name',component:RequestComponent,canActivate:[AuthGuardService]},
  {path:'history',component:HistoryComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent=[SidenavComponent,LoginComponent,SignupComponent,AddBookComponent,
                              AddMemberComponent,ViewComponent,RequestComponent,HistoryComponent]
