"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoService = void 0;
var core_1 = require("@angular/core");
var list_model_1 = require("./list/list.model");
var rxjs_1 = require("rxjs");
var TodoService = /** @class */ (function () {
    function TodoService(archiveService, router, route, database) {
        this.archiveService = archiveService;
        this.router = router;
        this.route = route;
        this.database = database;
        this.changesSaved = new rxjs_1.Subject < boolean >
            isEditingOn;
        this.error = '';
        this.todo = [
        //new ToDo ('name', 'date', new Date)
        ];
        this.databaseFetch();
    }
    TodoService.prototype.getTodo = function () {
        return this.todo;
    };
    TodoService.prototype.getToEdit = function (id) {
        return this.todo[id];
    };
    TodoService.prototype.addToList = function (todoNameInput, todoDateInput) {
        if (!this.todo) {
            this.todo = [];
        }
        var date = new Date(0);
        var newTodo = new list_model_1.ToDo(todoNameInput, todoDateInput, date);
        this.todo.push(newTodo);
        this.databaseUpdate();
    };
    TodoService.prototype.onUpdateList = function (id, name, date) {
        this.todo[id].name = name;
        this.todo[id].date = date;
        this.changesSaved.next(true);
        this.databaseUpdate();
    };
    TodoService.prototype.toArchive = function (todo, index) {
        if (this.isEditingOn === true) {
            return;
        }
        this.archiveService.addToArchive(todo);
        this.todo.splice(index, 1);
        if (this.todo.length === 0) {
            this.router.navigate(['/todo'], { relativeTo: this.route });
        }
        this.databaseUpdate();
    };
    TodoService.prototype.databaseUpdate = function () {
        this.database.sendToDo(this.todo);
    };
    TodoService.prototype.databaseFetch = function () {
        var _this = this;
        this.database.getToDo().subscribe(function (data) {
            _this.todo = data;
        }, function (error) {
            _this.error = error.message;
        });
    };
    TodoService.prototype.getError = function () {
        return this.error;
    };
    TodoService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
