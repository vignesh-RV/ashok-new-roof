import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './projects-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FilteredProjectListComponent } from './project-list/filtered-project-list/filtered-project-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ProjectFilterPipe } from 'src/app/pipes/project-filter.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { APP_DATA } from 'src/app/constants/app.properties';
import { NgxMaskModule } from 'ngx-mask';
import { AppMaterialModules } from 'src/app/shared/modules/app.material.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    ViewProjectComponent,
    CreateProjectComponent,
    ProjectListComponent,
    FilteredProjectListComponent,

    ProjectFilterPipe
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    AgmCoreModule.forRoot({
      apiKey: APP_DATA.GMAP_USER_KEY,
      libraries: ["places"]
    }),
    NgxMaskModule.forRoot(),
    AppMaterialModules
  ]
})
export class ProjectsModule { }
