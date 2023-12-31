"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.dataBaseService = void 0;
var core_1 = require("@angular/core");
var dataBaseService = /** @class */ (function () {
    function dataBaseService(http) {
        this.http = http;
    }
    dataBaseService.prototype.sendToDo = function (todo) {
        this.http.put('https://todo-list-a1acd-default-rtdb.firebaseio.com/todo.json', todo).subscribe();
    };
    dataBaseService.prototype.getToDo = function () {
        return this.http.get('https://todo-list-a1acd-default-rtdb.firebaseio.com/todo.json');
    };
    dataBaseService.prototype.sendArchive = function (archiveToDo) {
        this.http.put('https://todo-list-a1acd-default-rtdb.firebaseio.com/archive.json', archiveToDo).subscribe();
    };
    dataBaseService.prototype.getArchive = function () {
        return this.http.get('https://todo-list-a1acd-default-rtdb.firebaseio.com/archive.json');
    };
    dataBaseService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], dataBaseService);
    return dataBaseService;
}());
exports.dataBaseService = dataBaseService;
