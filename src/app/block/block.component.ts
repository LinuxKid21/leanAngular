import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
    selected = false;
    dragging = false;
    startDragMouseX = 0;
    startDragMouseY = 0;
    startDragX = 0;
    startDragY = 0;
    mouseover = false;
    x = 0;
    y = 0;
    title="default title";

    constructor() { }

    ngOnInit() {
    }
    
    mouseEnter() {
        this.mouseover = true;
    }
    mouseLeave() {
        this.mouseover = false;
    }
}
