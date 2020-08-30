import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../resources/projects.service';
import { CommonService } from 'src/app/services/common.service';
import { TOASTER_TYPES, APP_MSGS } from 'src/app/constants/app.properties';
import { AgmMap } from '@agm/core';
import { ProjectOrder } from 'src/app/models/project-order';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  
  orderDataSource:ProjectOrder[] = [
    {
      projectType: 'Residencial',
      price: '$10.85',
      quantity: 2,
      total: '$10.85'
    },
    {
      projectType: 'Residencial',
      price: '$10.85',
      quantity: 2,
      total: '$10.85'
    },
    {
      projectType: 'Residencial',
      price: '$10.85',
      quantity: 2,
      total: '$10.85'
    },
    {
      projectType: 'Residencial',
      price: '$10.85',
      quantity: 2,
      total: '$10.85'
    },{
      projectType: 'Residencial',
      price: '$10.85',
      quantity: 2,
      total: '$10.85'
    }
  ];
  columns:string[] =  Object.keys(this.orderDataSource[0]);

  public latitude: number;
  public longitude: number;
  public zoom: number;

  selectedProjectId:number;
  projectData:any = {};

  @ViewChild('agmMap', { static: false })
  agmMap: AgmMap;

  constructor(private currentRoute:ActivatedRoute,
    private proService:ProjectService,
    private common: CommonService) {
    this.columns = Object.keys(this.orderDataSource[0]);

    //listening project id changes in URL
    currentRoute.params.subscribe((params)=>{
      this.selectedProjectId = params.id;
      this.getProjectData();
    })
  }

  ngOnInit(): void {
  }

  getProjectData(): any{
    this.proService.getProjectData(this.selectedProjectId).subscribe((res)=>{
      this.projectData = res;
      this.latitude = res.latitude;
      this.longitude = res.longitude;
    }, (err)=>{
      this.common.showToaster( TOASTER_TYPES.ERROR, (err.error.message || APP_MSGS.ERROR.FAILED_TO_COLLECT_DATA) )
    })
  }
}
