import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstagramApiService } from '../services/instagram-api/instagram-api.service';
import { debounceTime, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchProfile } from '../models/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalStoreService } from '../services/global-store/global-store.service';
import { ShortNumberPipe } from '../pipes/short-number.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ShortNumberPipe,
  ]
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  public search = new FormControl('');
  public isLoading = signal(false);
  public isFocused = signal(false);
  public results = signal<SearchProfile[]>([]);
  constructor(
    private instagramApiService: InstagramApiService,
    private globalStoreService: GlobalStoreService,
  ) { }

  public ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => {
        const search = (value as string)?.trim();
        this.isLoading.set(true);

        if (search?.length) {
          return this.instagramApiService.getUsers(search);
        }

        return of(null);
      }),
      tap((data) => {
        this.results.set(data?.data || []);
        this.isLoading.set(false);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public setFocused(): void {
    this.isFocused.set(true);
  }

  public setBlue(): void {
    setTimeout(() => {
      this.isFocused.set(false);
    }, 100);
  }


  public selectProfile(profile: SearchProfile): void {
    this.globalStoreService.selectedProfile.next(profile);
  }
}

