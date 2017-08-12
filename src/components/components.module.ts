import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ShopFormComponent } from './shop-form/shop-form';
import { PriceComponent } from './price/price';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
      ShopFormComponent,
      PriceComponent
    ],
    imports: [IonicModule, PipesModule],
    exports: [
      ShopFormComponent,
      PriceComponent
    ]
})

export class ComponentsModule {

}
