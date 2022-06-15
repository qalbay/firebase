import { ChatService } from './chat.service';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  messages: any;
  isData: boolean = true;
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getAllEmployees();

  }

  getAllEmployees() {
    this.isData = false;
    this.messages = []
    this.chatService.getMessages()
      .subscribe((res: any) => {
        console.log(res)
        this.messages = res;
        this.isData = true;
        this.scrollToBottom();

      })
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
