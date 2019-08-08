import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { BlockLabelComponent } from '../block-label/block-label.component';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
    @ViewChild('blockDiv') blockDiv: ElementRef;
    @ViewChild(BlockLabelComponent) blockLabelComponent: BlockLabelComponent;

    selected = false;
    startDragMouseX = 0;
    startDragMouseY = 0;
    startDragX = 0;
    startDragY = 0;
    mouseover = false;
    x = 0;
    y = 0;

    constructor() { }

    ngOnInit() {
    }

    getName() {
        return this.blockLabelComponent.title;
    }

    mouseEnter() {
        this.mouseover = true;
    }
    mouseLeave() {
        this.mouseover = false;
    }

    getBoundingClientRect() {
        return this.blockDiv.nativeElement.getBoundingClientRect();
    }
}
