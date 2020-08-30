import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  form:FormGroup;
  user:Array<any>=[];
  memberflag:boolean=false;

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'username':new FormControl(null,{validators:[Validators.required]}),
      'startdate':new FormControl(null,{validators:[Validators.required]}),
      'enddate':new FormControl(null,{validators:[Validators.required]}),
    })
    this.authservice.getuser().subscribe((res:any)=>{
      console.log(res);
      this.user=res;
    })
  }

  onMemberForm()
  {
    if(this.form.invalid)
    {
      return
    }
    let details={
      id:this.form.value.username,
      startdate:this.form.value.startdate,
      enddate:this.form.value.enddate
    }
    this.authservice.updateMember(details).subscribe((res:any)=>{
      console.log(res);
      this.form.reset();
      this.memberflag=true;
    })
  }

}
