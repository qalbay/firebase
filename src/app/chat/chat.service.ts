import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  userId!: number;
  // chatMessages: any;
  // chatMessage!: ChatMessage;
  // userName!: Observable<string>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.userId = +localStorage.getItem('userId')!;
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    })
  }

  sendMessage(msg: string) {
    // const timestamp = this.getTimestamp();
    const mesgDetails = {
      timestamp: new Date().getTime(),
      message: msg,
      userId: this.userId
    }
    return of(this.afs.doc(`messages/${mesgDetails.timestamp}`).set(mesgDetails))
  }

  getAllMessages() {
    return this.afs.collection('messages').valueChanges();
  }

  getSentMessages() {
    return this.afs.collection('messages', (ref) => {
      return ref.where('userId', '==', this.userId)
    }).valueChanges()
  }

  getReceivedMessages() {
    return this.afs.collection('messages', (ref) => {
      return ref.where('userId', '!=', this.userId)
    }).valueChanges()
  }


  getTimestamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + '/' + now.getUTCMinutes() + '/' + now.getUTCSeconds();
    return (date + ' ' + time)
  }

}
