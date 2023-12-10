import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectRowSubject = new BehaviorSubject<boolean>(false);

  selectRow$ = this.selectRowSubject.asObservable();

  setSelectedRow(selectedRow: any): void {
    this.selectRowSubject.next(selectedRow);
  }

  
}
