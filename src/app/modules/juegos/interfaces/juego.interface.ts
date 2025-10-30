export interface Juego {
    id:                number;
    titulo:            string;
    fecha_lanzamiento: Date;
    precio:            string;
    descripcion:       string;
    imagen_url:        string;
    plataforma_id:     number;
    plataforma:        Plataforma;
    juego_genero:      JuegoGenero[];
}

export interface JuegoGenero {
    juego_id:  number;
    genero_id: number;
    genero:    Genero;
}

export interface Genero {
    id:     number;
    nombre: string;
}

export interface Plataforma {
    id:     number;
    nombre: string;
}

