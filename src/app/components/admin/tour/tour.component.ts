import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbModal,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import axios from 'axios';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Subject } from 'rxjs';
import { TourImage } from 'src/app/models/tour-img.model';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { Tour } from 'src/app/models/tour.model';
import { TourDateService } from 'src/app/services/tour-date.service';
import { TourPlanService } from 'src/app/services/tour-plan.service';
import { TourService } from 'src/app/services/tour.service';
import { TourDate } from './../../../models/tour-date.model';
import { CurdService } from './../../../services/curd.service';
import { TourImageService } from './../../../services/tour-image.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgbPaginationModule,
    RouterModule,
    FormsModule,
    NgIf,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    CalendarModule
  ],
})
export class TourComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('addModal') addModal: ElementRef;
  @ViewChild('editModal') editModal: ElementRef;
  @ViewChild('imageModal') imageModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;
  @ViewChild('dateModal') dateModal: ElementRef;
  @ViewChild('announcementModal') announcementModal: ElementRef;

  constructor(
    private curdService: CurdService,
    private tourService: TourService,
    private tourDateService: TourDateService,
    private tourPlanService: TourPlanService,
    private tourImageService: TourImageService,
    private modalService: NgbModal,
    private fireStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
  ) { }

  dtElement: DataTableDirective;
  public tourList: Tour[];
  public tourDateList: TourDate[];
  public tourImageList: TourImage[];
  public editTour: Tour;
  public provinceList: any;
  public districtList: any;
  public wardList: any;

  host = 'https://provinces.open-api.vn/api/';
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  closeResult = '';

  file = null
  mainImgUrl = null
  currentDate = new Date();

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  ngOnInit(): void {
    this.getTourList();
    this.getProvinceData()
    this.getDistrictData()
    this.getWardData()
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next(0);
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
      const randomNumberString = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
      const path = `tour-img/${randomNumberString}`
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
          this.editTour = null
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
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
      const randomNumberString = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
      const path = `tour-img/${randomNumberString}`
      const upload = await this.fireStorage.upload(path, file)
      const url = await upload.ref.getDownloadURL()
      const editImageTour = this.tourImageList.find((tour) => tour.id == id);
      this.fireStorage.storage.refFromURL(editImageTour.path).delete()
      editImageTour.path = url
      this.curdService.put('tour_image', editImageTour).subscribe(
        (response: TourImage) => {
          this.getTourImageList(this.editTour.id);
          this.editTour = null
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
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
    if (object === 'tour') {
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteTour(id));
    } else if (object == 'image') {
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteImage(id));
    } else if (object == 'tour_date') {
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteDate(id));
    }
  }

  deleteTour(id: number) {
    this.curdService.delete('tour', id).subscribe(
      (response) => {
        const editTour = this.tourList.findIndex((tour) => tour.id == id);
        this.fireStorage.storage.refFromURL(this.tourList[editTour].image).delete()
        this.tourList.splice(editTour, 1)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  deleteImage(id: number) {
    this.curdService.delete('tour_image', id).subscribe(
      (response) => {
        const editImageTour = this.tourImageList.findIndex((tourImage) => tourImage.id == id);
        this.fireStorage.storage.refFromURL(this.tourImageList[editImageTour].path).delete()
        this.tourImageList.splice(editImageTour, 1)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  deleteDate(id: number) {
    this.curdService.delete('tour_date', id).subscribe(
      (response) => {
        const editDateTour = this.tourDateList.findIndex((tourDate) => tourDate.id == id);
        this.tourDateList.splice(editDateTour, 1)
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

  open(content, message: string, id: number) {
    if (content == 'announcement') {
      this.modalService
        .open(this.announcementModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
        })
      document.getElementById('message').innerHTML = message
    } else if (content == 'add') {
      this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1', null);
      this.modalService
        .open(this.addModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
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
    } else if (content == 'image') {
      this.editTour = this.tourList.find((tour) => tour.id == id);
      this.getTourImageList(id);
      this.modalService
        .open(this.imageModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
      document.querySelector('#addImageBtn').addEventListener('click', (e: Event) => this.addImage());
    } else if (content == 'date') {
      this.editTour = this.tourList.find((tour) => tour.id == id);
      this.getTourDateList(this.editTour.id)
      this.modalService
        .open(this.dateModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
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
    const randomNumberString = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
    const path = `tour-img/${randomNumberString}`
    const upload = await this.fireStorage.upload(path, this.file)
    const url = await upload.ref.getDownloadURL()
    tour.image = url
    this.curdService.post('tour', tour).subscribe(
      (response: Tour) => {
        this.getTourList();
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
      this.fireStorage.storage.refFromURL(this.editTour.image).delete()
      const randomNumberString = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
      const path = `tour-img/${randomNumberString}`
      const upload = await this.fireStorage.upload(path, this.file)
      const url = await upload.ref.getDownloadURL()
      tour.image = url
    } else {
      tour.image = this.editTour.image
    }
    this.curdService.put('tour', tour).subscribe(
      (response: Tour) => {
        this.getTourList();
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

  clonedProducts: { [s: number]: TourDate; } = {};
  addDateStatus = false

  addDate() {
    this.addDateStatus = true
  }

  saveDate() {
    var date: Date = new Date((<HTMLInputElement>document.getElementById('addDate')).value)
    const tourDate: TourDate = {
      id: null,
      initiateDate: date,
      tour: this.editTour
    }
    this.curdService.post('tour_date', tourDate).subscribe(
      (response: TourDate) => {
        this.getTourDateList(this.editTour.id)
        this.addDateStatus = false
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  cancelAddDate() {
    this.addDateStatus = false
  }

  onRowEditInit(tourDate: TourDate) {
    this.clonedProducts[tourDate.id as number] = { ...tourDate };
  }

  onRowEditSave(tourDate: TourDate) {
    this.curdService.put('tour_date', tourDate).subscribe(
      (response: TourDate) => {
        delete this.clonedProducts[tourDate.id]
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onRowEditCancel(tourDate: TourDate, index: number) {
    this.tourDateList[index] = this.clonedProducts[tourDate.id]
    delete this.clonedProducts[tourDate.id];
  }

  checkDeleteable(object: string, id: number) {
    if (object == 'tour') {
      var tourDateList: TourDate[]
      var imageList: TourImage[]
      this.tourDateService.getTourDateByTourId(id).subscribe(
        (response) => {
          tourDateList = response;
          if (tourDateList.length == 0) {
            this.tourImageService.getTourImageByTourId(id).subscribe(
              (response) => {
                imageList = response;
                if (imageList.length == 0) {
                  this.confirmDelete('tour', id)
                } else {
                  this.open('announcement', 'Bảng này đang được sử dụng tại những bảng khác không thể xóa được', null)
                }
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
              }
            )
          } else {
            this.open('announcement', 'Bảng này đang được sử dụng tại những bảng khác không thể xóa được', null)
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    } else if (object == 'date') {
      var planList: TourPlan[]
      this.tourPlanService.getTourPlansByDateID(id).subscribe(
        (response) => {
          planList = response;
          if (planList.length == 0) {
            this.confirmDelete('tour_date', id)
          } else {
            this.open('announcement', 'Bảng này đang được sử dụng tại những bảng khác không thể xóa được', null)
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    }
  }
}
