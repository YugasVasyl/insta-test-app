import { Injectable } from '@angular/core';
import { SearchProfile } from '../../models/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {
  public selectedProfile = new BehaviorSubject(null as SearchProfile | null);

  constructor() { }
}
