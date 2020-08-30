import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name: "projectFilter"
})
export class ProjectFilterPipe implements PipeTransform{
    constructor(){

    }

    transform(allProjects:any[], statusName:string): any{
        //blocking all transforms for empty inputs
        if(!statusName || !allProjects || !Array.isArray(allProjects)) return (allProjects || []);
        
        let filteredProjects = allProjects.filter((project) => project.payment_status.toLowerCase() == statusName.toLowerCase());
        return filteredProjects;
    }
}