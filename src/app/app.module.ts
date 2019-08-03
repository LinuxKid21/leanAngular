import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BackgroundGridComponent } from './background-grid/background-grid.component';
import { BlockComponent } from './block/block.component';
import { SelectionBoxComponent } from './selection-box/selection-box.component';
import { BlockLabelComponent } from './block-label/block-label.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundGridComponent,
    BlockComponent,
    SelectionBoxComponent,
    BlockLabelComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BlockComponent]
})
export class AppModule { }
