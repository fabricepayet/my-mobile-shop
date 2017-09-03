import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DiscoverProductsComponent } from './discover-products/discover-products';
import { PriceComponent } from './price/price';
import { ShopInfoComponent } from './shop-info/shop-info';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
      PriceComponent,
      DiscoverProductsComponent,
      ShopInfoComponent,
    ],
    imports: [IonicModule, PipesModule],
    exports: [
      PriceComponent,
      DiscoverProductsComponent,
      ShopInfoComponent,
    ]
})

export class ComponentsModule {

}
