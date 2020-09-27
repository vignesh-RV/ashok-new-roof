import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { NavLink } from 'src/app/models/nav-link';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navItems:NavLink[] = [
    {
      label: "Project",
      link: "/projects"
    },{
      label: "Purchase(Pricing)",
      link: "/purchase"
    }
  ];

  loggedInUserData:any = null;

  constructor(private auth: AuthService, private common: CommonService) { }

  ngOnInit(): void {
  }

  isHavingUserInfo(): any{
    this.loggedInUserData = this.auth.getUserData();
    return !!this.loggedInUserData;
  }

  doSignOut(): any{
    this.auth.logout();
  }

  redirectToHome(): any{
    this.common.redirectTo("projects");
  }

  toggleClassOnBody(): any{
    let body = document.querySelector("html body"), className = "menu-expanded";
    if(body){
      if(body.classList.contains(className))
        body.classList.remove(className)
      else body.classList.add(className)
    }
  }
}
