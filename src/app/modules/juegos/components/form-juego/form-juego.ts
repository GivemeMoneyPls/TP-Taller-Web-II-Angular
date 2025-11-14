import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { Juego, Genero, Plataforma, JuegoDTO } from '../../interfaces/juego.interface';
import { FilterService } from '../../../../api/services/filter/filter.service';
import { UploadService } from '../../../../api/services/upload/upload.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-juego',
  imports: [ReactiveFormsModule],
  templateUrl: './form-juego.html',
  styleUrl: './form-juego.css',
})
export class FormJuego {

    title: string = "Crear juego";

    icono: string = "bi bi-plus-lg";

    private fb = inject(FormBuilder);

    form!:FormGroup;

    juegoObtenido!:Juego;

    id:number | undefined;

    juegoService = inject(JuegoService);

    activatedRouter = inject(ActivatedRoute);

    generos:Genero[] = [];
    plataformas:Plataforma[] = [];

    servicioFiltro = inject(FilterService);

    servicioUpload = inject(UploadService)

    juego = input<Juego>();

    eventEmitterFormJuego = output<JuegoDTO>();

    selectedFile: File | null = null;

    previewUrl: string | ArrayBuffer | null = null;

    imagenUrlFinal: string | undefined;

    mensajeFallo: string | null = null;

    ngOnInit(){
      if (this.juego()) {
        this.title = "Actualizar juego";
        this.icono = "bi bi-pencil-square";
      }

      console.log('Juego recibido en el formulario:', this.juego());
      this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));


      this.generarCamposFormulario();
      this.form = this.fb.group(
        {
          titulo: [this.juego()?.titulo, [Validators.required]],
          descripcion: [this.juego()?.descripcion, [Validators.required]],
          precio: [this.juego()?.precio, [Validators.required]],
          generos: [this.juego()?.juego_genero?.map(g => g.genero_id) ?? [], [Validators.required]],
          plataforma_id: [this.juego()?.plataforma_id, [Validators.required]],
          fecha_lanzamiento: [this.convertirFecha(this.juego()?.fecha_lanzamiento), [Validators.required]]
        }
      );
    }

     generarCamposFormulario() {
        this.servicioFiltro.getGeneros().subscribe({
            next: (generos) => {
                this.generos = generos;
                console.log('Géneros obtenidos:', this.generos);
            },
            error: (error) => {
                console.error('Error al obtener los géneros:', error);
            }
        });

        this.servicioFiltro.getPlataformas().subscribe({
            next: (plataformas) => {
                this.plataformas = plataformas;
                console.log('Plataformas obtenidas:', this.plataformas);
            },
            error: (error) => {
                console.error('Error al obtener las plataformas:', error);
            }
        });


    }

    convertirFecha(fecha: string | Date | undefined): string | null {
      if (!fecha) return null;
  if (typeof fecha === 'string') {
    if (fecha.includes('T')) {
      return fecha.split('T')[0];
    }
    return fecha;
  }
  return fecha.toISOString().split('T')[0];
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];

    // Mostrar una vista previa
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

onGeneroChange(event: any) {
  const generoId = Number(event.target.value);
  const generosSeleccionados = this.form.get('generos')?.value ?? [];

  if (event.target.checked) {
    this.form.get('generos')?.setValue([...generosSeleccionados, generoId]);
  } else {
    this.form.get('generos')?.setValue(
      generosSeleccionados.filter((id: number) => id !== generoId)
    );
  }
}

async sendJuego() {

    if (this.selectedFile) {
       try {
      this.imagenUrlFinal = await firstValueFrom(this.servicioUpload.uploadImage(this.selectedFile));
      console.log('Imagen subida correctamente:', this.imagenUrlFinal);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return;
    }
  }

    if (!this.juego() && !this.imagenUrlFinal) {
      this.mensajeFallo = "La imagen es obligatoria al crear un nuevo juego.";
      setTimeout(() => this.mensajeFallo = null, 3000);
        return;
      }

      const juegoAEnviar: JuegoDTO = {
      id: this.id,
      titulo: this.form.get('titulo')?.value.trim(),
      descripcion: this.form.get('descripcion')?.value,
      precio: this.form.get('precio')?.value,
      imagen_url: this.imagenUrlFinal,
      generos: this.form.get('generos')?.value,
      plataforma_id: Number(this.form.get('plataforma_id')?.value),
      fecha_lanzamiento: new Date(this.form.get('fecha_lanzamiento')?.value)
    };
    console.log('Juego a enviar desde el formulario:', juegoAEnviar);

    this.eventEmitterFormJuego.emit(juegoAEnviar);

}
}
