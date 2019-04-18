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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    @ViewChild('blocktemplate', {read: ViewContainerRef}) blockContainer: ViewContainerRef;
    title = 'webdev';
    blocks = [];
    dragging = false;

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
            
            // check if it is just to drag
            var deselect = true;
            for(var i = 0; i < this.blocks.length; i++) {
                var e = this.blocks[i];
                if(e.mouseover && e.selected) {
                    deselect = false;
                }
            }
            
            if(!event.shiftKey && deselect) {
                this.blocks.forEach(function(e) {
                    e.selected = false;
                });
            }
            
            for(var i = 0; i < this.blocks.length; i++) {
                var e = this.blocks[i];
                if(e.mouseover) {
                    event.preventDefault();
                    e.selected = true;
                    this.dragging = true; // dragging if at least one block
                }
                if(e.selected) {
                    e.startDragMouseX = event.clientX;
                    e.startDragMouseY = event.clientY;
                    e.startDragX = e.x;
                    e.startDragY = e.y;
                }
            }
        }
        if(event.button == 2) { // right
            this.addComponent(event.clientX, event.clientY);
        }
    }
    mouseMove(event : MouseEvent) {
        if(this.dragging)
        {
            this.blocks.forEach(function(e) {
                if(e.selected) {
                    e.dragging = true; // dragging if at least one block
                    event.preventDefault();
                    
                    var diffX = event.clientX - e.startDragMouseX;
                    var diffY = event.clientY - e.startDragMouseY;
                    e.x = e.startDragX + diffX;
                    e.y = e.startDragY + diffY;
                }
            });
        }
    }
    mouseUp(event : MouseEvent) {
        if(event.button == 0) { // left
            this.dragging = false;
            this.blocks.forEach(function(e) {
                if(e.selected) {
                    e.dragging = false;
                }
            });
        }
    }
}
