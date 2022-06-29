import { ChatService } from './chat.service';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  messagesSent: any;
  messagesReceived: any;
  isData: boolean = true;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.isData = false;
    this.chatService.getSentMessages().subscribe((res: any) => {
      this.messagesSent = res;
      this.isData = true;
      this.scrollToBottom();
    })
    this.chatService.getReceivedMessages().subscribe((res: any) => {
      this.messagesReceived = res;
      this.isData = true;
      this.scrollToBottom();
    })



    // this.isData = false;
    // forkJoin([
    //   this.chatService.getSentMessages(),
    //   this.chatService.getReceivedMessages()
    // ])
    // this.chatService.getSentMessages().subscribe((res: any) => {
    //   this.messagesSent = res;
    //   console.log("sent", this.messagesSent)
    //   console.log("Received", this.messagesReceived);
    //   [this.messagesSent, this.messagesReceived] = res;
    //   this.isData = true;
    //   this.scrollToBottom();
    // })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
