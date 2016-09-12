import { HttpWrapper } from './http-wrapper';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [ HttpModule ],
  declarations: [  ],
  providers: [ HttpWrapper ],
})
export class HttpWrapperModule {}
