import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

@Component({
  selector: 'app-block-label',
  templateUrl: './block-label.component.html',
  styleUrls: ['./block-label.component.css']
})
export class BlockLabelComponent implements OnInit {
    @ViewChild('inputField') inputField: ElementRef;
    @ViewChild('titleText') titleText: ElementRef;

    editing = false;
    title="default title";

    constructor() { }

    ngOnInit() {
    }


    editText() {
        this.editing = true;
        this.titleText.nativeElement.style.display = 'none';
        this.inputField.nativeElement.style.display = 'block';
        this.inputField.nativeElement.value = this.titleText.nativeElement.textContent.trim();
        this.inputField.nativeElement.focus();
        this.inputField.nativeElement.select();
    }
    finishedInput() {
        this.editing = false;
        this.titleText.nativeElement.style.display = 'block';
        this.inputField.nativeElement.style.display = 'none';

        if(this.inputField.nativeElement.value.trim() != '') {
            this.title = this.inputField.nativeElement.value;
        }
    }
}
