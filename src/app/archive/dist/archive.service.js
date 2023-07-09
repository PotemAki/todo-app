"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArchiveService = void 0;
var core_1 = require("@angular/core");
var ArchiveService = /** @class */ (function () {
    function ArchiveService(database) {
        this.database = database;
        this.archiveTodo = [
        //new ToDo (1, 'name', 'date')
        ];
        this.timestamp = new Date();
        this.databaseFetch();
    }
    ArchiveService.prototype.getTodo = function () {
        return this.archiveTodo;
    };
    ArchiveService.prototype.addToArchive = function (todo) {
        if (!this.archiveTodo) {
            this.archiveTodo = [];
        }
        todo.done = new Date();
        this.archiveTodo.push(todo);
        this.database.sendArchive(this.archiveTodo);
    };
    ArchiveService.prototype.removeToDo = function (index) {
        this.archiveTodo.splice(index, 1);
        this.database.sendArchive(this.archiveTodo);
    };
    ArchiveService.prototype.databaseFetch = function () {
        var _this = this;
        this.database.getArchive().subscribe(function (data) {
            _this.archiveTodo = data;
        });
    };
    ArchiveService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ArchiveService);
    return ArchiveService;
}());
exports.ArchiveService = ArchiveService;
