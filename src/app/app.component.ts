import {
    Component,
    OnInit,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    QueryList,
    ComponentFactoryResolver
} from '@angular/core';
import { BlockComponent } from './block/block.component';
import { SelectionBoxComponent } from './selection-box/selection-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    @ViewChild('blocktemplate', {read: ViewContainerRef}) blockContainer: ViewContainerRef;
    @ViewChild(SelectionBoxComponent) selectionBox: SelectionBoxComponent;
    title = 'webdev';
    blocks = [];
    dragging = false;
    selectingRect = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }
    
    addComponent(x, y) {
        // Create component dynamically inside the ng-template
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BlockComponent);
        const component = this.blockContainer.createComponent(componentFactory);
        
        component.instance.title = "new title";
        component.instance.x = x;
        component.instance.y = y;
        
        this.blocks.push(component.instance);
    }
    
    mouseDown(event : MouseEvent) {
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
                    e.selected = true;
                    this.dragging = true; // dragging if at least one block
                }
                if(e.selected) {
                    e.startDragMouseX = event.pageX;
                    e.startDragMouseY = event.pageY;
                    e.startDragX = e.x;
                    e.startDragY = e.y;
                }
            }
            
            if(!overBlock) {
                event.preventDefault();
                this.selectionBox.x = event.pageX;
                this.selectionBox.y = event.pageY;
                this.selectionBox.x2 = event.pageX;
                this.selectionBox.y2 = event.pageY;
                this.selectionBox.isHidden = false;
                this.selectingRect = true;
            }
        }
        if(event.button == 2) { // right
            this.addComponent(event.pageX, event.pageY);
        }
    }
    mouseMove(event : MouseEvent) {
        if(this.dragging)
        {
            for(let e of this.blocks) {
                if(e.selected) {
                    event.preventDefault();
                    
                    var diffX = event.pageX - e.startDragMouseX;
                    var diffY = event.pageY - e.startDragMouseY;
                    e.x = e.startDragX + diffX;
                    e.y = e.startDragY + diffY;
                }
            }
        }
        if(this.selectingRect) {
            event.preventDefault();
            this.selectionBox.x2 = event.pageX;
            this.selectionBox.y2 = event.pageY;
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
            
            this.dragging = false;
            this.selectingRect = false;
            this.selectionBox.isHidden = true;
        }
    }
}
