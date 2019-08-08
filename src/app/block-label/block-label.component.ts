import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { BlockService } from '../block/block.service';

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

    constructor(private blockService: BlockService) {
    }

    ngOnInit() {
    }


    editText() {
        this.editing = true;
        this.titleText.nativeElement.style.display = 'none';
        this.inputField.nativeElement.style.display = 'block';
        this.inputField.nativeElement.value = this.title;
        this.inputField.nativeElement.focus();
        this.inputField.nativeElement.select();
    }
    finishedInput() {
        this.editing = false;
        this.titleText.nativeElement.style.display = 'block';
        this.inputField.nativeElement.style.display = 'none';

        var newTitle = this.inputField.nativeElement.value.trim()
        if(newTitle != '') {
            if(this.blockService.getBlockNames().includes(newTitle)) {
                // TODO: dialog
            }
            else {
                this.title = this.inputField.nativeElement.value.trim();
            }
        }
    }
}
