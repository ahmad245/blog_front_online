import { IPost } from './../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../core/services/user.service';
import { PostService } from './../../core/services/post.service';
import { PostTypeService } from './../../core/services/post-type.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { IPostType } from 'src/app/core';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  createForm: FormGroup;
  postTypes: IPostType[] = [];
  userId;
  postId;
  post: IPost;


  subscription = new Subscription();
  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public pTS: PostTypeService,
    public pS: PostService,
    private uS: UserService
  ) {

    this.createForm = this.fb.group({
      _id: [''],
      title: ['', [Validators.required, Validators.minLength(1)]],
      slug: [''],
      content: ['', [Validators.required, Validators.minLength(1)]],
      publish: [],
      author: ['', [Validators.required, Validators.minLength(1)]],
      images: ['', [Validators.required, Validators.minLength(1)]],
      blogType: ['', [Validators.required]],

    })
  }


  ngOnInit() {

    this.postId = this.route.snapshot.paramMap.get('id');


    if (this.postId) {
      this.route.data.subscribe((data) => {
        this.post = data.post;
        console.log(this.post);

        this.createForm.patchValue({
          _id: this.post.id,
          title: this.post.title,
          slug: this.post.slug,
          content: this.post.content,
          publish: this.post.publish || false,

          images: this.post.images || '',

          blogType: this.post.blogType.id,
        })

      });
    }



    this.subscription.add(
      this.pTS.getAll().subscribe((response) => {
        this.postTypes = response['hydra:member'];
      })
    );

  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {

    let post;
    post = {
      title: this.createForm.value.title,
      slug: this.createForm.value.slug,
      content: this.createForm.value.content,
      publish: this.createForm.value.publish,
      images: this.fileData || null,
      blogType: this.createForm.value.blogType,
    }


    if (this.postId) {
      this.subscription.add(
        this.pS.put(this.postId, post.title, post.slug, post.content, post.publish, post.images, post.blogType)
          .subscribe(data => {

          })
      )
    }
    else {
     
      if (this.fileData) {
        this.subscription.add(this.pS.uplaodImg(this.fileData).pipe(switchMap((value:any) => {
          if (value)
            return this.pS.post(post.title, post.slug, post.content, post.publish, value, +post.blogType)

        })
        )
          .subscribe(
            res => {
             console.log('suscss');
             
            },
            err => {
                  console.log(err);
                  
            }
          )
        )

      }
      else {
        this.subscription.add(this.pS.post(post.title, post.slug, post.content, post.publish, post.images, +post.blogType)
          .subscribe(
            res => {

            },
            err => {

            }
          )
        )

      }



    }





  }


  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('files', this.fileData);

  //   this.fileUploadProgress = '0%';

  //   this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
  //     reportProgress: true,
  //     observe: 'events'  
  //   })
  //   .subscribe(events => {
  //     if(events.type === HttpEventType.UploadProgress) {
  //       this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
  //       console.log(this.fileUploadProgress);
  //     } else if(events.type === HttpEventType.Response) {
  //       this.fileUploadProgress = '';
  //       console.log(events.body);         
  //       alert('SUCCESS !!');
  //     }

  //   }) 
  // }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// Destructuring is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. That is, we can extract data from arrays and objects and assign them to variables.

// examples:

//   var introduction = ["Hello", "I" , "am", "Sarah"];
//     var [greeting, pronoun] = introduction;

//     console.log(greeting);//"Hello"
//     console.log(pronoun);//"I"

//  var [greeting,,,name] = ["Hello", "I" , "am", "Sarah"];

//     console.log(greeting);//"Hello"
//     console.log(name);//"Sarah"

//   var [,pronoun,,name] = ["Hello", "I" , "am", "Sarah"];

//     console.log(pronoun);//"I"
//     console.log(name);//"Sarah"

