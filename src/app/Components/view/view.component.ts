import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import {BookService} from '../../Shared/book.service';
import { NgForm } from '@angular/forms';
import {RequestService} from '../../Shared/request.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private authservice:AuthService,public router:ActivatedRoute,
              private bookservice:BookService,private route:Router,private requestser:RequestService) { }

  paramName:string;
  studentflag:boolean=false;
  bookflag:boolean=false;
  isuser:boolean=localStorage.getItem('role')=="user"?true:false;
  isadmin:boolean=localStorage.getItem('role')=="admin"?true:false;
  id:string;
  single;
  date=new Date();
  userdetails:Array<any>=[];
  bookdetails:Array<any>=[];
  bookid:string;
  searchTerm:string;

  ngOnInit(): void {
    let Id=localStorage.getItem('id');
    this.id=JSON.parse(Id);
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('name'))
      {
        this.paramName=paramMap.get('name');
      }
      console.log(this.paramName);
      if(this.paramName=="student")
      {
        this.studentflag=true;
        this.bookflag=false;
        this.authservice.getuser().subscribe((res:any)=>{
          console.log(res);
          this.userdetails=res
          for(let i=0;i<res.length;i++)
          {
            if((res[i].endMember)!=null && (res[i].startMember)!=null)
            {
              let start=new Date(res[i].startMember);
              let end=new Date(res[i].endMember);
              this.userdetails[i].endMember=end.toDateString();
               this.userdetails[i].startMember=start.toDateString();
            }
            else
            {
              this.userdetails[i].endMember="-";
               this.userdetails[i].startMember="-";
            }
          }
        })
      }
      if(this.paramName=="book")
      {
        this.bookflag=true;
        this.studentflag=false;
        this.bookservice.getbook().subscribe((res:any)=>{
          console.log(res);
          this.bookdetails=res;
        })
      }
      this.isuser=localStorage.getItem('role')=="user"?true:false;
      this.isadmin=localStorage.getItem('role')=="admin"?true:false;
    })
    this.authservice.getuserById(this.id).subscribe((res:any)=>{
      this.single=res;
    })
  }


  store(id)
  {
    this.route.navigate(['/addbook/'+id])
  }
  delete(id)
  {
    console.log(id);
    if(confirm("Are you sure to delete "))
    {
      this.bookservice.deletbook(id).subscribe((res:any)=>{
        console.log(res);
        window.location.reload();
      },err=>{
        alert(err.error.message);
      })
    }
    else
    {
      console.log("enter else part");
    }
  }

  RequestForm(form:NgForm)
  {
    console.log(form.value);
    if(form.value.name=="" && form.value.chk=="")
    {
      console.log("enter if condition");
      alert("slect any one option");
    }
    else if(form.value.name!="" && form.value.chk!="")
    {
      alert("select only one request type");
    }
    else
    {
      console.log("enter correct condition");
      console.log(form.value);
      console.log(this.single);
      let start=new Date(this.single.startMember);
      let end=new Date(this.single.endMember);
      let currentDate=this.date.toDateString();
      let startDate=start.toDateString();
      let endDate=end.toDateString();
      console.log(currentDate);
      console.log(startDate);
      console.log(endDate);
      var d1 = Date.parse(currentDate);
      var d2 = Date.parse(startDate);
      var d3=Date.parse(endDate);
      
      if(form.value.name!="")
      {
        console.log("enter at library function");
        var d=new Date();
        let value=d.getHours()+parseInt(form.value.name);
        if(value>17)
        {
          alert("Book are allowed to read only before 5pm");
        }
        else
        {
          console.log("request accepted");
          let newRequest={
            bookid:this.bookid,
            userid:this.id,
            issuedate:currentDate,
            issuedetail:"At Library",
            reqtype:"issue"
          }
          this.requestser.addrequest(newRequest).subscribe((res:any)=>{
            console.log(res);
            window.location.reload();
          })
        }
      }
      
      if(form.value.chk=="perweek")
      {
        console.log("enter per week condition");
        if(d1>d2 && d1<d3)
        {
          console.log("request accepted");
          let newRequest={
            bookid:this.bookid,
            userid:this.id,
            issuedate:currentDate,
            issuedetail:form.value.chk,
            reqtype:"issue"
          }
          this.requestser.addrequest(newRequest).subscribe((res:any)=>{
            console.log(res);
          })
          let status={
            id:this.bookid,
            status:"Not Available"
          }
          this.bookservice.updateAvailStatus(status).subscribe((res:any)=>{
            console.log(res);
          },err=>{
            alert(err.error.message);
          })
        }
        else{
          alert("MemberShip Expired");
        }
      }
      if(form.value.chk=="perday")
      {
        console.log("enter per day condition");
        // if((this.date.getHours()>=10 && this.date.getHours()<17))
        // {
          console.log("accepeted");
          let newRequest={
            bookid:this.bookid,
            userid:this.id,
            issuedate:currentDate,
            issuedetail:form.value.chk,
            reqtype:"issue"
          }
          this.requestser.addrequest(newRequest).subscribe((res:any)=>{
            console.log(res);
          })
          let status={
            id:this.bookid,
            status:"Not Available"
          }
          this.bookservice.updateAvailStatus(status).subscribe((res:any)=>{
            console.log(res);
          },err=>{
            alert(err.error.message);
          })
      // }
      // else
      // {
      //   alert("book can be issued only between 10AM to 5PM")
      // } 
    }
    }
  }


  storebook(id)
  {
    this.bookid=id;
  }


}
