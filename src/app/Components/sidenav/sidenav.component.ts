import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public IsAuth=localStorage.getItem('token')!=null?true:false;
  public authListenerSubs:Subscription;
  isuser:boolean=localStorage.getItem('role')=="user"?true:false;
  isadmin:boolean=localStorage.getItem('role')=="admin"?true:false;
  role:string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    const role=localStorage.getItem('role');
    console.log(JSON.parse);
    console.log("entered headers on init function");
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.IsAuth=isAuthenticated;
      this.isuser=localStorage.getItem('role')=="user"?true:false;
      this.isadmin=localStorage.getItem('role')=="admin"?true:false;
      console.log("hloo");
    });

  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
    this.authService.authStatusListener.next(false);
  }

}
