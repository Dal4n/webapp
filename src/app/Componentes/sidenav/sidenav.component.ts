import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms', 
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms', 
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [        
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])      
    ])
  ]
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();  
  collapsed = false;
  screenWidth = 0;
  navData: any[] = [];
  usuario: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(private router: Router){}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.getStorage();
    //let rol = this.usuario.user.rol.nombre;
    let rol = "Directivo";


    this.navData = navbarData.filter(item => {
      return !item.permisos || item.permisos.includes(rol);           
    });

  }

  getStorage(): any {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      this.usuario = JSON.parse(storedData);
    }
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(): void{    
    this.collapsed = false;  
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  cerrarSesion(): void{
    this.router.navigate(['/login']);
    localStorage.clear();
  }

}
