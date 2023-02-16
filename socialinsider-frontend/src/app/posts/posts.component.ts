import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  IPost,
  PostsRequestPayload,
  PostsResponsePayload,
  SIRequest,
} from './post';
import { Subscription } from 'rxjs';
import { BrandService } from '../brands/brands.service';
import { IBrand } from '../brands/brand';
import { PostService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  imageWidth: number = 100;
  imageMargin: number = 2;

  startDateTimestamp: number | undefined;
  endDateTimestamp: number | undefined;
  brands: IBrand[] = [];
  posts: IPost[] = [];
  brandsSub!: Subscription;
  postsSub!: Subscription;
  errorMessage: string = '';
  selectedBrand: IBrand | undefined;
  hovered: number | undefined;

  postsRequestPayload: PostsRequestPayload | undefined;
  postsResponsePayload: PostsResponsePayload | undefined;
  showImage: boolean = true;

  constructor(
    private brandService: BrandService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.brandsSub = this.brandService.getBrands().subscribe({
      next: (brands) => (this.brands = brands),
      error: (errMsg) => (this.errorMessage = errMsg),
    });
  }

  updateStartDate(event: MatDatepickerInputEvent<Date>): void {
    this.startDateTimestamp = event.value?.getTime();
  }

  updateEndDate(event: MatDatepickerInputEvent<Date>): void {
    this.endDateTimestamp = event.value?.getTime();
    if (this.startDateTimestamp && this.endDateTimestamp) {
      if (this.postsRequestPayload) {
        this.postsRequestPayload.siRequest.params.date.start =
          this.startDateTimestamp;
        this.postsRequestPayload.siRequest.params.date.end =
          this.endDateTimestamp;
      } else {
        let siRequest = new SIRequest();
        siRequest.params.date.start = this.startDateTimestamp;
        siRequest.params.date.end = this.endDateTimestamp;
        this.postsRequestPayload = new PostsRequestPayload(
          siRequest,
          this.selectedBrand
        );
      }
      this.postsRequestPayload.brand && this.updatePosts(); // if there is a brand selected, search for its posts
    }
  }

  updateSelectedBrand(newSelectedBrand: IBrand): void {
    this.selectedBrand = newSelectedBrand;
    if (this.postsRequestPayload) {
      this.postsRequestPayload.brand = this.selectedBrand;
      this.postsRequestPayload.siRequest.params.date.start &&
        this.updatePosts();
    } else {
      let siRequest = new SIRequest();
      this.postsRequestPayload = new PostsRequestPayload(
        siRequest,
        this.selectedBrand
      );
    }
  }

  private updatePosts(): void {
    console.log(
      'POST REQUEST PAYLOAD: ' + JSON.stringify(this.postsRequestPayload)
    );
    this.postsSub = this.postService
      .getPosts(this.postsRequestPayload!)
      .subscribe({
        next: (respPayload) => (this.postsResponsePayload = respPayload),
        error: (errMsg) => (this.errorMessage = errMsg),
      });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnDestroy(): void {
    this.brandsSub.unsubscribe();
    this.postsSub.unsubscribe();
  }
}
