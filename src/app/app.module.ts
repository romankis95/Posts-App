/**
 * Qui importo i vari moduli nel programma
 * con la stessa logica di const moment = require("moment");
 */
import * as platformBrowser from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import { MatCardModule} from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatExpansionModule} from "@angular/material/expansion";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { HttpClientModule  } from "@angular/common/http";
 
import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    /**
     * Qui includo i vari moduli nel programma,
     * dopo averli importati nel programma
     */
    platformBrowser.BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
