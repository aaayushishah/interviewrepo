import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/blogs';
import { BloglistService } from '../../services/bloglist.service';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit {

  constructor(
    private blogservice: BloglistService
  ) { }
  userdetails: any;
  formdata = new FormData();
  bloglist: any;
  addnew = false;
  editblog = false;
  blog = new Blogs();
  ngOnInit(): void {
    this.userdetails = JSON.parse(String(sessionStorage.getItem('userdata')));
    console.log(this.userdetails)
    if (this.userdetails && this.userdetails.Role == 'admin') {
      this.getAllBlogs();
    } else {
      this.getBlogsByUser();
    }
  }
  getAllBlogs() {
    this.blogservice.getAllBlogs().subscribe(data => {
      // if (data.success == 1) {
      // alert(data.message);
      this.bloglist = data.data;
      // } else {
      //   alert(data.message);
      // }
    });
  }
  getBlogsByUser() {
    this.blogservice.getAllByUser(this.userdetails.id).subscribe(data => {
      this.bloglist = data.data;
    });
  }
  addNewBlog() {
    this.addnew = true;
  }
  addBlog() {
    this.formdata.set('Title', this.blog.Title);
    this.formdata.set('Description', this.blog.Description);
    this.formdata.set('Date', this.blog.Date);
    this.formdata.set('user_id', this.userdetails.id);
    this.formdata.set('Status', this.blog.Status);
    this.blogservice.createBlog(this.formdata).subscribe(data => {
      this.addnew = false;
      if (data.success == 1) {
        // alert(data.message);
        if (this.userdetails && this.userdetails.Role == 'admin') {
          this.getAllBlogs();
        } else {
          this.getBlogsByUser();
        }
      } else {
        alert(data.message);
      }
    });
  }
  clearBlog() {
    this.blog = new Blogs();
    this.addnew = false;
    this.editblog = false;
  }
  deleteBlog(id: any) {
    this.formdata.set('id', id);
    this.blogservice.deleteBlog(this.formdata).subscribe(data => {
      this.bloglist = this.bloglist.filter((val: any) => val.id != id);
      console.log(data);
    });
  }
  editBlog(id: any) {
    this.editblog = true;
    this.blog = this.bloglist.filter((val: any) => val.id == id)[0];
  }
  updateBlog() {
    this.formdata.set('Title', this.blog.Title);
    this.formdata.set('Description', this.blog.Description);
    this.formdata.set('Date', this.blog.Date);
    this.formdata.set('blog_id', this.blog.id);
    this.formdata.set('Status', this.blog.Status);
    this.blogservice.updateBlog(this.formdata).subscribe(data => {
      this.editblog = false;
      if (this.userdetails && this.userdetails.Role == 'admin') {
        this.getAllBlogs();
      } else {
        this.getBlogsByUser();
      }
    });
  }
}
