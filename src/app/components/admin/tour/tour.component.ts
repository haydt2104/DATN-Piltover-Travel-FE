import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbModal,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import * as $ from "jquery";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Booking } from 'src/app/models/booking.model';
import { Hotel } from 'src/app/models/hotel.model';
import { Status } from 'src/app/models/status.model';
import { TourImage } from 'src/app/models/tour-img.model';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { Tour } from 'src/app/models/tour.model';
import { Transportation } from 'src/app/models/transportation.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TourDateService } from 'src/app/services/tour/tour-date.service';
import { TourPlanService } from 'src/app/services/tour/tour-plan.service';
import { TourService } from 'src/app/services/tour/tour.service';
import { TourImageService } from '../../../services/tour/tour-image.service';
import { TourDate } from './../../../models/tour-date.model';
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
    FormsModule,
    NgIf,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    ProgressSpinnerModule,
    ProgressBarModule
  ],
  providers: [MessageService]
})
export class TourComponent implements OnInit {
  @ViewChild('addTourModal') addTourModal: ElementRef;
  @ViewChild('editTourModal') editTourModal: ElementRef;
  @ViewChild('imageModal') imageModal: ElementRef;
  @ViewChild('hotelModal') hotelModal: ElementRef;
  @ViewChild('addHotelModal') addHotelModal: ElementRef;
  @ViewChild('editHotelModal') editHotelModal: ElementRef;
  @ViewChild('transportModal') transportModal: ElementRef;
  @ViewChild('addTransportModal') addTransportModal: ElementRef;
  @ViewChild('editTransportModal') editTransportModal: ElementRef;
  @ViewChild('bookingModal') bookingModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;
  @ViewChild('confirmStatusModal') confirmStatusModal: ElementRef;
  @ViewChild('dateModal') dateModal: ElementRef;

  constructor(
    private curdService: CurdService,
    private tourService: TourService,
    private tourDateService: TourDateService,
    private tourPlanService: TourPlanService,
    private tourImageService: TourImageService,
    private bookingService: BookingService,
    private hotelService: HotelService,
    private modalService: NgbModal,
    private fireStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) { }

  public tourList: Tour[] = [];
  public tourDateList: TourDate[] = [];
  public tourImageList: TourImage[] = [];
  public transportList: Transportation[] = [];
  public availableTransport: Transportation[] = [];
  public editTransport: Transportation;
  public statusList: Status[] = [];
  public bookingList: Booking[] = [];
  public editTour: Tour;
  public editBookingList: Booking[] = [];
  public hotelList: Hotel[] = []
  public editHotel: Hotel;
  public provinceList: any;
  public districtList: any;
  public wardList: any;
  public loadingProgress$ = this.loadingService.loadingProgress$
  public loadingOverLay$ = this.loadingService.loadingOverLay$

  host = 'https://provinces.open-api.vn/api/';
  file = null
  mainImgUrl = null
  minDate = new Date().setDate(new Date().getDate() + 8);
  roadValue: string;
  tourId: number

  ngOnInit(): void {
    this.getTourList();
    this.getAllTransport();
    this.getAllStatus();
    this.getProvinceData();
    this.getDistrictData();
    this.getWardData();
    this.getHotelList();
    this.loadingService.hideOverLay()
  }

