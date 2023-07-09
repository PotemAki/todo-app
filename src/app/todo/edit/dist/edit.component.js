"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditComponent = void 0;
var core_1 = require("@angular/core");
var EditComponent = /** @class */ (function () {
    function EditComponent(todoService, router, route) {
        this.todoService = todoService;
        this.router = router;
        this.route = route;
        this.id = 0;
        this.todoName = '';
        this.todoDate = '';
        this.allowEdit = false;
        this.changesSaved = false;
        this.isEmpty = false;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.todo = _this.todoService.getToEdit(_this.id);
            _this.todoName = _this.todo.name;
            _this.todoDate = _this.todo.date;
        });
        this.route.queryParams.subscribe(function (queryParams) {
            _this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        });
    };
    EditComponent.prototype.onUpdateButton = function () {
        var _this = this;
        if (this.todoName === '') {
            this.isEmpty = true;
            clearTimeout(this.isEmptyMessage);
            this.isEmptyMessage = setTimeout(function () {
                _this.isEmpty = false;
            }, 1000);
            return;
        }
        this.todoService.onUpdateList(this.id, this.todoName, this.todoDate);
        this.changesSaved = true;
        this.router.navigate(['/todo'], { relativeTo: this.route });
    };
    EditComponent.prototype.onCancelButton = function () {
        this.router.navigate(['/todo'], { relativeTo: this.route });
    };
    EditComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
        if ((this.todoName !== this.todo.name || this.todoDate !== this.todo.date) && !this.changesSaved) {
            return confirm('Discard the changes?');
        }
        else {
            return true;
        }
    };
    EditComponent = __decorate([
        core_1.Component({
            selector: 'app-edit',
            templateUrl: './edit.component.html',
            styleUrls: ['./edit.component.css']
        })
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
