import { NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Tour } from '../../../models/tour.entity';
import { CurdService } from './../../../services/curd.service';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import axios from 'axios';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgbPaginationModule,
    RouterModule,
    NgbDatepickerModule,
    DataTablesModule,
  ],
})
export class TourComponent implements OnInit, OnDestroy, AfterViewInit {
  public tourList: Tour[];
  host = 'https://provinces.open-api.vn/api/';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentPage = 1;
  closeResult = '';
  constructor(
    private curdService: CurdService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1');
    this.getTourList();
    this.dtOptions = {
      ajax: {
        url: 'http://localhost:8080/api/tour/all',
        type: 'GET',
        dataSrc: '',
        dataType: 'json',
      },
      columns: [
        {
          title: 'Mã Tour',
          data: 'id',
        },
        {
          title: 'Tên Tour',
          data: 'name',
        },
        {
          title: 'Điểm đến',
          data: 'destinationAddress',
        },
        {
          title: 'Trạng thái',
          data: 'active',
        },
        {
          title: 'Số lượng',
          data: 'availableSpaces',
        },
        {
          title: '',
          render: function (data: any, type: any, full: any) {
            return (
              '<button class="btn btn-primary" route="' +
              full.id +
              '">Kế Hoạch</button>'
            );
          },
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('route')) {
        this.router.navigate([
          '/admin/tour/details/' + event.target.getAttribute('route'),
        ]);
      }
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  public getTourList(): void {
    this.curdService.getList('tour').subscribe(
      (response: Tour[]) => {
        this.tourList = response;
        console.log(this.tourList);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  renderData = (array, select) => {
    let row = ' <option disable value="">chọn</option>';
    array.forEach((element) => {
      row += `<option value="${element.code}">${element.name}</option>`;
    });
    document.querySelector('#' + select).innerHTML = row;
  };

  callAPIProvince = (api) => {
    return axios.get(api).then((response) => {
      this.renderData(response.data, 'province');
    });
  };
  callApiDistrict = (api) => {
    return axios.get(api).then((response) => {
      this.renderData(response.data.districts, 'district');
    });
  };
  callApiWard = (api) => {
    return axios.get(api).then((response) => {
      this.renderData(response.data.wards, 'ward');
    });
  };
  provinceChange() {
    this.callApiDistrict(this.host + 'p/' + $('#province').val() + '?depth=2');
    this.printResult();
  }
  districtChange() {
    this.callApiWard(this.host + 'd/' + $('#district').val() + '?depth=2');
    this.printResult();
  }
  wardChange() {
    this.printResult();
  }
  printResult = () => {
    if (
      $('#district').val() != '' &&
      $('#province').val() != '' &&
      $('#ward').val() != ''
    ) {
      let result =
        $('#province option:selected').text() +
        ' | ' +
        $('#district option:selected').text() +
        ' | ' +
        $('#ward option:selected').text();
      $('#result').text(result);
    }
  };
}