  open(content: string, id: number) {
    if (content == 'addTour') {
      this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1', null);
      this.mainImgUrl = null
      this.modalService
        .open(this.addTourModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
    } else if (content == 'editTour') {
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
      var provinceValue = this.provinceList.find((province) => province.name == provinceAddress).code
      var districtValue = this.districtList.find((district) => district.name == districtAddress).code
      var wardValue = this.wardList.find((ward) => ward.name == wardAddress).code
      this.roadValue = this.editTour.destinationAddress
        .substring(0, this.editTour.destinationAddress.indexOf(wardAddress) - 2)
        .trim();
      this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1', provinceValue);
      this.callApiDistrict('https://provinces.open-api.vn/api/p/' + provinceValue + '?depth=2', districtValue);
      this.callApiWard('https://provinces.open-api.vn/api/d/' + districtValue + '?depth=2', wardValue);
      this.mainImgUrl = this.editTour.image
      this.modalService
        .open(this.editTourModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
      this.callHotel(provinceAddress, districtAddress, wardAddress, this.editTour.hotel.id)
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
      this.getBookingList();
      this.modalService
        .open(this.dateModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
    } else if (content == 'booking') {
      var editDate = this.tourDateList.find((tour) => tour.id == id);
      this.editBookingList = this.getBooking(editDate.id)
      this.modalService
        .open(this.bookingModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
    } else if (content == 'hotel') {
      this.modalService
        .open(this.hotelModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
    } else if (content == 'addHotel') {
      this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1', null);
      this.modalService
        .open(this.addHotelModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
        })
    } else if (content == 'editHotel') {
      this.editHotel = this.hotelList.find(hotel => hotel.id == id);
      const provinceAddress = this.editHotel.address
        .split(',')
      [this.editHotel.address.split(',').length - 1].trim();
      const districtAddress = this.editHotel.address
        .split(',')
      [this.editHotel.address.split(',').length - 2].trim();
      const wardAddress = this.editHotel.address
        .split(',')
      [this.editHotel.address.split(',').length - 3].trim();
      var provinceValue = this.provinceList.find((province) => province.name == provinceAddress).code
      var districtValue = this.districtList.find((district) => district.name == districtAddress).code
      var wardValue = this.wardList.find((ward) => ward.name == wardAddress).code
      this.roadValue = this.editHotel.address
        .substring(0, this.editHotel.address.indexOf(wardAddress) - 2)
        .trim();
      this.callAPIProvince('https://provinces.open-api.vn/api/?depth=1', provinceValue);
      this.callApiDistrict('https://provinces.open-api.vn/api/p/' + provinceValue + '?depth=2', districtValue);
      this.callApiWard('https://provinces.open-api.vn/api/d/' + districtValue + '?depth=2', wardValue);
      this.modalService
        .open(this.editHotelModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
    } else if (content == 'transport') {
      this.modalService
        .open(this.transportModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
    } else if (content == 'addTransport') {
      this.modalService
        .open(this.addTransportModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
        })
    } else if (content == 'editTransport') {
      this.editTransport = this.transportList.find(transport => transport.id == id)
      this.modalService
        .open(this.editTransportModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
        })
    }
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

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
    this.loadingService.showButton()
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
          this.loadingService.hideButton()
          this.messageService.clear();
          this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm ảnh thành công' })
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    } else {
      this.messageService.clear();
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Tour chỉ nhận duy nhất file kiểu ảnh và từ 5MB trở xuống' });
    }
  }

  updateImage(id: number) {
    document.getElementById("image_" + id).click();
  }

  async changeImage(event: any, id: number) {
    this.loadingService.showButton()
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
          this.loadingService.hideButton()
          this.messageService.clear();
          this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Cập nhập ảnh thành công' })
          this.editTour = null
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    } else {
      this.messageService.clear();
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Tour chỉ nhận duy nhất file kiểu ảnh và từ 5MB trở xuống' });
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
    } else if (object == 'hotel') {
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteHotel(id));
    } else if (object == 'transport') {
      document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteTransport(id));
    }
  }

