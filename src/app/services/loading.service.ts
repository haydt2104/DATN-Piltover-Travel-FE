import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private _loadingOverLay = new BehaviorSubject<boolean>(false)
    private _loadingButton = new BehaviorSubject<boolean>(false)
    public readonly loadingOverLay$ = this._loadingOverLay.asObservable();
    public readonly loadingButton$ = this._loadingButton.asObservable();
    constructor() { }
    showOverLay() {
        this._loadingOverLay.next(true);
    }
    showButton() {
        this._loadingButton.next(true);

    }
    hideOverLay() {
        this._loadingOverLay.next(false);
    }
    hideButton() {
        this._loadingButton.next(false);
    }
}