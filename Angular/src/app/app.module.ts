import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import {ConfirmationPopoverModule} from 'angular-confirmation-popover'
import { AddTestComponent } from './_component/app.addtestcomponent'
import { ShowAllTestComponent} from './_component/app.showalltestcomponent'
import { RemoveTestComponent } from './_component/app.removetestcomponent';
import { UpdateTestComponent } from './_component/app.updatetestcomponent';
 

import {ReactiveFormsModule} from '@angular/forms';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import {FileUploadModule} from 'ng2-file-upload';
import { UserHomeComponent } from './_component/app.userhomecomponent';
import { UpdateUserComponent } from './_component/app.updateusercomponent';
import { AddQuestion } from './_component/app.addquestioncomponent';
import {CommonModule} from '@angular/common';
import { AdminHomeComponent } from './_component/app.adminhomecomponent';
import { HomeComponent } from './_component/app.homeComponent';
import { AssignTestComponent } from './_component/app.assigntestcomponent';
import { UpdateAdminComponent } from './_component/app.updateadmincomponent';
import { ListUserComponent } from './_component/app.listusercomponent';
import { GiveTestComponent } from './_component/app.givetestcomponent';
import { DeleteQuestion } from './_component/app.deletequestioncomponent';
import { UpdateQuestion } from './_component/app.updatequestion';
import { ShowQuestion } from './_component/app.showquestioncomponent';
import { LogoutComponent } from './_component/app.logoutcomponent';
import { BasicAuthHtppInterceptorService } from './_service/app.basicauthinterceptorservice';
import { GetResultComponent } from './_component/app.getresultcomponent';
import { ResultPdfComponent } from './_component/app.resultpdfcomponent';
import { Error404Component } from './_component/app.error404component';
import { Error403Component } from './_component/app.error403component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


const routes:Routes = [
    { path: '', redirectTo: 'home', pathMatch:'full'},
    { path: 'user', component: UserHomeComponent},
    { path: 'updateuser', component: UpdateUserComponent},
    { path: 'addquestion', component: AddQuestion},
    { path: 'admin', component: AdminHomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'assign', component: AssignTestComponent},
    { path: 'updateadmin', component: UpdateAdminComponent},
    { path: 'listusers', component: ListUserComponent},
    { path: 'givetest', component: GiveTestComponent },
    { path: 'deletequestion', component: DeleteQuestion},
    { path: 'showquestion', component: ShowQuestion},
    { path: 'updatequestion', component: UpdateQuestion},
    { path: 'logout', component: LogoutComponent},
    { path: 'getresult', component: GetResultComponent},
    { path: 'resultpdf', component: ResultPdfComponent},
    { path: 'addtest', component: AddTestComponent},
    { path: 'showalltests', component: ShowAllTestComponent},
    { path: 'removetest', component: RemoveTestComponent},
    { path: 'updatetest', component: UpdateTestComponent},
    { path: 'removetest', component: RemoveTestComponent},
    { path: 'error403', component: Error403Component},
    { path: '**', component: Error404Component}
    

];

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, Ng2SmartTableModule, RouterModule.forRoot(routes), FileUploadModule,NgxPaginationModule,
        ConfirmationPopoverModule.forRoot({
        confirmButtonType:'danger'})
    ],
    declarations: [
        AppComponent, UserHomeComponent, UpdateUserComponent, AddQuestion, AdminHomeComponent, HomeComponent, AssignTestComponent,UpdateAdminComponent, ListUserComponent, GiveTestComponent, ShowQuestion, DeleteQuestion, UpdateQuestion,GetResultComponent, ResultPdfComponent,LogoutComponent, AddTestComponent,ShowAllTestComponent,RemoveTestComponent,UpdateTestComponent, Error404Component, Error403Component
		], 

    providers: [{provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true}],

    bootstrap: [AppComponent]
})

export class AppModule { }