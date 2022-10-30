import {
  Component,
  OnInit
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
//
import {
  ActivatedRoute,
  ParamMap
} from "@angular/router";
import {
  Post
} from '../post.model';
import {
  PostsService
} from "../posts.service";

import {   MimeType } from "./mime-type.validator";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  form: FormGroup;
  isLoading = false; // bool var to determine if we are are loading data, or not
  private mode = "create";
  private postId: string;
  imagePreview: string;
  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required, ], asyncValidators: [MimeType],
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {   // if we have a postId in the URL
        this.mode = "edit";          // we are in edit mode
        this.postId = paramMap.get("postId"); // get the postId from the URL
        this.isLoading = true;      // set isLoading to true
        this.postsService.getPost(this.postId).subscribe(postData => { // get the post data from the server
          this.isLoading = false;  // set isLoading to false
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
        });
        this.form.setValue({
          title: this.post.title,
          content: this.post.content
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    }); // patchValue() is used to update a single value in a form
    this.form.get('image').updateValueAndValidity(); // updateValueAndValidity() is used to update the validity of a single form control
    const reader = new FileReader();
    reader.onload = () => { // onload is an event that is triggered when the reader has finished reading the file
      this.imagePreview = reader.result as string; // reader.result is the data URL of the file
    };
    reader.readAsDataURL(file); // readAsDataURL() is used to read the contents of the specified Blob or File
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }
}
