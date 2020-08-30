import { Injectable } from '@angular/core';
import { BaseAPIService } from 'src/app/services/base-api-service';
import { environment } from 'src/environments/environment';
import { APIUrls } from 'src/app/constants/URL-end-points';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ProjectService{

    constructor(private api: BaseAPIService){

    }

    /**
     * Collecting all projects
     */
    getAllProjects(): Observable<any>{
        return (this.api.get({
            url: APIUrls.GET_ALL_PROJECTS
        }));
    }

    /**
     * Creating new project
     * @param projectData 
     */
    createProject(projectData:any): Observable<any>{
        return (this.api.post({
            url: APIUrls.CREATE_NEW_PROJECT,
            parameters: projectData
        }));
    }

    /**
     * Persisting users card details
     * @param payment 
     */
    savePaymentData(payment:any): Observable<any>{
        return (this.api.post({
            url: APIUrls.SAVE_CARD_DETAILS,
            parameters: payment
        }));
    }

    /**
     * Retrieving required project data by passing its ID
     * @param id 
     */
    getProjectData(id:any): Observable<any>{
        return (this.api.get({
            url: APIUrls.GET_PROJECT_DATA.replace("{:id}", id)
        }));
    }
}