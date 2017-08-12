import { NgModule } from '@angular/core';
import { PricePipe } from "./price";
import { CountdownPipe } from "./countdown";

@NgModule({
    declarations: [
      PricePipe,
      CountdownPipe
    ],
    imports: [

    ],
    exports: [
      PricePipe,
      CountdownPipe
    ]
})
export class PipesModule {}
