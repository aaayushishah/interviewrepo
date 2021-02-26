import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BloglistComponent } from './components/bloglist/bloglist.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BloglistComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule
  ]
})
export class BlogModule { }
