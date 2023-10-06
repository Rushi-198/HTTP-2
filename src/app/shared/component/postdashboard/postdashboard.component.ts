import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../module/posts';

@Component({
  selector: 'app-postdashboard',
  templateUrl: './postdashboard.component.html',
  styleUrls: [ './postdashboard.component.scss' ]
})
export class PostdashboardComponent implements OnInit {

  constructor(private _post: PostService) { }
  postsArray: Ipost[] = []



  ngOnInit(): void {
    this._post.getAllposts()
      .subscribe(res => {
        console.log(res)
        this.postsArray = res;
        console.log(this.postsArray)
      })
  }


  Ondelete(id: string) {

    let confirmation = confirm("Are you sure, you want to delete post ")
    console.log(confirmation)
    if (confirmation) {
      //make api call to delete the post

      this._post.deletepost(id)
        .subscribe(res => {
          console.log(res)
          this.postsArray = this.postsArray.filter(e => e.id !== id)

        })
    }


  }

}
