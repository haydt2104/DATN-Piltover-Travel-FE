import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TourDate } from 'src/app/models/tour-date.model';
import { Transportation } from 'src/app/models/transportation.model';
import { CurdService } from 'src/app/services/curd.service';
import { TourPlanService } from 'src/app/services/tour/tour-plan.service';
import { TourPlanDetailService } from '../../../../services/tour/tour-plan-detail.service';
import { TourPlan } from './../../../../models/tour-plan.model';
import { MultiSelectModule } from 'primeng/multiselect';


@Component({
  selector: 'app-tour-plan',
  templateUrl: './tour-plan.component.html',
  styleUrls: ['./tour-plan.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    CommonModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ToastModule,
    MultiSelectModule
  ],
  providers: [MessageService]
})
export class TourPlanComponent implements OnInit {
  @ViewChild('addModal') addModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;

  currentTourDate: TourDate = null;
  planList: TourPlan[] = [];
  transportList: Transportation[] = [];
  transportList2: Transportation[] = [];
  minDate: Date
  maxDate: Date

  constructor(
    private route: ActivatedRoute,
    private tourPlanService: TourPlanService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private curdService: CurdService,
    private messageService: MessageService,
    private planDetailService: TourPlanDetailService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getCurrentTourDate(id);
      this.getTourPlansByDateID(id);
      this.getAllTransport()
    });
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
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteTourPlan(id));
    }
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  public getCurrentTourDate(tourDateId: number): void {
    this.curdService.getSpecificObject('tour_date', tourDateId).subscribe(
      (response: TourDate) => {
        this.currentTourDate = response;
        this.minDate = new Date(this.currentTourDate.initiateDate);
        this.maxDate = new Date(this.currentTourDate.endDate);
        this.minDate.setHours(this.minDate.getHours() - 7);
        this.maxDate.setHours(this.maxDate.getHours() + 17);
        this.maxDate.setMinutes(this.maxDate.getMinutes() - 1)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getTourPlansByDateID(tourId: number): void {
    this.tourPlanService.getTourPlansByDateID(tourId).subscribe(
      (response: TourPlan[]) => {
        this.planList = response;
        for (let plan of this.planList) {
          plan.startTime = new Date(plan.startTime);
          plan.startTime.setHours(plan.startTime.getHours() + 7)
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getAllTransport() {
    this.curdService.getList('transport').subscribe(
      (response: Transportation[]) => {
        this.transportList = response
        this.transportList2 = response.filter(transport => transport.isDelete == false);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  submitAdd(data) {
    for (var plan of this.planList) {
      if (new Date(data.value.startTime).getDay() == new Date(plan.startTime).getDay()
        && new Date(data.value.startTime).getMonth() == new Date(plan.startTime).getMonth()
        && new Date(data.value.startTime).getFullYear() == new Date(plan.startTime).getFullYear()
      ) {
        this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Ngày này đã tồn tại' });
        return;
      }
    }
    var transport: Transportation = this.transportList.find(transport => transport.id == data.value.transport)
    var date: Date = new Date(Date.parse(data.value.startTime));
    var plan: TourPlan = {
      id: null,
      startName: data.value.startLocation,
      startAddress: data.value.startAddress,
      startTime: date,
      transport: transport,
      tourDate: this.currentTourDate,
    }
    this.curdService.post('tour_plan', plan).subscribe(
      (response: TourPlan) => {
        this.getTourPlansByDateID(this.currentTourDate.id);
        this.modalService.dismissAll()
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm thành công' });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  clonedProducts: { [s: number]: TourPlan; } = {};

  onRowEditInit(tourPlan: TourPlan) {
    tourPlan.startTime = new Date(tourPlan.startTime)
    tourPlan.startTime.setHours(tourPlan.startTime.getHours() - 7);
    this.clonedProducts[tourPlan.id as number] = { ...tourPlan };
  }

  dateChanged(eventDate: string): Date | null {
    return !!eventDate ? new Date(eventDate) : null;
  }

  onRowEditSave(tourPlan: TourPlan, index: number) {
    tourPlan.transport = this.transportList.find(transport => transport.id == tourPlan.transport.id);
    if (tourPlan.transport == null) {
      tourPlan.transport = this.transportList.find(transport => transport.id === this.clonedProducts[tourPlan.id].transport.id);
    }
    this.curdService.put('tour_plan', tourPlan).subscribe(
      (response) => {
        delete this.clonedProducts[tourPlan.id]
        this.getTourPlansByDateID(this.currentTourDate.id)
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Cập nhập thành công' });
      },
      (error: HttpErrorResponse) => {
        this.clonedProducts[tourPlan.id].startTime.setHours(this.clonedProducts[tourPlan.id].startTime.getHours() + 7)
        this.planList[index] = this.clonedProducts[tourPlan.id]
        this.messageService.clear();
        this.messageService.add({ key: 'error', severity: 'error', summary: 'Lỗi', detail: 'Cập nhập thất bại vui lòng điền đầy đủ dữ liệu' });
      }
    )
  }

  onRowEditCancel(tourPlan: TourPlan, index: number) {
    this.clonedProducts[tourPlan.id].startTime.setHours(this.clonedProducts[tourPlan.id].startTime.getHours() + 7)
    this.planList[index] = this.clonedProducts[tourPlan.id]
    delete this.clonedProducts[tourPlan.id];
  }

  checkDeleteable(id: number) {
    this.planDetailService.getTourPlanDetailsByTourPlanId(id).subscribe(
      (response) => {
        if (response.length == 0) {
          this.open("confirm", id);
        } else {
          this.messageService.clear();
          this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Kế Hoạch Đã Có Chi Tiết Không Thể Xóa Được' });
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  checkValidDate(tourDate: TourDate, tourPlan: TourPlan) {
    var startTime: Date = new Date(tourPlan.startTime)
    startTime.setHours(startTime.getHours() - 7)
    var initiateDate: Date = new Date(tourDate.initiateDate)
    initiateDate.setHours(initiateDate.getHours() - 7)
    var endDate: Date = new Date(tourDate.endDate)
    endDate.setHours(endDate.getHours() + 17)
    var dateDif1 = Math.round(Number(startTime.getTime()) - Number(initiateDate.getTime())) / (24 * 60 * 60 * 1000)
    var dateDif2 = Math.round(Number(startTime.getTime()) - Number(endDate.getTime())) / (24 * 60 * 60 * 1000)
    if (dateDif1 < 0 || dateDif2 > 0) {
      return true;
    } else {
      return false;
    }
  }

  deleteTourPlan(id: number) {
    this.curdService.delete("tour_plan", id).subscribe(
      (response) => {
        const tourPlan = this.planList.findIndex((plan) => plan.id == id);
        this.planList.splice(tourPlan, 1)
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Xóa thành công' });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
