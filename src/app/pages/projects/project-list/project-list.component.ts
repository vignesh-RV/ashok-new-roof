import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../resources/projects.service';
import { CommonService } from 'src/app/services/common.service';
import { APP_DATA, TOASTER_TYPES, APP_MSGS } from 'src/app/constants/app.properties';
import { ProjectMainTab } from 'src/app/models/project-main-tabs';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  
  allTabs:ProjectMainTab[] = [
    {
      tabName: "All Project",
      tabId: "all-project",
      statusName: ''
    },{
      tabName: "Active Project",
      tabId: "act-project",
      statusName: 'active'
    },{
      tabName: "Completed Project",
      tabId: "comp-project",
      statusName: "completed"
    }
  ];

  allProjects:Project[] = [];

  constructor(
    private proService: ProjectService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.proService.getAllProjects().subscribe((res)=>{
      if(res && res.length){
        this.common.showToaster(TOASTER_TYPES.SUCCESS, APP_MSGS.SUCCESS.PROJECT_RETREIVED_DONE);
        
        res.forEach(project => {
          project.imgUrl = APP_DATA.GMAP_IMAGE_URL.replace("${location}", project.location);
        });
      }
      this.allProjects = res;
    }, (err)=>{
      this.common.showToaster(TOASTER_TYPES.ERROR, (err.message || APP_MSGS.ERROR.FAILED_TO_COLLECT_DATA))
    })
  }

  createNewProject(): any{
    this.common.redirectTo("projects/create");
  }
}
