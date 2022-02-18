import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeccionHabilidadesComponent } from './components/seccion-habilidades/seccion-habilidades.component';

@NgModule({
  declarations: [SeccionHabilidadesComponent],
  imports: [],
  exports:[SeccionHabilidadesComponent,TranslateModule]
})
export class GraficosModule { }
