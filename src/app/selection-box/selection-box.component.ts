import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'app-selection-box',
    templateUrl: './selection-box.component.html',
    styleUrls: ['./selection-box.component.css']
})
export class SelectionBoxComponent implements OnInit {
    @ViewChild('selectionDiv') selectionDiv: ElementRef;
    
    x = 0;
    y = 0;
    x2 = 0;
    y2 = 0;
    isHidden = true;
    constructor() { }

    ngOnInit() {
    }
    
    getBoundingClientRect() {
        return this.selectionDiv.nativeElement.getBoundingClientRect();
    }
}
