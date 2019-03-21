import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@NgModule({
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatExpansionModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatListModule
    ]
})

export class MaterialModule {
}
