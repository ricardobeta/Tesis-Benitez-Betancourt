import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OwnCourrier';

  constructor(private messaging: AngularFireMessaging) {
    this.listenNotifications();
  }

  listenNotifications() {
    this.messaging.messages
    .subscribe(message => {
      console.log(message);
    });
  }
}
