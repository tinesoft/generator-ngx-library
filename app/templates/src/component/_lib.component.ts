import { Component } from '@angular/core';

@Component({
  selector: 'my-lib',
  templateUrl: './lib.component.html',
  styleUrls: ['./lib.component.scss']
})
export class LibComponent {
  description = '<%= projectDescription %>';
}
