import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ElementRef
} from '@angular/core';
import { BlockComponent } from './block/block.component';
import { BlockService } from './block/block.service';
import { SelectionBoxComponent } from './selection-box/selection-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    @ViewChild('blocktemplate', {read: ViewContainerRef}) blockContainer: ViewContainerRef;
    @ViewChild('masterDiv') masterDiv: ElementRef;
    @ViewChild(SelectionBoxComponent) selectionBox: SelectionBoxComponent;
    blocks = [];
    dragging = false;
    selectingRect = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private blockService: BlockService) {
        blockService.setBlockArray(this.blocks);
    }

    ngOnInit() {
    }

    addComponent(x, y) {
        // Create component dynamically inside the ng-template
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BlockComponent);
        const component = this.blockContainer.createComponent(componentFactory);

        this.moveSnapped(component.instance, x, y);

        this.blocks.push(component.instance);
    }

    mouseDown(event : MouseEvent) {
        var mouseX = event.pageX - this.masterDiv.nativeElement.offsetLeft;
        var mouseY = event.pageY - this.masterDiv.nativeElement.offsetTop;
        // remove focus
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        if(event.button == 0) { // left
            var overBlock = false; // check if it so to create selection box
            var overAnySelected = false; // check if it is just to drag

            for(let e of this.blocks) {
                if(e.selected && e.mouseover) {
                    overAnySelected = true;
                }
                if(e.mouseover) {
                    overBlock = true;
                }
            }

            if(!event.ctrlKey && !overAnySelected) {
                this.blocks.forEach(function(e) {
                    e.selected = false;
                });
            }

            for(let e of this.blocks) {
                if(e.mouseover) {
                    event.preventDefault();
                    if(event.ctrlKey) {
                        e.selected = !e.selected;
                    }
                    else {
                        e.selected = true;
                        this.dragging = true; // dragging if at least one block
                    }
                }
                if(e.selected) {
                    e.startDragMouseX = mouseX;
                    e.startDragMouseY = mouseY;
                    e.startDragX = e.x;
                    e.startDragY = e.y;
                }
            }

            if(!overBlock) {
                event.preventDefault();
                this.selectionBox.x = mouseX;
                this.selectionBox.y = mouseY;
                this.selectionBox.x2 = mouseX;
                this.selectionBox.y2 = mouseY;
                this.selectionBox.isHidden = false;
                this.selectingRect = true;
            }
        }
        if(event.button == 2) { // right
            this.addComponent(mouseX, mouseY);
        }
    }
    mouseMove(event : MouseEvent) {
        var mouseX = event.pageX - this.masterDiv.nativeElement.offsetLeft;
        var mouseY = event.pageY - this.masterDiv.nativeElement.offsetTop;
        if(this.dragging)
        {
            for(let e of this.blocks) {
                if(e.selected) {
                    event.preventDefault();

                    var diffX = mouseX - e.startDragMouseX;
                    var diffY = mouseY - e.startDragMouseY;
                    this.moveSnapped(e, e.startDragX + diffX, e.startDragY + diffY);
                }
            }
        }
        if(this.selectingRect) {
            event.preventDefault();
            this.selectionBox.x2 = mouseX;
            this.selectionBox.y2 = mouseY;
        }
    }
    mouseUp(event : MouseEvent) {
        if(event.button == 0) { // left
            if(this.selectingRect) {
                var selectionRect = this.selectionBox.getBoundingClientRect();
                for(let e of this.blocks) {
                    var rect = e.getBoundingClientRect();
                    if( rect.x > selectionRect.x &&
                        rect.y > selectionRect.y &&
                        rect.x + rect.width < selectionRect.x + selectionRect.width &&
                        rect.y + rect.height < selectionRect.y + selectionRect.height)
                    {
                        e.selected = true;
                    }
                }
            }

            this.moveFinished();

            // common state when releasing mouse from any operation
            this.dragging = false;
            this.selectingRect = false;
            this.selectionBox.isHidden = true;
        }
    }
    moveSnapped(block, x, y) {
        block.x = Math.round(x / 25) * 25;
        block.y = Math.round(y / 25) * 25;
    }

    moveFinished() {
        // we cannot have elements with negative positions. Shift everything
        var desiredLeft = 0;
        var desiredTop = 0;
        for(let e of this.blocks) {
            if(e.x < desiredLeft)
            {
                desiredLeft = e.x;
            }
            if(e.y < desiredTop)
            {
                desiredTop = e.y;
            }
        }
        this.masterDiv.nativeElement.style.left = -desiredLeft + 'px';
        this.masterDiv.nativeElement.style.top = -desiredTop + 'px';
    }
}
