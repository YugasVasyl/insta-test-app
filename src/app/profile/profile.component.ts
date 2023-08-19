import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { InstagramApiService } from '../services/instagram-api/instagram-api.service';
import { GlobalStoreService } from '../services/global-store/global-store.service';
import { CommonModule } from '@angular/common';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { catchError, delay, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeedResponse, SearchProfile } from '../models/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ShortNumberPipe,
  ]
})
export class ProfileComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  public profile = signal<SearchProfile | null>(null);
  public feedResponse = signal<FeedResponse | null>(null);
  private isLoading = false;

  constructor(
    private instagramApiService: InstagramApiService,
    private globalStoreService: GlobalStoreService,
  ) { }

  public ngOnInit(): void {
    this.globalStoreService.selectedProfile.pipe(
      switchMap((profile) => {
        this.feedResponse.set(null);
        this.profile.set(profile);
        this.isLoading = false;

        return this.getUsersFeed();
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    if (document.documentElement.scrollTop + window.innerHeight + 100 > document.body.scrollHeight
      && this.feedResponse()?.more_available) {
      this.getUsersFeed().pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
    }
  }

  public getUsersFeed(): Observable<FeedResponse | null> {
    if (this.isLoading || !this.profile()) {
      return of(this.feedResponse());
    }

    this.isLoading = true;

    return this.instagramApiService.getUserFeed(`${this.profile()?.username}`, this.feedResponse()?.end_cursor).pipe(
      delay(50),
      switchMap((feed) => {
        this.isLoading = false;
        this.feedResponse.update(feedResponse => ({
          ...feed,
          items: [...(feedResponse?.items || []), ...feed.items],
        }));

        if (document.documentElement.scrollTop + window.innerHeight + 100 > document.body.scrollHeight
          && this.feedResponse()?.more_available) {
          return this.getUsersFeed();
        }

        return of(this.feedResponse());
      }),
      catchError(() => {
        this.isLoading = false;

        return of(this.feedResponse());
      }),
    );
  }
}


