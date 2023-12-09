import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authenticationservice.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;

  @Input() usuario: any;

  constructor(private authService: AuthenticationService, private router: Router){}

  onToggleSideNav(data: SideNavToggle): void{
    console.log(data);
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggeIn: boolean) => {

      console.log('Estado de inicio de sesión cambiado:', loggeIn);

      if (!loggeIn) {
        this.tituloIdentificador();
        this.router.navigate(['/dashboard/inicio']);
      } else {
        this.router.navigate(['/login']);        
      }
    });
  }

  tituloIdentificador(): void{
    document.title = "Menú inicial";
  }
  
}
