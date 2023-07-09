"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoComponent = void 0;
var core_1 = require("@angular/core");
var TodoComponent = /** @class */ (function () {
    function TodoComponent(todoService, route) {
        this.todoService = todoService;
        this.route = route;
        this.todo = [];
        this.changeSaved = false;
        this.isIncorrect = false;
    }
    TodoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todo = this.todoService.getTodo();
        this.route.params.subscribe(function (params) {
            _this.todo = _this.todoService.getTodo();
        });
    };
    TodoComponent.prototype.ngDoCheck = function () {
        var _this = this;
        this.todo = this.todoService.getTodo();
        this.todoService.changesSaved.subscribe(function (didActivate) {
            _this.changeSaved = didActivate;
            setTimeout(function () {
                _this.changeSaved = false;
            }, 1000);
        });
    };
    TodoComponent.prototype.onAdd = function (todoNameInput, todoDateInput) {
        var _this = this;
        if (todoNameInput.value === '') {
            this.isIncorrect = true;
            clearTimeout(this.isEmptyMessage);
            this.isEmptyMessage = setTimeout(function () {
                _this.isIncorrect = false;
            }, 1000);
            return;
        }
        this.todoService.addToList(todoNameInput.value, todoDateInput.value);
        this.nameInput.nativeElement.value = '';
        this.dateInput.nativeElement.value = '';
    };
    TodoComponent.prototype.onClear = function () {
        this.nameInput.nativeElement.value = '';
        this.dateInput.nativeElement.value = '';
    };
    __decorate([
        core_1.ViewChild('todoNameInput')
    ], TodoComponent.prototype, "nameInput");
    __decorate([
        core_1.ViewChild('todoDateInput')
    ], TodoComponent.prototype, "dateInput");
    TodoComponent = __decorate([
        core_1.Component({
            selector: 'app-todo',
            templateUrl: './todo.component.html',
            styleUrls: ['./todo.component.css']
        })
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
