import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatFormComponent } from './chat-form/chat-form.component';


@NgModule({
  declarations: [
    ChatFormComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    // ChatFormComponent
  ],
  // exports:[
  //   ChatFormComponent
  // ]
})
export class ChatModule { }
