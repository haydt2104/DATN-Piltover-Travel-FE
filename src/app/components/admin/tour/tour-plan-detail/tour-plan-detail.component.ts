import { CommonModule, NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TourPlanDetail } from 'src/app/models/tour-plan-detail.model';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { CurdService } from 'src/app/services/curd.service';
import { TourPlanDetailService } from 'src/app/services/tour/tour-plan-detail.service';

@Component({
  selector: 'app-tour-plan-detail',
  templateUrl: './tour-plan-detail.component.html',
  styleUrls: ['./tour-plan-detail.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    TableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [MessageService]
})
export class TourPlanDetailComponent implements OnInit {
  @ViewChild('addModal') addModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;

  currentTourPlan: TourPlan = null;
  planDetailList: TourPlanDetail[] = [];
  tourPlanDate: Date
  constructor(
    private route: ActivatedRoute,
    private tourPlanDetailService: TourPlanDetailService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private modalService: NgbModal,
    private curdService: CurdService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getCurrentTourPlan(id);
      this.getTourPlanDetailByTourPlanId(id);
    });
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  public getCurrentTourPlan(tourPlanId: number): void {
    this.curdService.getSpecificObject('tour_plan', tourPlanId).subscribe(
      (response: TourPlan) => {
        this.currentTourPlan = response;
        this.tourPlanDate = new Date(this.currentTourPlan.startTime);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getTourPlanDetailByTourPlanId(planId: number): void {
    this.tourPlanDetailService.getTourPlanDetailsByTourPlanId(planId).subscribe(
      (response: TourPlanDetail[]) => {
        this.planDetailList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  open(content: string, id: number) {
    if (content == 'add') {
      this.modalService.open(this.addModal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      })
    } else if (content == 'confirm') {
      this.modalService
        .open(this.confirmModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deletePlanDetail(id));
    }
  }

  submitAdd(data) {
    if (this.checkValidTime(data.value.startTime)) {
      var planDetail: TourPlanDetail = {
        id: null,
        startTime: data.value.startTime,
        endTime: data.value.endTime,
        description: data.value.description,
        tourPlan: this.currentTourPlan
      }
      this.curdService.post("tour_plan_detail", planDetail).subscribe(
        (response: TourPlan) => {
          this.getTourPlanDetailByTourPlanId(this.currentTourPlan.id);
          this.modalService.dismissAll()
          this.messageService.clear();
          this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm thành công' });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    } else {
      this.messageService.clear();
      this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Vui Lòng Thời Gian Từ ' + this.tourPlanDate.getHours() + ':' + this.tourPlanDate.getMinutes() + ' Về Sau' });
    }
  }

  clonedProducts: { [s: number]: TourPlanDetail; } = {};

  checkValidTime(data) {
    const [hours, minutes] = data.split(':');
    const date = new Date(this.tourPlanDate.getFullYear(), this.tourPlanDate.getMonth(), this.tourPlanDate.getDate(), +hours, +minutes, 0);
    if (date >= this.tourPlanDate) {
      return true;
    } else {
      return false;
    }
  }

  checkValidTime2(data1, data2) {
    const [hours1, minutes1] = data1.split(':');
    const [hours2, minutes2] = data2.split(':');
    const date1 = new Date(this.tourPlanDate.getFullYear(), this.tourPlanDate.getMonth(), this.tourPlanDate.getDate(), +hours1, +minutes1, 0);
    const date2 = new Date(this.tourPlanDate.getFullYear(), this.tourPlanDate.getMonth(), this.tourPlanDate.getDate(), +hours2, +minutes2, 0);
    if (date2 > date1) {
      return true
    } else {
      return false;
    }
  }


  onRowEditInit(tourPlanDetail: TourPlanDetail) {
    this.clonedProducts[tourPlanDetail.id as number] = { ...tourPlanDetail };
  }

  onRowEditSave(tourPlanDetail: TourPlanDetail) {
    let status = true
    if (this.checkValidTime(tourPlanDetail.startTime) == false || this.checkValidTime2(tourPlanDetail.startTime, tourPlanDetail.endTime) == false) {
      console.log("in");
      tourPlanDetail.startTime = this.clonedProducts[tourPlanDetail.id].startTime;
      tourPlanDetail.endTime = this.clonedProducts[tourPlanDetail.id].endTime;
      status = false
    }
    this.curdService.put('tour_plan_detail', tourPlanDetail).subscribe(
      (response: TourPlan) => {
        this.messageService.clear();        
        if (status = false) {
          this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Cập nhật thành công' });
        } else {
          this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Thời Gian Không Khớp Lịch Trình Hệ Thống Chỉ Cập Nhật Mô Tả' });
        }
      },
      (error: HttpErrorResponse) => {
        this.messageService.clear();
        this.messageService.add({ key: 'error', severity: 'error', summary: 'Lỗi', detail: 'Cập nhập thất bại vui lòng điền đầy đủ dữ liệu' });
      }
    )
  }

  onRowEditCancel(tourPlanDetail: TourPlanDetail, index: number) {
    this.planDetailList[index] = this.clonedProducts[tourPlanDetail.id]
    delete this.clonedProducts[tourPlanDetail.id];
  }

  deletePlanDetail(id: number) {
    this.curdService.delete("tour_plan_detail", id).subscribe(
      (response) => {
        const planDetail = this.planDetailList.findIndex((detail) => detail.id == id);
        this.planDetailList.splice(planDetail, 1)
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Xóa thành công' });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  checkValid(data: NgForm) {
    if (data.valid && $('#startTime').val() < $('#endTime').val()) {
      return false
    } else {
      return true
    }
  }
}
