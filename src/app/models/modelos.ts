export interface Alumno {
  id?: number;
  nombre?: string

}

export interface Usuarios {
  id?: number
  user?: string
  password?: string
  rol?: string
}

export interface Asistencia {
  id?: number
  fecha?: Date
  asistencia?: CharacterData
  idAlumno?: number
  idHorario?: number
  idDocente?: number
  idjustificacion?: number
  justificado?: number
  idLista?: number
}

export interface Justificacion{
  idJustificacion?: number
  idDirectivo?: number
  descripcion?: string
}

export interface Lista_Asistencia{
  idLista?: number
  idMateria?: number
  idDocente?: number
  idGrupo?: number
  idPeriodo?: number
  fechaInicio?: Date
  fechaFin?: Date
  idHorario?: number
}