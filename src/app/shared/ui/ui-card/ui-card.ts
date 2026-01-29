import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  template: `
    <div class="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100">
      <div class="px-4 py-5 sm:p-6">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class UiCardComponent {}