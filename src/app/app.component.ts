import { Component, inject } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { GLOBAL_RX_STATE, GlobalState } from './states';
import { PeriodicService } from './services/periodic.service';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'atipera-test';

  private state = inject<RxState<GlobalState>>(GLOBAL_RX_STATE);
  private periodicService = inject(PeriodicService);

  constructor() {
    this.state.connect('elements', this.periodicService.getPeriodicElements());
  }

}
