import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../Shared/request.service';
import {BookService} from '../../Shared/book.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  requestDetail:Array<any>=[];
  issueReqDetail:Array<any>=[];
  returnReqDetail:Array<any>=[];
  requestById:Array<any>=[];
  UserId:string;
  acceptStatus:boolean=false;
  paramName:string;
  issueflag:boolean=false;
  returnflag:boolean=false;
  

  inhand:Array<any>=[];
  userIssueReq:Array<any>=[];
  userReturnReq:Array<any>=[];
  issueuserflag:boolean=false;
  onhanduserflag:boolean=false;
  returnuserflag:boolean=false;

  AcceptStatus:boolean=false;

  constructor(private requestser:RequestService, private bookservice:BookService,
            public router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    let id=localStorage.getItem('id');
    this.UserId=JSON.parse(id);
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('name'))
      {
        this.paramName=paramMap.get('name');
      }
      if(this.paramName=="issue")
      {
        // this.adminflag=true;
        this.issueflag=true;
        this.requestser.getallIssueReq().subscribe((res:any)=>{
          console.log(res);
          this.requestDetail=res;
          for(let i=0;i<res.length;i++)
          {
            if(res[i].IssueReqDate)
            {
              this.issueReqDetail.push(res[i]);
            }
          }
        })
      }
      if(this.paramName=="return")
      {
        // this.adminflag=true;
        this.returnflag=true;
        this.requestser.getallreturnReq().subscribe((res:any)=>{
          console.log(res);
          this.requestDetail=res;
          for(let i=0;i<res.length;i++)
          {
            if(res[i].ReturnReqDate)
            {
              this.returnReqDetail.push(res[i]);
            }
          }
        })
      }
      if(this.paramName=="issueReq")
      {
        console.log(this.paramName);
        this.issueuserflag=true;
        this.requestser.getrequestById(this.UserId).subscribe((res:any)=>{
          console.log(res);
          this.requestById=res;
        })
      }
      if(this.paramName=="returnReq")
      {
        console.log(this.paramName);
        this.returnuserflag=true;
        this.requestser.getReturnReqById(this.UserId).subscribe((res:any)=>{
          console.log(res);
          for(let i=0;i<res.length;i++)
          {
            console.log("hloo");
            if(res[i].ReturnReqDate)
            {
              this.requestById.push(res[i]);
            }
          }
          // this.requestById=res;
        })
      }
      if(this.paramName=="InHand")
      {
        console.log(this.paramName);
        this.onhanduserflag=true;
        this.requestser.InHand(this.UserId).subscribe((res:any)=>{
          console.log(res);
          this.requestById=res;
        })
      }
      
    })
  }

  returnaction(bookid,reqid,userid)
  {
    let status={
      id:bookid,
      status:"Available"
    }
    this.bookservice.updateAvailStatus(status).subscribe((res:any)=>{
      console.log(res);
    },err=>{
      alert(err.error.message);
    })
    let AcceptStatus={
      id:reqid,
      status:"true"
    }
    this.requestser.updateReturnStatus(AcceptStatus).subscribe((res:any)=>{
      console.log(res);
      this.acceptStatus=true;
      window.location.reload();
    },err=>{
      alert(err.error.message);
    })
    let onbook={
      bookid:bookid,
      userid:userid
    }
    this.requestser.updateonbook(onbook).subscribe((res:any)=>{
      console.log(res);
    })
  }

  reqaction(id)
  {
    var d=new Date();
    // if((d.getHours()>=10 && d.getHours()<17))
    // {
      let detail={
        id:id,
        date:new Date()
      }
      this.requestser.updateReturnReq(detail).subscribe((res:any)=>{
        console.log(res);
        alert("Request sent")
        window.location.reload();
      })
    // }
    // else
    // {
    //   alert("Book can be returned only between 10AM to 5PM")
    // }
  }
  Issueaccept(bookid,reqid)
  {
   
    let AcceptStatus={
      id:reqid,
      status:true
    }
    this.requestser.updateAcceptStatus(AcceptStatus).subscribe((res:any)=>{
      console.log(res);
      this.acceptStatus=true;
      window.location.reload();
    },err=>{
      alert(err.error.message);
    })
  }

  Issuereject(bookid,reqid)
  {
    let status={
      id:bookid,
      status:"Available"
    }
    this.bookservice.updateAvailStatus(status).subscribe((res:any)=>{
      console.log(res);
    },err=>{
      alert(err.error.message);
    })
    let AcceptStatus={
      id:reqid,
      status:"false"
    }
    this.requestser.updateAcceptStatus(AcceptStatus).subscribe((res:any)=>{
      console.log(res);
      this.acceptStatus=true;
      window.location.reload();
    },err=>{
      alert(err.error.message);
    })
  }

}
