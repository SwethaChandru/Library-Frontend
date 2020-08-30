import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../Shared/request.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  id:string;
  historyDetail:Array<any>=[];
  isuser:boolean=localStorage.getItem('role')=="user"?true:false;
  isadmin:boolean=localStorage.getItem('role')=="admin"?true:false;

  constructor(private requestservice:RequestService) { }

  ngOnInit(): void {
    let Id=localStorage.getItem('id');
    this.id=JSON.parse(Id);
    if(this.isuser)
    {
      this.requestservice.getallhistory(this.id).subscribe((res:any)=>{
        console.log(res);
        this.historyDetail=res;
      })
    }
    if(this.isadmin)
    {
      this.requestservice.getAdminHistory().subscribe((res:any)=>{
        console.log(res);
        this.historyDetail=res;
        for(let i=0;i<res.length;i++)
          {
              let start=new Date(res[i].IssueReqDate);
              let end=new Date(res[i].ReturnReqDate);
              this.historyDetail[i].IssueReqDate=end.toDateString();
              this.historyDetail[i].ReturnReqDate=start.toDateString();
          }
      })
    }
    
  }
  delete(id)
  {
    let detail={
      id:id
    }
    this.requestservice.deletehistory(detail).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    },err=>{
      alert(err.error.message);
    })
  }

  clearallhistory()
  {
    let detail={
      id:this.id
    }
    this.requestservice.deleteAllHistory(detail).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    },err=>{
      alert(err.error.message);
    })
  }

}
