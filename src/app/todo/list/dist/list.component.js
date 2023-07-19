"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListComponent = void 0;
var core_1 = require("@angular/core");
var ListComponent = /** @class */ (function () {
    function ListComponent(todoService, router, route) {
        this.todoService = todoService;
        this.router = router;
        this.route = route;
        this.allowEdit = false;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
        });
        this.route.queryParams.subscribe(function (queryParams) {
            _this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        });
    };
    ListComponent.prototype.onEdit = function () {
        this.router.navigate([this.index, 'edit'], { queryParams: { allowEdit: '1' }, relativeTo: this.route });
    };
    ListComponent.prototype.onMoveToArchive = function () {
        if (this.allowEdit) {
            return;
        }
        this.todoService.toArchive(this.todo, this.index);
    };
    __decorate([
        core_1.Input()
    ], ListComponent.prototype, "todo");
    __decorate([
        core_1.Input()
    ], ListComponent.prototype, "index");
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        })
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
