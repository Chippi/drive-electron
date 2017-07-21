import { Component, OnInit } from '@angular/core';

declare global {
  interface Window { gapi: any; }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';

  // Client ID and API key from the Developer Console
  CLIENT_ID = '990847949539-fle8nlht6pkuia0ee4c8uo12auqm3bag.apps.googleusercontent.com';

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

  ngOnInit() {
    window.gapi.load('client:auth2', () => {
      this.initClient();
    });
  }

  initClient() {
    window.gapi.client.init({
      clientId: this.CLIENT_ID,
      discoveryDocs: this.DISCOVERY_DOCS,
      scope: this.SCOPES
    }).then(() => {
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state.
      this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  updateSigninStatus(isSignedIn) {

    if(isSignedIn) {
      window.gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': 'nextPageToken, files(id, name)'
      }).then((response) => {
        const files = response.result.files;
        console.log(files);
      });
    }

  }

  loginGoogle() {
    console.log('signin');
    window.gapi.auth2.getAuthInstance().signIn();
  }

  logoutGoogle() {
    console.log('signout');
    window.gapi.auth2.getAuthInstance().signOut();
  }
}
