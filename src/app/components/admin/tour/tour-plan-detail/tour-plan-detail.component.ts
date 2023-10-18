import { CommonModule, NgFor } from '@angular/common';
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
import { TourPlanDetail } from 'src/app/models/tour-plan-detail.model';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { CurdService } from 'src/app/services/curd.service';
import { TourPlanDetailService } from 'src/app/services/tour-plan-detail.service';

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

  currentTourPlan: TourPlan;
  planDetailList: TourPlanDetail[];
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
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getTourPlanDetailByTourPlanId(planId: number): void {
    this.tourPlanDetailService.getTourPlanDetailsByTourPlanId(planId).subscribe(
      (response: TourPlanDetail[]) => {
        console.log(response);
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
    console.log(data.value)
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
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm thành công' });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  clonedProducts: { [s: number]: TourPlanDetail; } = {};


  onRowEditInit(tourPlanDetail: TourPlanDetail) {
    this.clonedProducts[tourPlanDetail.id as number] = { ...tourPlanDetail };
  }

  onRowEditSave(tourPlan: TourPlanDetail) {
    this.curdService.put('tour_plan_detail', tourPlan).subscribe(
      (response: TourPlan) => {
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Cập nhập thành công' });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
}
