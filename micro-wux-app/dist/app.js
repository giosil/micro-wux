var APP;
(function (APP) {
    var HelloWorld = (function (_super) {
        __extends(HelloWorld, _super);
        function HelloWorld() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelloWorld.prototype.render = function () {
            return '<div>Hello World.</div>';
        };
        return HelloWorld;
    }(WUX.WComponent));
    APP.HelloWorld = HelloWorld;
})(APP || (APP = {}));
//# sourceMappingURL=app.js.map