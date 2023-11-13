import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private _loadingOverLay = new BehaviorSubject<boolean>(false)
    private _loadingProgress = new BehaviorSubject<boolean>(false)
    public readonly loadingOverLay$ = this._loadingOverLay.asObservable();
    public readonly loadingProgress$ = this._loadingProgress.asObservable();
    constructor() { }
    showOverLay() {
        this._loadingOverLay.next(true);
    }
    showButton() {
        this._loadingProgress.next(true);

    }
    hideOverLay() {
        this._loadingOverLay.next(false);
    }
    hideButton() {
        this._loadingProgress.next(false);
    }
}