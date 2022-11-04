var APP;
(function (APP) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.render = function () {
            return '<div>Hello World.</div>';
        };
        return Main;
    }(WUX.WComponent));
    APP.Main = Main;
})(APP || (APP = {}));
//# sourceMappingURL=app.js.map