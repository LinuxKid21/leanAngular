import { Injectable } from '@angular/core';

import { BlockComponent } from './block.component';

@Injectable({
    providedIn: 'root'
})
export class BlockService {
    blockNames = ['a', 'b', 'c'];
    blocks: BlockComponent[];

    constructor() { }

    setBlockArray(blocks: BlockComponent[]) {
        this.blocks = blocks;
    }

    getBlockNames() {
        return this.blocks.map(block => block.getName());
    }
}
