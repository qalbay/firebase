import { ChatService } from './../chat.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  message=new FormControl('',[Validators.required]);
  
  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.chatService.sendMessage(this.message.value);
    this.message.reset()
  }

}
