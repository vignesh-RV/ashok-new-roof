import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from '../resources/projects.service';
import { forkJoin } from 'rxjs';
import { TOASTER_TYPES, APP_MSGS } from 'src/app/constants/app.properties';

declare const google: any

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectForm:any;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  mapType: string;
  private geoCoder: any;
  public orders: any;
  public card: any;
  public returnUrl: any;
  payment_status: string;

  project_type:string;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  @ViewChild('agmMap', { static: false })
  agmMap: AgmMap;

  projectTypes:any = [
    {
      label: '3D RESEDENTIAL',
      typeId: '3d-residential'
    },{
      label: '3D COMMERCIAL',
      typeId: '3d-commercial'
    },{
      label: '3D MULTI-FAMILY',
      typeId: '3d-multi-family'
    }
  ];

  constructor(
    private fb:FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private common: CommonService,
    private proService: ProjectService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadPlacesAutocomplete();
    this.setCurrentLocation();
  }

  loadPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 20;
          this.mapType = 'satellite';
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 20;
        this.mapType = 'satellite';
      });
    }
  }

  createForm(): any{
    this.projectForm = this.fb.group({
      project_name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]),

      payment: new FormGroup({
        card_number: new FormControl('', [Validators.required]),
        card_month: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.min(1), Validators.max(12)]),
        expire_year: new FormControl('', [Validators.required,  Validators.maxLength(2), Validators.min(1), Validators.max(99)]),
        card_cvv: new FormControl('', [Validators.required,  Validators.maxLength(3), Validators.min(100), Validators.max(999)])
      })
    })
  }

  getControl(controlName:string): any{
    return this.projectForm.get(controlName);
  }

  createProject(): any{
    
    if(this.projectForm.invalid) return;

    let formData = this.projectForm.getRawValue();
    formData.longitude =  this.longitude;
    formData.latitude =  this.latitude;
    formData.location = this.address;
    formData.project_type = this.project_type;
    formData.product_type = "Premium"
    formData.payment_status= "Active";
    let paymentData = {...formData.payment};
    delete formData.payment;
    
    forkJoin(
      this.proService.createProject(formData),
      this.proService.savePaymentData(paymentData)
    ).subscribe((res:any)=>{
      this.common.showToaster( TOASTER_TYPES.SUCCESS , (res.message || APP_MSGS.SUCCESS.PROJECT_CREATED_DONE));
      this.common.redirectTo("projects");
    }, (err)=>{
      this.common.showToaster( TOASTER_TYPES.ERROR , (err.error.message || APP_MSGS.ERROR.FAILED_TO_CREATE_PROJECT));
    })
  }

  markerDragEnd($event: any) {
    console.log($event);
    if(!$event.coords) return;

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log("test",results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
          this.common.showToaster(TOASTER_TYPES.ERROR, APP_MSGS.ERROR.NO_RESULTS_FOUND );
        }
      } else {
        this.common.showToaster(TOASTER_TYPES.ERROR, APP_MSGS.ERROR.GEO_FAILED_REASON + status);
      }

    });
  }

  redirectToProject(): any{
    this.common.redirectTo("projects");
  }

  updateProjectType(evt): any{
    this.project_type = evt.value;
  }
}
