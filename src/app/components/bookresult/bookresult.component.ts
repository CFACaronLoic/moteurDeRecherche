import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { Bookpage } from 'src/app/interfaces/bookpage';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bookresult',
  templateUrl: './bookresult.component.html',
  styleUrls: ['./bookresult.component.css']
})
export class BookresultComponent implements OnInit {

  bookList : Array<Book> = [];

  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getBookdata.subscribe((data) => {
      for(var i = 0; i < data.hits.hits.length;i++){
        let book = {} as Book;
        book.id = data.hits.hits[i]._source.id;
        book.authors = data.hits.hits[i]._source.authors;
        book.bookshelves = data.hits.hits[i]._source.bookshelves;
        book.title = data.hits.hits[i]._source.title;
        book.subjects = data.hits.hits[i]._source.subjects;
        this.bookList.push(book);
      }
  });
  }

  SendData(title:string,authors:string,categories:string[],subjects:string[]) {
    let bookpage = {} as Bookpage;
    bookpage.author = authors;
    bookpage.categories = categories;
    bookpage.subjects = subjects;
    bookpage.title = title;
    this.dataservice.GetBook(bookpage);
  }
}
