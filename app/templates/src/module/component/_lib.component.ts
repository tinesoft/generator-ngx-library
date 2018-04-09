import { Component } from '@angular/core';

@Component({
  selector: '<%= ngPrefix %>-component',
  templateUrl: './lib.component.html',
  styleUrls: ['./lib.component.scss']
})
export class LibComponent {
  description = '<%= projectDescription.length>=121 ? projectDescription.substring(0,118)+"..." : projectDescription %>';
}
