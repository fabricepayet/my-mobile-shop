import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DiscoverProductsComponent } from './discover-products/discover-products';
import { PriceComponent } from './price/price';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
      PriceComponent,
      DiscoverProductsComponent,
    ],
    imports: [IonicModule, PipesModule],
    exports: [
      PriceComponent,
      DiscoverProductsComponent,
    ]
})

export class ComponentsModule {

}
