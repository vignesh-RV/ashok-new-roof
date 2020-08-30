import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';

@Component({
  selector: 'filtered-project-list',
  templateUrl: './filtered-project-list.html',
  styleUrls: ['./filtered-project-list.scss']
})
export class FilteredProjectListComponent implements OnInit {
   
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filteredProject: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  // Filtering and applying data with pagination
  @Input('allProjects')
  set allProjects(value:any){
    this.dataSource = new MatTableDataSource<any>(value || []);
    this.dataSource.paginator = this.paginator;
    this.filteredProject = this.dataSource.connect();
  }

  constructor() { }

  ngOnInit(): void {
    
  }

}
