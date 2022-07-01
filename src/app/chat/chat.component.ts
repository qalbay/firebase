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

  allMessages: any;
  isData: boolean = true;
  userId = localStorage.getItem('userId')

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.isData = false;
    this.chatService.getAllMessages().subscribe((res: any) => {
      this.allMessages = res.map((msg: any) => {
        msg.time = this.getTime(msg.timestamp)
        return msg
      });
      this.isData = true;
      this.scrollToBottom();
    })
  }

  getTime(timestamp: any) {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

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
