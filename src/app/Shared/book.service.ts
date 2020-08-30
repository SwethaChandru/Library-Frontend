import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

addbook(newbook)
{
  return this.http.post("http://localhost:3000/book/", newbook);
}
getbook()
{
  return this.http.get("http://localhost:3000/book");
}
getBookById(id)
{
  return this.http.get("http://localhost:3000/book/"+id);
}
updatebook(details)
{
  return this.http.put("http://localhost:3000/book",details);
}
deletbook(id)
{
  return this.http.delete("http://localhost:3000/book/"+id);
}
updateAvailStatus(details)
{
  return this.http.put("http://localhost:3000/book/status",details);
}


}
