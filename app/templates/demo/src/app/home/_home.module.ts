import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';<% if(!skipStyles && !skipSample){%>
import {  LibModule  } from '<%= projectName %>';<% } %>

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,<% if(!skipStyles && !skipSample){%>
        LibModule.forRoot(),<% } %>
        HomeRoutingModule,
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
