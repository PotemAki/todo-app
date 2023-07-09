"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var todo_component_1 = require("./todo/todo.component");
var archive_component_1 = require("./archive/archive.component");
var header_component_1 = require("./header/header.component");
var list_component_1 = require("./todo/list/list.component");
var router_1 = require("@angular/router");
var edit_component_1 = require("./todo/edit/edit.component");
var forms_1 = require("@angular/forms");
var archive_list_component_1 = require("./archive/archive-list/archive-list.component");
var can_deactivate_guard_service_1 = require("./todo/edit/can-deactivate.guard.service");
var error_page_component_1 = require("./error-page/error-page.component");
var http_1 = require("@angular/common/http");
;
var appRoutes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: todo_component_1.TodoComponent, children: [
            { path: ':id', component: todo_component_1.TodoComponent },
            { path: ':id/edit', component: edit_component_1.EditComponent, canDeactivate: [can_deactivate_guard_service_1.CanDeactivateGuard] }
        ] },
    { path: 'archive', component: archive_component_1.ArchiveComponent },
    { path: 'not-found', component: error_page_component_1.ErrorPageComponent },
    { path: '**', redirectTo: 'not-found' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                todo_component_1.TodoComponent,
                archive_component_1.ArchiveComponent,
                header_component_1.HeaderComponent,
                list_component_1.ListComponent,
                edit_component_1.EditComponent,
                archive_list_component_1.ArchiveListComponent,
                error_page_component_1.ErrorPageComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(appRoutes, { useHash: true })
            ],
            providers: [can_deactivate_guard_service_1.CanDeactivateGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
