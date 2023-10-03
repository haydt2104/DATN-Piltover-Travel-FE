import { DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormsModule, NgForm } from '@angular/forms';
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
import { TourDateService } from 'src/app/services/tour-date.service';
import { TourService } from 'src/app/services/tour.service';
import { TourDate } from './../../../models/tour-date.model';
import { CurdService } from './../../../services/curd.service';
import { TourImageService } from './../../../services/tour-image.service';
import { TourImage } from 'src/app/models/tour-img.model';
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
  providers: [DatePipe]
})
export class TourComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('addModal') addModal: ElementRef;
  @ViewChild('editModal') editModal: ElementRef;
  @ViewChild('deleteModal') deleteModal: ElementRef;
  @ViewChild('imageModal') imageModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;
  @ViewChild('dateModal') dateModal: ElementRef;

  constructor(
    private curdService: CurdService,
    private tourService: TourService,
    private tourDateService: TourDateService,
    private tourImageService: TourImageService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private router: Router,
    private fireStorage: AngularFireStorage,
    private datePipe: DatePipe
  ) { }

  dtElement: DataTableDirective;
  public tourList: Tour[];
  public tourDateList: TourDate[];
  public tourImageList: TourImage[];
  public editTour: Tour;
  public provinceList: any;
  public districtList: any;
  public wardList: any;
  public currentDate: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  host = 'https://provinces.open-api.vn/api/';
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  closeResult = '';

  file = null
  mainImgUrl = null

  ngOnInit(): void {
    this.getTourList();
    this.getProvinceData()
    this.getDistrictData()
    this.getWardData()
    this.dtOptions[0] = {
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
              '<button class="btn btn-primary" date="' +
              full.id +
              '">Ngày</button>'
            );
          },
        },
        {
          title: '',
          render: function (data: any, type: any, full: any) {
            return (
              '<button class="btn btn-primary" pic="' +
              full.id +
              '">Ảnh</button>'
            );
          },
        },
        {
          title: '',
          render: function (data: any, type: any, full: any) {
            return (
              '<button class="btn btn-primary" update="' +
              full.id +
              '">Sửa</button>'
            );
          },
        }
      ],
    };
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next(0);
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('route')) {
        document.getElementById('closeDateModal').click();
        this.router.navigate([
          '/admin/tour/details/' + event.target.getAttribute('route'),
        ]).then(() => {
          window.location.reload();
        });
      } else if (event.target.hasAttribute('update')) {
        this.open('edit', event.target.getAttribute('update'));
      } else if (event.target.hasAttribute('delete')) {
        this.open('delete', event.target.getAttribute('delete'));
      } else if (event.target.hasAttribute('pic')) {
        this.open('image', event.target.getAttribute('pic'));
      } else if (event.target.hasAttribute('date')) {
        this.open('date', event.target.getAttribute('date'));
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onFileChange(event: any) {
    this.file = event.target.files[0]
    if (this.file.type.match(/image\/*/) && this.file.size <= 6000000) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e: any) => {
        this.mainImgUrl = e.target.result
      }
    } else {
      alert("Tour chỉ nhận ảnh từ 5MB trở xuống")
    }
  }

  addImage() {
    document.getElementById("addImageInput").click();
  }

  async saveNewImage(event: any) {
    const file = event.target.files[0]
    if (file.type.match(/image\/*/) && file.size <= 6000000) {
      const path = `tour-img/${new Date + file.name}`
      const upload = await this.fireStorage.upload(path, file)
      const url = await upload.ref.getDownloadURL()
      var tourImage: TourImage = {
        id: null,
        path: url,
        tour: this.editTour
      }
      this.curdService.post('tour_image', tourImage).subscribe(
        (response: TourImage) => {
          this.getTourImageList(this.editTour.id);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.editTour = null
    } else {
      alert("Tour chỉ nhận file ảnh từ 5MB trở xuống")
    }
  }

  updateImage(id: number) {
    document.getElementById("image_" + id).click();
  }

  async changeImage(event: any, id: number) {
    const file = event.target.files[0]
    if (file.type.match(/image\/*/) && file.size <= 6000000) {
      const path = `tour-img/${new Date + file.name}`
      const upload = await this.fireStorage.upload(path, file)
      const url = await upload.ref.getDownloadURL()
      const editImageTour = this.tourImageList.find((tour) => tour.id == id);
      editImageTour.path = url
      this.curdService.put('tour_image', editImageTour).subscribe(
        (response: TourImage) => {
          this.getTourImageList(this.editTour.id);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.editTour = null
    } else {
      alert("Tour chỉ nhận file ảnh từ 5MB trở xuống")
    }
  }

  confirmDelete(object: string, id: number) {
    this.modalService
      .open(this.confirmModal, {
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
    if (object === 'tour') {

    } else if (object == 'image') {
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteImage(id));
    }
  }

  deleteImage(id: number) {
    this.curdService.delete('tour_image', id).subscribe(
      (response) => {
        const editImageTour = this.tourImageList.findIndex((tour) => tour.id == id);
        this.tourImageList.splice(editImageTour, 1)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  provinceValue: number;
  districtValue: number;
  wardValue: number;
  roadValue: string;

  tourId: number

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
      this.mainImgUrl = this.editTour.image
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
    } else if (content == 'delete') {
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
    } else if (content == 'image') {
      this.editTour = this.tourList.find((tour) => tour.id == id);
      this.getTourImageList(id);
      this.modalService
        .open(this.imageModal, {
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
      document.querySelector('#addImageBtn').addEventListener('click', (e: Event) => this.addImage());
    } else if (content == 'date') {
      this.editTour = this.tourList.find((tour) => tour.id == id);
      // const formatedDate = this.currentDate.getFullYear() + "/" + [this.currentDate.getMonth() + 1] + "/" + this.currentDate.getDate();
      this.dtOptions[1] = {
        ajax: {
          url: `http://localhost:8080/api/tour_date?tourId=${this.editTour.id}`,
          type: 'GET',
          dataSrc: '',
          dataType: 'json',
        },
        columns: [
          {
            title: 'Thời điểm khởi hành',
            data: 'initiateDate',
          },
          {
            title: '',
            render: function (data: any, type: any, full: any) {
              return (
                '<button class="btn btn-primary" updateDate="' +
                full.id +
                '">Sửa</button><input type="date" min="' + this.currentDate + '"></input>'
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
      this.modalService
        .open(this.dateModal, {
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

  public getTourDateList(id: number) {
    this.tourDateService.getTourDateByTourId(id).subscribe(
      (response: TourDate[]) => {
        this.tourDateList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  public getTourImageList(id: number) {
    this.tourImageService.getTourImageByTourId(id).subscribe(
      (response: TourImage[]) => {
        this.tourImageList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  private getDismissReason(reason: any): string {
    this.mainImgUrl = null
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

  async submitAdd(data) {
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
      price: {
        id: null,
        adultPrice: data.value.adult,
        childrenPrice: data.value.children
      }
    };
    const path = `tour-img/${new Date + this.file.name}`
    const upload = await this.fireStorage.upload(path, this.file)
    const url = await upload.ref.getDownloadURL()
    tour.image = url
    this.curdService.post('tour', tour).subscribe(
      (response: Tour) => {
        this.getTourList();
        $('.table').DataTable().ajax.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.mainImgUrl = null;
  }

  async submitEdit(data) {
    var province = $('#province option:selected').text();
    var district = $('#district option:selected').text();
    var ward = $('#ward option:selected').text();
    var road = data.value.road;
    var address = road + ', ' + ward + ', ' + district + ', ' + province;
    var tour: Tour = {
      id: this.editTour.id,
      name: data.value.name,
      description: data.value.description,
      destinationAddress: address,
      image: null,
      availableSpaces: data.value.availableSpaces,
      active: this.editTour.active,
      createTime: this.editTour.createTime,
      price: {
        id: this.editTour.price.id,
        adultPrice: data.value.adult,
        childrenPrice: data.value.children
      }
    };
    if (this.mainImgUrl != this.editTour.image) {
      const path = `tour-img/${new Date + this.file.name}`
      const upload = await this.fireStorage.upload(path, this.file)
      const url = await upload.ref.getDownloadURL()
      tour.image = url
    } else {
      tour.image = this.editTour.image
    }
    this.curdService.put('tour', tour).subscribe(
      (response: Tour) => {
        this.getTourList();
        $('.table').DataTable().ajax.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.editTour = null
    this.mainImgUrl = null
  }

  checkValid(type: string, data: NgForm) {
    if (type == 'add') {
      if (data.valid && this.mainImgUrl && $('#province').val() && $('#district').val() && $('#ward').val()) {
        return false;
      } else {
        return true
      }
    } else {
      if (data.valid && this.mainImgUrl && $('#province').val() && $('#district').val() && $('#ward').val()) {
        return false
      } else {
        return true;
      }
    }
  }
}