  deleteTour(id: number) {
    this.curdService.delete('tour', id).subscribe(
      (response) => {
        const editTour = this.tourList.findIndex((tour) => tour.id == id);
        this.fireStorage.storage.refFromURL(this.tourList[editTour].image).delete()
        this.getTourList();
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Xóa thành công' });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  deleteImage(id: number) {
    this.curdService.delete('tour_image', id).subscribe(
      (response) => {
        const editImageTour = this.tourImageList.findIndex((tourImage) => tourImage.id == id);
        this.fireStorage.storage.refFromURL(this.tourImageList[editImageTour].path).delete()
        this.tourImageList.splice(editImageTour, 1)
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Xóa thành công' });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  deleteDate(id: number) {
    this.curdService.delete('tour_date', id).subscribe(
      (response) => {
        this.getTourDateList(this.editTour.id)
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Xóa thành công' });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  deleteHotel(id: number) {
    this.curdService.delete('hotel', id).subscribe(
      (response) => {
        this.getHotelList();
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Xóa thành công' });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  deleteTransport(id: number) {
    this.curdService.delete('transport', id).subscribe(
      (response) => {
        this.getAllTransport();
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Xóa thành công' });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
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
        setInterval(() => this.autoUpdateTourDateStatus(), 1000)
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

  public getAllTransport() {
    this.curdService.getList('transport').subscribe(
      (response: Transportation[]) => {
        this.transportList = response
        this.availableTransport = response.filter(transport => transport.isDelete == false)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getAllStatus() {
    this.curdService.getList('status').subscribe(
      (response) => {
        this.statusList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getBookingList() {
    this.bookingService.getAllBooking().subscribe(
      (response) => {
        this.bookingList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getHotelList() {
    this.hotelService.getAllHotel().subscribe(
      (response) => {
        this.hotelList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public autoUpdateTourDateStatus() {
    for (var i = 0; i < this.tourDateList.length; i++) {
      var dateDif = this.getDateDiffer(this.tourDateList[i].initiateDate)
      if (dateDif < 7 && this.tourDateList[i].status.id != 2) {
        this.tourDateList[i].status = this.statusList.find(status => status.id == 3);
        this.curdService.put('tour_date', this.tourDateList[i]).subscribe(
          (response) => {
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      }
    }
  }

  public getDateDiffer(date: Date): number {
    var dateDif = Math.round(Number(new Date(date).getTime()) - Number(new Date().getTime())) / (24 * 60 * 60 * 1000)
    return dateDif
  }

  renderData = (array, select, code) => {
    let row;
    if (select == 'province') {
      row = ' <option disable value="">Chọn Tỉnh/Thành Phố</option>';
    } else if (select == 'district') {
      row = ' <option disable value="">Chọn Quận/Huyện</option>';
    } else if (select == 'ward') {
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
    } else {
      document.querySelector(
        '#district'
      ).innerHTML = `<option value="">Chọn Quận/Huyện</option>`;
    }
    document.querySelector(
      '#ward'
    ).innerHTML = `<option value="">Chọn Phường/Xã</option>`;
    var hotel = document.getElementById('hotel')
    if (hotel) {
      document.querySelector(
        '#hotel'
      ).innerHTML = `<option value="">Chọn Khách Sạn</option>`;
    }
  }

  districtChange() {
    if ($('#district').val()) {
      this.callApiWard(this.host + 'd/' + $('#district').val() + '?depth=2', null);
    } else {
      document.querySelector(
        '#ward'
      ).innerHTML = `<option value="">Chọn Phường/Xã</option>`;
    }
    var hotel = document.getElementById('hotel')
    if (hotel) {
      document.querySelector(
        '#hotel'
      ).innerHTML = `<option value="">Chọn Khách Sạn</option>`;
    }
  }

  wardChange() {
    var provinceName = $('#province option:selected').text()
    var districtName = $('#district option:selected').text()
    var wardName = $('#ward option:selected').text()
    this.callHotel(provinceName, districtName, wardName, null)
  }

  callHotel(provinceName, districtName, wardName, code) {
    let row = ' <option disable value="">Chọn Khách Sạn</option>';
    this.hotelList.filter(hotel =>
      hotel.address.split(',')[hotel.address.split(',').length - 1].trim() == provinceName
      && hotel.address.split(',')[hotel.address.split(',').length - 2].trim() == districtName
      && hotel.address.split(',')[hotel.address.split(',').length - 3].trim() == wardName
    ).forEach((item) => {
      if (item.id == code) {
        row += `<option value="${item.id}" selected>${item.name}</option>`;
      } else {
        row += `<option value="${item.id}">${item.name}</option>`;
      }
    })
    document.querySelector('#hotel').innerHTML = row;
  }

  async submitAddTour(data) {
    this.loadingService.showOverLay()
    var province = $('#province option:selected').text();
    var district = $('#district option:selected').text();
    var ward = $('#ward option:selected').text();
    var road = data.value.road;
    var address = road + ', ' + ward + ', ' + district + ', ' + province;
    var transport: Transportation = this.transportList.find(transport => transport.id == data.value.transport)
    var hotel: Hotel = this.hotelList.find(hotel => hotel.id == data.value.hotel)
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
        adultPrice: data.value.adult * 1000000,
        childrenPrice: data.value.children * 1000000
      },
      transport: transport,
      hotel: hotel
    };
    const randomNumberString = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
    const path = `tour-img/${randomNumberString}`
    const upload = await this.fireStorage.upload(path, this.file)
    const url = await upload.ref.getDownloadURL()
    tour.image = url
    this.curdService.post('tour', tour).subscribe(
      (response: Tour) => {
        this.getTourList();
        this.loadingService.hideOverLay()
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm thành công' })
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    this.mainImgUrl = null;
  }

  async submitEditTour(data) {
    this.loadingService.showOverLay()
    var transport: Transportation = this.transportList.find(transport => transport.id == data.value.transport)
    var hotel: Hotel = this.hotelList.find(hotel => hotel.id == data.value.hotel)
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
        adultPrice: data.value.adult * 1000000,
        childrenPrice: data.value.children * 1000000
      },
      transport: transport,
      hotel: hotel
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
        this.loadingService.hideOverLay()
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Cập nhập thành công' })
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  submitAddHotel(data) {
    var province = $('#province option:selected').text();
    var district = $('#district option:selected').text();
    var ward = $('#ward option:selected').text();
    var road = data.value.road;
    var address = road + ', ' + ward + ', ' + district + ', ' + province;
    var hotel: Hotel = {
      id: null,
      name: data.value.name,
      price: data.value.price * 1000,
      star: data.value.star,
      address: address
    }
    this.hotelService.addHotel(hotel).subscribe(
      (response) => {
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm thành công' })
        this.getHotelList();
      },
      (error) => {
        console.log(error.message);
      }
    )
  }

  submitEditHotel(data) {
    var province = $('#province option:selected').text();
    var district = $('#district option:selected').text();
    var ward = $('#ward option:selected').text();
    var road = data.value.road;
    var address = road + ', ' + ward + ', ' + district + ', ' + province;
    var hotel: Hotel = {
      id: this.editHotel.id,
      name: data.value.name,
      price: data.value.price * 1000,
      star: data.value.star,
      address: address
    }
    this.hotelService.editHotel(hotel).subscribe(
      (response) => {
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Cập nhập thành công' })
        this.getHotelList();
      },
      (error) => {
        console.log(error.message);
      }
    )
  }

  submitAddTransport(data) {
    var transport: Transportation = {
      id: null,
      name: data.value.name,
      price: data.value.price * 1000,
      seatingCapacity: data.value.seatingCapacity,
      isDelete: true
    }
    this.curdService.post("transport", transport).subscribe(
      (response) => {
        this.messageService.clear();
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm thành công' })
        this.getAllTransport();
      },
      (error) => {
        console.log(error.message);
      })
  }

  submitEditTransport(data) {
    var transport: Transportation = {
      id: this.editTransport.id,
      name: data.value.name,
      price: data.value.price * 1000,
      seatingCapacity: data.value.seatingCapacity,
      isDelete: data.value.isDelete
    }
    this.curdService.put("transport", transport).subscribe(
      (response) => {
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Cập nhập thành công' });
        this.getAllTransport();
      },
      (error) => {
        console.log(error.message);
      })
  }

  checkValid(content: string, data: NgForm) {
    if (content == 'tour') {
      const adultPrice: number = +$('#adult').val()
      const childrenPrice: number = +$('#children').val()
      if (data.valid && this.mainImgUrl && $('#province').val()
        && $('#district').val() && $('#ward').val() && adultPrice >= childrenPrice && adultPrice > 0 && childrenPrice > 0) {
        return false
      } else {
        return true;
      }
    } else if (content == 'hotel') {
      const star: number = +$('#star').val()
      const price: number = +$('#price').val()
      if (data.valid && star >= 0 && price <= 5 && price > 0) {
        return false
      } else {
        return true;
      }
    } else {
      const seatingCapacity: number = +$('#seatingCapacity').val()
      const price: number = +$('#price').val()
      if (data.valid && seatingCapacity > 0 && price > 0) {
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
    var initDate: Date = new Date((<HTMLInputElement>document.getElementById('addDate')).value)
    var endDate: Date = new Date((<HTMLInputElement>document.getElementById('endDate')).value)
    if (endDate >= initDate) {
      const tourDate: TourDate = {
        id: null,
        initiateDate: initDate,
        endDate: endDate,
        tour: this.editTour,
        status: null
      }
      this.curdService.post('tour_date', tourDate).subscribe(
        (response: TourDate) => {
          this.getTourDateList(this.editTour.id)
          this.addDateStatus = false
          this.messageService.clear();
          this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm thành công' })
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    } else {
      this.messageService.clear();
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Lỗi', detail: 'Ngày xuất phát không được xảy ra sau ngày kết thúc' })
    }
  }

  cancelAddDate() {
    this.addDateStatus = false
  }

  onRowEditInit(tourDate: TourDate) {
    this.clonedProducts[tourDate.id as number] = { ...tourDate };
  }

  onRowEditSave(tourDate: TourDate, index: number) {
    tourDate.status = this.statusList.find(status => status.id == tourDate.status.id);
    this.tourDateList[index] = tourDate;
    this.curdService.put('tour_date', tourDate).subscribe(
      (response: TourDate) => {
        delete this.clonedProducts[tourDate.id]
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Cập nhập thành công' })
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onRowEditCancel(tourDate: TourDate, index: number) {
    this.tourDateList[index] = this.clonedProducts[tourDate.id]
    delete this.clonedProducts[tourDate.id];
  }

  getBooking(tourDateId: number): Booking[] {
    var list = this.bookingList.filter(booking => booking.tourDate.id === tourDateId)
    return list;
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
                  this.messageService.clear();
                  this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Bảng này đang được sử dụng tại những bảng khác không thể xóa được' });
                }
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
              }
            )
          } else {
            this.messageService.clear();
            this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Bảng này đang được sử dụng tại những bảng khác không thể xóa được' })
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    } else if (object == 'date') {
      var planList: TourPlan[]
      var bookingList: Booking[]
      this.tourPlanService.getTourPlansByDateID(id).subscribe(
        (response) => {
          planList = response;
          if (planList.length == 0) {
            this.bookingService.getBookingsByTourDate(id).subscribe(
              (response) => {
                bookingList = response
                if (bookingList.length == 0) {
                  this.confirmDelete('tour_date', id)
                } else {
                  this.messageService.clear();
                  this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Bảng này đang được sử dụng tại những bảng khác không thể xóa được' })
                }
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
              }
            )
          } else {
            this.messageService.clear();
            this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Bảng này đang được sử dụng tại những bảng khác không thể xóa được' })
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    } else if (object == 'hotel') {
      for (let tour of this.tourList) {
        if (tour.hotel.id == id) {
          this.messageService.clear();
          this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Khách Sạn Đang Được Sử Dụng Không Thể Xóa' })
          return;
        }
      }
      this.confirmDelete("hotel", id);
    } else if (object == 'transport') {
      for (let tour of this.tourList) {
        if (tour.transport.id == id) {
          this.messageService.clear();
          this.messageService.add({ key: 'error', severity: 'error', summary: 'Thông Báo', detail: 'Phương Tiện Đang Được Sử Dụng Không Thể Xóa' })
          return;
        }
      }
      this.confirmDelete("transport", id);
    }
  }

  updateActive(tour: Tour) {
    if (tour.active === true) {
      tour.active = false;
    } else {
      tour.active = true;
    }
    this.curdService.put("tour", tour).subscribe(
      (response: Tour) => {
        this.getTourList();
        this.messageService.clear();
        this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Cập nhập trạng thái thành công' })
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
}