import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BookService} from '../../Shared/book.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private bookservice:BookService,public router:ActivatedRoute,
              private route:Router) { }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Author:Array<any> = [
    // {name: 'Lemon'},
    // {name: 'Lime'},
    // {name: 'Apple'},
  ];

  bookflag:boolean=false;
  paramid:string;
  form:FormGroup;
  issuableStatus:string;
  mode:string;
  bookid:string
  bookdetails:Array<any>=[];
  radio:boolean;

  ngOnInit(): void {
    this.form=new FormGroup({
      'name':new FormControl(null,{validators:[Validators.required]}),
      'price':new FormControl(null,{validators:[Validators.required]}),
      'desc':new FormControl(null,{validators:[Validators.required]})
    })
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id'))
      {
        this.mode='edit'
        this.bookid=paramMap.get('id');
        this.bookservice.getBookById(this.bookid)
          .subscribe((items:any)=>{
        this.bookdetails=items;
        console.log(items);
        console.log(items.Bookname);
        if(items.issuableStatus=="Home")
        {
          this.radio=true;
        }
        if(items.issuableStatus=="At Library")
        {
          this.radio=false;
        }
        this.form.patchValue({name: items.Bookname });
        this.form.patchValue({ price: items.price});
        this.form.patchValue({desc:items.Description});
        this.issuableStatus=items.issuableStatus;
        for(let i=0;i<items.Author.length;i++)
        {
          console.log(items.Author[i].name);
          this.Author.push({name:items.Author[i].name});
          console.log(this.Author);
        }
            // console.log(this.Author);{}
        });
      }
      else
      {
        this.mode='create';
        this.bookid=null;
        console.log(this.mode);
      }
    })
  }

 

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.Author.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.Author.indexOf(fruit);

    if (index >= 0) {
      this.Author.splice(index, 1);
    }
  }

  RadioCheck(i)
  {
    this.issuableStatus=i;
    console.log(this.issuableStatus);
  }

  addBookForm()
  {
    console.log(this.Author);
    if(this.form.invalid)
    {
      return
    }
    if(this.mode==="create")
    {
      const newbook={
        name:this.form.value.name,
        price:this.form.value.price,
        author:this.Author,
        desc:this.form.value.desc,
        issueStatus:this.issuableStatus
      }
      console.log(newbook)
      this.bookservice.addbook(newbook).subscribe((res:any)=>{
        console.log(res);
        this.form.reset();
        this.Author=[];
        this.bookflag=true;
      })
    }
    else
    {
      const newbook={
        id:this.bookid,
        name:this.form.value.name,
        price:this.form.value.price,
        author:this.Author,
        desc:this.form.value.desc,
        issueStatus:this.issuableStatus
      }
      console.log(newbook)
      this.bookservice.updatebook(newbook).subscribe((res:any)=>{
        console.log(res);
        this.form.reset();
        this.Author=[];
        this.route.navigate(['/view/book'])
      })
    }
  }

}
