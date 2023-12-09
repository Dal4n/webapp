export const navbarData = [

  {
    routerlink: 'inicio',
    icon: 'fa-solid fa-home',
    label: 'Inicio'
  },
  {
    routerlink: 'grupo',
    icon: 'fa-solid fa-people-group',
    label: 'Grupos',
    permisos: ["Escolares"]
  },
  {
    routerlink: 'reportes',
    icon: 'fa-solid fa-file-signature',
    label: 'Reportes',
    permisos: ["Escolares"]
  },
  {
    routerlink: 'asistencias',
    icon: 'fa-solid fa-list',
    label: 'Asistencias',
    permisos: ["Docente","Alumno","Directivo"]
  },
  {
    routerlink: 'listaAsistencias',
    icon: 'fa-solid fa-list',
    label: 'Lista de Asistencias',
    permisos: ["Docente"]
  },
  
  {
    routerlink: 'justificacion',
    icon: 'fas fa-check-circle',
    label: 'Justificación'
  },
];