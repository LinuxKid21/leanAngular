import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background-grid',
  templateUrl: './background-grid.component.html',
  styleUrls: ['./background-grid.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class BackgroundGridComponent implements OnInit {
    columns = [];
    rows = [];
    squareSize = 100;

    constructor() {
        this.setSize(1920, 1080);
    }

    ngOnInit() {
    }
    
    onResize(event) {
        let width = event.target.innerWidth;
        let height = event.target.innerHeight;
        
        this.setSize(width, height);
    }
    
    setSize(width, height) {
        var columns = []
        for(var i = 0; i*this.squareSize < width; i++) {
            columns.push(String(i*this.squareSize) + 'px');
        }
        this.columns = columns;
        
        
        var rows = []
        for(var i = 0; i*this.squareSize < height; i++) {
            rows.push(String(i*this.squareSize) + 'px');
        }
        this.rows = rows;
    }
}
