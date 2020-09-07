import { Component, OnInit } from '@angular/core';

import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';

@Component({
  selector: 'app-empresa-resumen',
  templateUrl: './empresa-resumen.component.html',
  styleUrls: ['./empresa-resumen.component.css']
})
export class EmpresaResumenComponent implements OnInit {


  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); }
        }]
    }
  };

  constructor(private ngWizardService: NgWizardService) {
  }

  ngOnInit() {
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
}
