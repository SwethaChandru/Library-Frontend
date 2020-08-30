import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form:FormGroup;
  paramName:string;
  changeflag:boolean=false;
  signupflag:boolean=false;
  passflag:boolean=false;

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'name':new FormControl(null,{validators:[Validators.required]}),
      'email':new FormControl(null,{validators:[Validators.required]}),
      'password':new FormControl(null,{validators:[Validators.required]}),
      'city':new FormControl(null,{validators:[Validators.required]}),
      'dob':new FormControl(null,{validators:[Validators.required]})
    })
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('change'))
      {
        this.paramName=paramMap.get('change');
        this.changeflag=true;
      }
      else
      {
      // console.log(this.paramName);
      this.signupflag=true;
      }
      
    })
    
  }

  onChangeForm(form:NgForm)
  {
    let id=localStorage.getItem('id');
    console.log();
    let newpass={
      id:JSON.parse(id),
      old:form.value.old,
      new:form.value.new
    }
    console.log(newpass);
    this.authService.changepass(newpass).subscribe((res:any)=>{
      console.log(res);
      this.passflag=true;
      form.reset();
    })
  }

  onSignupForm()
  {
    console.log(this.form);
    if(this.form.invalid)
    {
      return;
    }
    let newUser={
      name:this.form.value.name,
      email:this.form.value.email,
      password:this.form.value.password,
      city:this.form.value.city,
      dob:this.form.value.dob
    }
    console.log(newUser);
    this.authService.addUser(newUser)
        .subscribe((items:any)=>{
          if(items.success)
          {
            this.router.navigate(['/login']);
          }
        },err=>{
          alert(err.error.message);
          window.location.reload();
        })
   }

}
