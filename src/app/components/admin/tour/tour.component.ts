import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import axios from 'axios';
import { Subject } from 'rxjs';
import { Tour } from 'src/app/models/tour.model';
import { TourService } from 'src/app/services/tour.service';
import { CurdService } from './../../../services/curd.service';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgbPaginationModule,
    RouterModule,
    NgbDatepickerModule,
    DataTablesModule,
    FormsModule,
    NgIf,
  ],
})
export class TourComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editModal') editModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('addModal') addModal: any;

  dtElement: DataTableDirective;
  public tourList: Tour[];
  public editTour: Tour;
  public provinceList: any;
  public districtList: any;
  public wardList: any;
  host = 'https://provinces.open-api.vn/api/';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  currentPage = 1;
  closeResult = '';
  constructor(
    private curdService: CurdService,
    private tourService: TourService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getTourList();
    this.getProvinceData()
    this.getDistrictData()
    this.getWardData()
    this.dtOptions = {
      ajax: {
        url: 'http://localhost:8080/api/tour/all',
        type: 'GET',
        dataSrc: '',
        dataType: 'json',
      },
      columns: [
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
              '<button class="btn btn-primary" update="' +
              full.id +
              '">Chỉnh sửa</button>'
            );
          },
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
      } else if (event.target.hasAttribute('update')) {
        this.open('edit', event.target.getAttribute('update'));
      } else if (event.target.hasAttribute('delete')) {
        this.open('delete', null);
      }
    });
  }

  provinceValue: number;
  districtValue: number;
  wardValue: number;
  roadValue: string;

  open(content, id: number) {
    if (content == 'add') {
      this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1', null);
      this.modalService
        .open(this.addModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else if (content == 'edit') {
      this.editTour = this.tourList.find((tour) => tour.id == id);
      const provinceAddress = this.editTour.destinationAddress
        .split(',')
      [this.editTour.destinationAddress.split(',').length - 1].trim();
      const districtAddress = this.editTour.destinationAddress
        .split(',')
      [this.editTour.destinationAddress.split(',').length - 2].trim();
      const wardAddress = this.editTour.destinationAddress
        .split(',')
      [this.editTour.destinationAddress.split(',').length - 3].trim();
      this.provinceValue = this.provinceList.find((province) => province.name == provinceAddress).code
      this.districtValue = this.districtList.find((district) => district.name == districtAddress).code
      this.wardValue = this.wardList.find((ward) => ward.name == wardAddress).code
      this.roadValue = this.editTour.destinationAddress
        .substring(0, this.editTour.destinationAddress.indexOf(wardAddress) - 2)
        .trim();
      this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1', this.provinceValue);
      this.callApiDistrict('https://provinces.open-api.vn/api/p/' + this.provinceValue + '?depth=2', this.districtValue);
      this.callApiWard('https://provinces.open-api.vn/api/d/' + this.districtValue + '?depth=2', this.wardValue);
      this.modalService
        .open(this.editModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      this.modalService
        .open(this.deleteModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  }

  public getTourList(): void {
    this.curdService.getList('tour').subscribe(
      (response: Tour[]) => {
        this.tourList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getProvinceData(): void {
    this.tourService.getProvinceList().subscribe(
      (response) => {
        this.provinceList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  public getDistrictData(): void {
    this.tourService.getDistrictList().subscribe(
      (response) => {
        this.districtList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  public getWardData(): void {
    this.tourService.getWardList().subscribe(
      (response) => {
        this.wardList = response;
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

  renderData = (array, select, code) => {
    let row;
    if (select == 'district') {
      row = ' <option disable value="">Chọn Quận/Huyện</option>';
    } else {
      row = ' <option disable value="">Chọn Phường/Xã</option>';
    }
    array.forEach((element) => {
      if (element.code == code) {
        row += `<option value="${element.code}" selected>${element.name}</option>`;
      } else {
        row += `<option value="${element.code}">${element.name}</option>`;
      }
    });
    document.querySelector('#' + select).innerHTML = row;
  };

  callAPIProvince = (api, code) => {
    return axios.get(api).then((response) => {
      this.renderData(response.data, 'province', code);
    });
  };
  callApiDistrict = (api, code) => {
    return axios.get(api).then((response) => {
      this.renderData(response.data.districts, 'district', code);
    });
  };
  callApiWard = (api, code) => {
    return axios.get(api).then((response) => {
      this.renderData(response.data.wards, 'ward', code);
    });
  };
  provinceChange() {
    if ($('#province').val()) {
      this.callApiDistrict(
        this.host + 'p/' + $('#province').val() + '?depth=2', null
      );
      this.printResult();
    } else {
      document.querySelector(
        '#district'
      ).innerHTML = `<option value="">Chọn Quận/Huyện</option>`;
      document.querySelector(
        '#ward'
      ).innerHTML = `<option value="">Chọn Phường/Xã</option>`;
    }
  }
  districtChange() {
    if ($('#district').val()) {
      this.callApiWard(this.host + 'd/' + $('#district').val() + '?depth=2', null);
      this.printResult();
    } else {
      document.querySelector(
        '#ward'
      ).innerHTML = `<option value="">Chọn Phường/Xã</option>`;
    }
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

  submitAdd(data) {
    var province = $('#province option:selected').text();
    var district = $('#district option:selected').text();
    var ward = $('#ward option:selected').text();
    var road = data.value.road;
    var address = road + ', ' + ward + ', ' + district + ', ' + province;
    var tour: Tour = {
      id: null,
      name: data.value.name,
      description: data.value.description,
      destinationAddress: address,
      image: null,
      availableSpaces: data.value.availableSpaces,
      active: false,
      createTime: new Date(),
    };
    this.curdService.post('tour', tour).subscribe(
      (response: Tour) => {
        console.log(response);
        $('.table').DataTable().ajax.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  submitEdit(data) {
    var province = $('#province option:selected').text();
    var district = $('#district option:selected').text();
    var ward = $('#ward option:selected').text();
    var road = data.value.road;
    var address = road + ', ' + ward + ', ' + district + ', ' + province;
    console.log(address);
  }
}
