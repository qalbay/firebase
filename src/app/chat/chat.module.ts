import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { FeedComponent } from './feed/feed.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [
    ChatFormComponent,
    FeedComponent,
    ChatRoomComponent,
    MessageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
  ],
  // exports:[
  //   ChatFormComponent
  // ]
})
export class ChatModule { }
