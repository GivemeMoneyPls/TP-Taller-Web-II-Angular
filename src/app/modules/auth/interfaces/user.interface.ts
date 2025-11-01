export interface User {
    id:          number;
    email:       string;
    contrase_a:  string; 
    nombre:      string;
    apellido:    string;
    direccion:   string;
}

export interface SignupData {
    email:       string;
    contraseña:  string;
    nombre:      string;
    apellido:    string;
    direccion:   string;
}

export interface SigninData {
    email:       string;
    contraseña:  string;
}