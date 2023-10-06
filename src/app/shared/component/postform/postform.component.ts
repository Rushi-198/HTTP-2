import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../module/posts';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: [ './postform.component.scss' ]
})
export class PostformComponent implements OnInit {

  postForm !: FormGroup;
  isinEditMode: Boolean = false;
  updateId !: string
  arr !: Ipost[];

  constructor(private _auth: ActivatedRoute,
    private _post: PostService,
    private _router: Router) { }

  ngOnInit(): void {
    this.createForm()
    this._auth.params
      .subscribe((params: Params) => {
        this.updateId = params[ 'postId' ];
        if (this.updateId) {
          this.isinEditMode = true
          this._post.getsinglepost(this.updateId)        //singleobjget
            .subscribe(res => {
              console.log(res)
              this.postForm.patchValue(res)
            })
        }
      });
    this._post.getAllposts()
      .subscribe(res => {
        console.log(res)
      })

  }


  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),

    })

  }


  onpostSubmit() {
    if (this.postForm.valid) {
      let obj = this.postForm.value;
      this._post.createpost(obj)
        .subscribe(res => {
          console.log(res)
          this._router.navigate([ '/' ])
        })
      this.arr.unshift(obj)
    }
  }




  onpostupdate() {

    if (this.postForm.valid) {
      let obj = { ...this.postForm.value, id: this.updateId }
      console.log(obj)
      // this._post.updatepost(this.postForm.value,this.updateId)
      //   .subscribe(res => {
      //     console.log(res)
      //   })

      this._post.updatepost(obj)
        .subscribe(res => {
          console.log(res)
          this._router.navigate([ '/' ])
        })
    }
  }



}
