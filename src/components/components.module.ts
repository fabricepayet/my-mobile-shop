import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ShopFormComponent } from './shop-form/shop-form';
import { DiscoverProductsComponent } from './discover-products/discover-products';
import { PriceComponent } from './price/price';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
      ShopFormComponent,
      PriceComponent,
      DiscoverProductsComponent,
    ],
    imports: [IonicModule, PipesModule],
    exports: [
      ShopFormComponent,
      PriceComponent,
      DiscoverProductsComponent,
    ]
})

export class ComponentsModule {

}
