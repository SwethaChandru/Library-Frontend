import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  addrequest(newreq)
  {
    return this.http.post("http://localhost:3000/request/", newreq);
  }
  // getrequest()
  // {
  //   return this.http.get("http://localhost:3000/request");
  // }
  getrequestById(id)
  {
    return this.http.get("http://localhost:3000/request/"+id);
  }
  getReturnReqById(id)
  {
    return this.http.get("http://localhost:3000/request/return/"+id);
  }

  getallIssueReq()
  {
    return this.http.get("http://localhost:3000/request");
  }

  getallreturnReq()
  {
    return this.http.get("http://localhost:3000/request/allreturn");
  }

  getallhistory(id)
  {
    return this.http.get("http://localhost:3000/request/history/"+id);
  }
  getAdminHistory()
  {
    return this.http.get("http://localhost:3000/request/history");
  }
  updateAcceptStatus(details)
  {
    return this.http.put("http://localhost:3000/request",details);
  }
  updateReturnStatus(details)
  {
    return this.http.put("http://localhost:3000/request/return",details);
  }
  updateonbook(details)
  {
    return this.http.put("http://localhost:3000/request/onbook",details)
  }
  InHand(id)
  {
    return this.http.get("http://localhost:3000/request/inhand/"+id)
  }
  updateReturnReq(detail)
  {
    return this.http.put("http://localhost:3000/request/updateReq",detail)
  }
  deletehistory(detail)
  {
    return this.http.put("http://localhost:3000/request/deletehistory/",detail);
  }
  deleteAllHistory(detail)
  {
    return this.http.put("http://localhost:3000/request/deletAllHistory/",detail);
  }
}
