import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './navbar/navbar.module';
import { UserComponent } from './user/user.component';

import { environment } from '../environments/environment';
import { VoteComponent } from './vote/vote.component';


@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        VoteComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        SidebarModule,
        NavbarModule,
    ],
    providers: [
        {provide: 'API_URL', useValue: environment.apiUrl}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
