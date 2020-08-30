import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'new-roof-daigram';

  constructor(private common: CommonService){

  }

  enableThemeInfo(): boolean{
    let themeAvailableFor = ['/login', '/register'];
    return themeAvailableFor.includes( this.common.getCurentRoute() );
  }
}
