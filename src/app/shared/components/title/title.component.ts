import {Component, input} from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Component({
    selector: 'app-title',
    imports: [TitleCasePipe],
    templateUrl: './title.component.html',
    styleUrl: './title.component.css'
})
export class TitleComponent {
  public title = input.required<string>()
}
