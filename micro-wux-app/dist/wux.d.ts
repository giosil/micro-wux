declare let wuxRegistry: {
    [id: string]: WUX.WComponent;
};
declare function wuxRegister(node: WUX.WNode, c?: WUX.WComponent | 'delete'): WUX.WComponent;
declare class WuxDOM {
    private static onRenderHandlers;
    static onRender(handler: (e: WUX.WEvent) => any): void;
    private static onUnmountHandlers;
    static onUnmount(handler: (e: WUX.WEvent) => any): void;
    private static lastCtx;
    static render(component: WUX.WElement, node?: WUX.WNode, before?: (n?: WUX.WNode) => any, after?: (n?: WUX.WNode) => any): void;
    static mount(e: WUX.WElement, node?: WUX.WNode): Element;
    static unmount(node?: WUX.WNode): Element;
    static replace(o: WUX.WElement, e?: WUX.WElement): Element;
}
declare namespace WUX {
    type WElement = string | Element | WComponent;
    type WNode = string | Element;
    let debug: boolean;
    let registry: string[];
    const version = "1.0.0";
    interface WGlobal {
        locale: string;
        init(callback: () => any): void;
        setData(key: string, data: any, dontTrigger?: boolean): void;
        getData(key: string, def?: any): any;
        onDataChanged(key: string, callback: (data: any) => any): void;
    }
    interface WEvent {
        component: WComponent;
        element: Element;
        target: any;
        type: string;
        data?: any;
    }
    interface WWrapper {
        id?: string;
        type?: string;
        classStyle?: string;
        style?: string | WStyle;
        attributes?: string;
        begin?: string;
        wrapper?: WWrapper;
        end?: string;
        title?: string;
        element?: Element;
    }
    interface WField {
        id: string;
        label?: string;
        classStyle?: string;
        style?: string | WStyle;
        attributes?: string;
        span?: number;
        value?: any;
        type?: string;
        element?: Element;
        labelComp?: WComponent;
        component?: WComponent;
        required?: boolean;
        readonly?: boolean;
        enabled?: boolean;
        visible?: boolean;
    }
    interface WEntity {
        id: any;
        text?: string;
        code?: string;
        group?: any;
        type?: any;
        reference?: any;
        enabled?: boolean;
        marked?: boolean;
        date?: Date;
        notBefore?: Date;
        expires?: Date;
        icon?: string;
        color?: string;
        value?: number;
    }
    interface WISelectable extends WComponent {
        options: Array<string | WEntity>;
        select(i: number): this;
    }
    class WComponent<P = any, S = any> {
        id: string;
        name: string;
        mounted: boolean;
        parent: WComponent;
        debug: boolean;
        forceOnChange: boolean;
        data: any;
        cuid: number;
        rootTag: string;
        protected context: Element;
        protected root: Element;
        protected internal: WComponent;
        protected props: P;
        protected state: S;
        protected subSeq: number;
        protected dontTrigger: boolean;
        protected _visible: boolean;
        protected _enabled: boolean;
        protected _style: string;
        protected _baseStyle: string;
        protected _classStyle: string;
        protected _baseClass: string;
        protected _attributes: string;
        protected _tooltip: string;
        protected handlers: {
            [event: string]: ((e?: any) => any)[];
        };
        constructor(he?: Element);
        constructor(id?: string, name?: string, props?: P, classStyle?: string, style?: string | WStyle, attributes?: string | object);
        get visible(): boolean;
        set visible(b: boolean);
        get enabled(): boolean;
        set enabled(b: boolean);
        get style(): string;
        set style(s: string);
        get classStyle(): string;
        set classStyle(s: string);
        get attributes(): string;
        set attributes(s: string);
        get tooltip(): string;
        set tooltip(s: string);
        css(...items: (string | WStyle)[]): this;
        focus(): this;
        blur(): this;
        forceUpdate(callback?: () => any): this;
        getContext(): Element;
        getRoot(): Element;
        getState(): S;
        setState(nextState: S, force?: boolean, callback?: () => any): this;
        getProps(): P;
        setProps(nextProps: P, force?: boolean, callback?: () => any): this;
        on(events: 'mount' | 'unmount' | 'statechange' | 'propschange', handler: (e: WEvent) => any): this;
        on(events: 'click' | 'dblclick' | 'mouseenter' | 'mouseleave' | 'keypress' | 'keydown' | 'keyup' | 'submit' | 'change' | 'focus' | 'blur' | 'resize', handler: (e: Event) => any): this;
        on(events: string, handler: (e: any) => any): this;
        off(events?: 'mount' | 'unmount' | 'statechange' | 'propschange'): this;
        off(events?: 'click' | 'dblclick' | 'mouseenter' | 'mouseleave' | 'keypress' | 'keydown' | 'keyup' | 'submit' | 'change' | 'focus' | 'blur' | 'resize'): this;
        off(events?: string): this;
        trigger(eventType: 'mount' | 'unmount', data?: any): this;
        trigger(eventType: 'statechange', nextState?: S): this;
        trigger(eventType: 'propschange', nextProps?: P): this;
        trigger(eventType: 'click' | 'dblclick' | 'mouseenter' | 'mouseleave' | 'keypress' | 'keydown' | 'keyup' | 'blur' | 'submit' | 'change' | 'focus' | 'resize', ...extraParameters: any[]): this;
        trigger(eventType: string, ...extParams: any[]): this;
        unmount(): this;
        mount(context?: Element): this;
        componentWillUnmount(): void;
        protected componentWillMount(): void;
        protected render(): any;
        protected componentDidMount(): void;
        protected componentDidCatch?(error: Error, errorInfo: string): void;
        protected shouldComponentUpdate(nextProps: P, nextState: S): boolean;
        protected componentWillUpdate(nextProps: P, nextState: S): void;
        protected componentDidUpdate(prevProps: P, prevState: S): void;
        protected updateProps(nextProps: P): void;
        protected updateState(nextState: S): void;
        protected update(nextProps: P, nextState: S, propsChange: boolean, stateChange: boolean, force?: boolean, callback?: () => any): boolean;
        protected createEvent(type: string, data?: any): WEvent;
        protected shouldBuildRoot(): boolean;
        protected buildRoot(tagName?: string, inner?: string, baseAttribs?: string | object, classStyle?: string, style?: string, attributes?: string | object, id?: string): string;
        protected build(tagName?: string, inner?: string, baseAttribs?: string | object, classStyle?: string, style?: string, attributes?: string | object, id?: string): string;
        protected make(): string;
        subId(wc?: WComponent): string;
        subId(id?: string, s?: any): string;
        ripId(sid: string): string;
        transferTo(dest: WComponent, force?: boolean, callback?: () => any): boolean;
    }
    function getId(e: any): string;
    function firstSub(e: any, r?: boolean): string;
    function lastSub(e: any): string;
    function getComponent(id: string): WUX.WComponent;
    function getRootComponent(c: WUX.WComponent): WUX.WComponent;
    function setProps(id: string, p: any): WUX.WComponent;
    function getProps(id: string, d?: any): any;
    function setState(id: string, s: any): WUX.WComponent;
    function getState(id: string, d?: any): any;
    function newInstance(n: string): WUX.WComponent;
    function same(e1: WElement, e2: WElement): boolean;
    function divide(s: string): [string, string, string];
    function str(a: any): string;
    function getTagName(c: any): string;
    interface WStyle {
        b?: string;
        bc?: 'separate' | 'collapse' | 'initial' | 'inherit' | 'unset';
        bsp?: string | number;
        br?: string | number;
        bs?: string;
        bz?: 'content-box' | 'border-box';
        m?: string | number;
        mt?: string | number;
        mr?: string | number;
        mb?: string | number;
        ml?: string | number;
        p?: string | number;
        pt?: string | number;
        pr?: string | number;
        pb?: string | number;
        pl?: string | number;
        a?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
        v?: string;
        d?: 'inline' | 'block' | 'flex' | 'inline-block' | 'inline-flex' | 'inline-table' | 'list-item' | 'run-in' | 'table' | 'table-caption' | 'table-column-group' | 'table-header-group' | 'table-footer-group' | 'table-row-group' | 'table-cell' | 'table-column' | 'table-row' | 'none' | 'initial' | 'inherit';
        z?: string | number;
        c?: string;
        bg?: string;
        bgi?: string;
        bgr?: 'repeat' | 'space' | 'round' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'initial' | 'inherit' | 'unset';
        bgp?: string;
        cr?: string;
        cn?: string;
        f?: string | number;
        fs?: 'normal' | 'italic' | 'oblique' | 'inherit';
        fw?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'inherit';
        tt?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'initial' | 'inherit';
        tr?: string;
        fl?: 'left' | 'right' | 'none' | 'initial' | 'inherit';
        cl?: 'left' | 'right' | 'both' | 'none' | 'initial' | 'inherit';
        o?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
        ox?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
        oy?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
        op?: number;
        ol?: number;
        text?: string;
        k?: string;
        lh?: string;
        ps?: 'absolute' | 'fixed' | 'inherit' | 'initial' | 'relative' | 'static' | 'sticky' | 'unset';
        l?: string | number;
        r?: string | number;
        t?: string | number;
        bt?: string | number;
        w?: string | number;
        h?: string | number;
        minw?: string | number;
        maxw?: string | number;
        minh?: string | number;
        maxh?: string | number;
        ws?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'initial' | 'inherit';
        s?: string;
        n?: string;
    }
    function style(ws: string | WStyle): string;
    function addStyle(s: string, k: string, v: string, n?: boolean): string;
    function css(...a: (string | WStyle)[]): string;
    function cls(...a: (string | WStyle)[]): string;
    function attributes(a: any): string;
    function buildCss(...a: (string | WStyle)[]): string;
    function addClass(css: string, name: string): string;
    function removeClass(css: string, name: string): string;
    function toggleClass(css: string, name: string): string;
    function addClassOf(e: Element, name: string): void;
    function removeClassOf(e: Element, name: string): void;
    function toggleClassOf(e: Element, name: string): void;
    function setCss(e: WComponent | Element, ...a: (string | WStyle)[]): WComponent | Element;
    function buildIcon(icon: string, before?: string, after?: string, size?: number, cls?: string, title?: string): string;
    function build(tagName: string, inner?: string, css?: string | WStyle, attributes?: string | object, id?: string, classStyle?: string): string;
    class WUtil {
        static toArray(a: any): any[];
        static toArrayNumber(a: any, nz?: boolean): number[];
        static toArrayString(a: any, ne?: boolean): string[];
        static splitNumbers(a: any, s: string): number[];
        static toObject<T>(a: any, d?: T): T;
        static toString(a: any, d?: string): string;
        static toText(a: any, d?: string): string;
        static toNumber(a: any, d?: number): number;
        static toInt(a: any, d?: number): number;
        static toIntTime(a: any, d?: number): number;
        static isNumeric(a: any): a is string | number;
        static checkEmail(e: any): string;
        static starts(a: any, s: string): boolean;
        static ends(a: any, s: string): boolean;
        static isEmpty(a: any): boolean;
        static toBoolean(a: any, d?: boolean): boolean;
        static toDate(a: any, d?: Date): Date;
        static getWeek(a?: any): number;
        static getParam(name: string, url?: string): string;
        static size(a: any): number;
        static setValue(a: any, k: string, v: any): any;
        static getValue(a: any, k: string, d?: any): any;
        static getItem(a: any, i: number, d?: any): any;
        static getFirst(a: any, d?: any): any;
        static getLast(a: any, d?: any): any;
        static getNumber(a: any, k: string, d?: number): number;
        static getInt(a: any, k: string, d?: number): number;
        static getString(a: any, k: string, d?: string, f?: string): string;
        static getText(a: any, k: string, d?: string): string;
        static getBoolean(a: any, k: string, d?: boolean): boolean;
        static getDate(a: any, k: string, d?: Date): Date;
        static getArray(a: any, k: string): any[];
        static getArrayNumber(a: any, k: string, nz?: boolean): number[];
        static getArrayString(a: any, k: string, ne?: boolean): string[];
        static getObject<T>(a: any, k: string, n?: boolean): T;
        static sort(a: any, t?: boolean, k?: string): any[];
        static find(a: any, k: any, v: any): any;
        static indexOf(a: any, k: any, v: any): number;
        static isSameDate(a: Date, b: Date): boolean;
        static indexOfDate(a: Date[], v: Date): number;
        static round2(a: any): number;
        static floor2(a: any): number;
        static ceil2(a: any): number;
        static compare2(a: any, b: any): number;
        static compare5(a: any, b: any): number;
        static getCurrDate(d?: number, m?: number, y?: number, f?: boolean, l?: boolean): Date;
        static calcDate(r: Date, d?: number, m?: number, y?: number, f?: boolean, l?: boolean): Date;
        static timestamp(dt?: any): string;
        static nvl(...v: any[]): any;
        static eqValues(o1: object, o2: object, ...keys: any[]): boolean;
        static col(tuples: any[], i: number, d?: any): any[];
        static getSortedKeys(map: object): any[];
        static diffMinutes(ah: any, al: any): number;
        static diffHours(ah: any, al: any): number;
        static diffDays(ah: any, al: any): number;
    }
}
declare namespace WUX {
    let global: WGlobal;
    class CSS {
        static readonly FORM = "padding-top:16px;";
        static readonly FORM_GROUP = "form-group";
        static readonly FORM_CTRL = "form-control";
    }
    function formatDate(a: any, withDay?: boolean, e?: boolean): string;
    function isoDate(a: any): string;
    function formatDateTime(a: any, withSec?: boolean, withDay?: boolean, e?: boolean): string;
    function formatTime(a: any, withSec?: boolean): string;
    function formatNum2(a: any, nz?: string, z?: string, neg?: string): string;
    function formatNum(a: any, nz?: string, z?: string, neg?: string): string;
    function formatCurr(a: any, nz?: string, z?: string, neg?: string): string;
    function formatCurr5(a: any, nz?: string, z?: string, neg?: string): string;
    function formatBoolean(a: any): string;
    function format(a: any): string;
    function formatDay(d: number, e?: boolean): string;
    function formatMonth(m: number, e?: boolean, y?: any): string;
}
declare namespace WUX {
    class WHTML extends WComponent<string, any> {
        isText: boolean;
        constructor(props: string);
        protected render(): string;
        protected componentDidMount(): void;
    }
    class WContainer extends WComponent<string, any> {
        cint: WComponent[];
        comp: WComponent[];
        sr_c: string[];
        grid: string[][];
        constructor(id?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, inline?: boolean, type?: string);
        addRow(classStyle?: string, style?: string | WStyle): this;
        addCol(classStyle?: string, style?: string | WStyle): this;
        add(component: WComponent | string, constraints?: string): this;
        addGroup(w: WWrapper, ...ac: WComponent[]): this;
        addLine(style: string | WStyle, ...ac: WComponent[]): this;
        addStack(style: string | WStyle, ...ac: WComponent[]): this;
        addContainer(c: WUX.WContainer, constraints?: string): WContainer;
        addContainer(w: WWrapper, constraints?: string): WContainer;
        addContainer(i: string, classStyle?: string, style?: string, attributes?: string | object, inline?: boolean, type?: string): WContainer;
        end(): WContainer;
        protected render(): any;
        protected componentDidMount(): void;
        componentWillUnmount(): void;
        protected cs(cs: string): string;
        getElement(r: number, c?: number): HTMLElement;
    }
    class WLink extends WComponent<string, string> {
        protected _href: string;
        protected _target: string;
        constructor(id?: string, text?: string, icon?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, href?: string, target?: string);
        get icon(): string;
        set icon(s: string);
        get href(): string;
        set href(s: string);
        get target(): string;
        set target(s: string);
        protected render(): string;
        protected componentDidMount(): void;
        protected componentWillUpdate(nextProps: any, nextState: any): void;
    }
    class WLabel extends WComponent<string, string> {
        forId: string;
        constructor(id?: string, text?: string, icon?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object);
        get icon(): string;
        set icon(i: string);
        protected updateState(nextState: string): void;
        for(e: WElement): this;
        protected render(): string;
        protected componentDidMount(): void;
    }
    class WInput extends WComponent<string, string> {
        size: number;
        label: string;
        placeHolder: string;
        constructor(id?: string, type?: string, size?: number, classStyle?: string, style?: string | WStyle, attributes?: string | object);
        protected updateState(nextState: string): void;
        getState(): string;
        protected render(): string;
    }
    class WTextArea extends WComponent<number, string> {
        constructor(id?: string, rows?: number, classStyle?: string, style?: string | WStyle, attributes?: string | object);
        protected updateState(nextState: string): void;
        getState(): string;
        protected render(): string;
        protected componentDidMount(): void;
    }
    class WButton extends WComponent<string, string> {
        readonly type: string;
        constructor(id?: string, text?: string, icon?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, type?: string);
        get icon(): string;
        set icon(i: string);
        setText(text?: string, icon?: string): void;
        protected render(): string;
        protected componentDidMount(): void;
        protected componentWillUpdate(nextProps: any, nextState: any): void;
    }
    class WCheck extends WComponent<boolean, any> {
        wrapper: WUX.WContainer;
        value: any;
        protected _text: string;
        protected _obs: MutationObserver;
        constructor(id?: string, text?: string, value?: any, checked?: boolean, classStyle?: string, style?: string | WStyle, attributes?: string | object);
        get text(): string;
        set text(s: string);
        get checked(): boolean;
        set checked(b: boolean);
        getState(): any;
        protected updateProps(nextProps: boolean): void;
        protected updateState(nextState: any): void;
        protected render(): string;
        protected componentDidMount(): void;
    }
    class WSelect extends WComponent implements WISelectable {
        options: Array<string | WEntity>;
        multiple: boolean;
        constructor(id?: string, options?: Array<string | WEntity>, multiple?: boolean, classStyle?: string, style?: string | WStyle, attributes?: string | object);
        getProps(): any;
        select(i: number): this;
        addOption(e: string | WEntity, sel?: boolean): this;
        remOption(e: string | WEntity): this;
        setOptions(options: Array<string | WEntity>, prevVal?: boolean): this;
        protected updateState(nextState: any): void;
        protected render(): string;
        protected componentDidMount(): void;
        protected buildOptions(): string;
    }
    class WTable extends WComponent<any, any[]> {
        header: string[];
        keys: any[];
        types: string[];
        widths: number[];
        widthsPerc: boolean;
        hideHeader: boolean;
        div: string;
        colStyle: string | WStyle;
        rowStyle: string | WStyle;
        headStyle: string | WStyle;
        footerStyle: string | WStyle;
        col0Style: string | WStyle;
        colLStyle: string | WStyle;
        sortable: number[];
        soId: string[];
        sortBy: number[];
        constructor(id: string, header: string[], keys?: any[], classStyle?: string, style?: string | WStyle, attributes?: string | object, props?: any);
        protected render(): string;
        protected componentDidMount(): void;
        protected componentDidUpdate(prevProps: any, prevState: any): void;
        protected getType(i: number): string;
        protected buildBody(): void;
        onSort(h: (e: WEvent) => any): void;
    }
    class WFormPanel extends WComponent<WField[][], any> {
        protected title: string;
        protected rows: WField[][];
        protected roww: WWrapper[];
        protected currRow: WField[];
        protected main: WContainer;
        protected checkboxStyle: string;
        constructor(id?: string, title?: string, action?: string);
        init(): this;
        focus(): this;
        first(enabled?: boolean): WField;
        focusOn(fieldId: string): this;
        getField(fid: string): WField;
        addRow(classStyle?: string, style?: string | WStyle, id?: string, attributes?: string | object, type?: string): this;
        addTextField(fieldId: string, label: string, readonly?: boolean): this;
        addNoteField(fieldId: string, label: string, rows: number, readonly?: boolean): this;
        addDateField(fieldId: string, label: string, readonly?: boolean): this;
        addTimeField(fieldId: string, label: string, readonly?: boolean): this;
        addEmailField(fieldId: string, label: string, readonly?: boolean): this;
        addOptionsField(fieldId: string, label: string, options?: (string | WEntity)[], attributes?: string | object, readonly?: boolean): this;
        addBooleanField(fieldId: string, label: string): this;
        addBlankField(label?: string, classStyle?: string, style?: string | WStyle): this;
        addInternalField(fieldId: string, value?: any): this;
        addComponent(fieldId: string, label: string, component: WComponent): this;
        protected componentDidMount(): void;
        componentWillUnmount(): void;
        clear(): this;
        setValue(fid: string, v: any, updState?: boolean): this;
        getValue(fid: string | WField): any;
        getValues(): any;
        getState(): any;
        protected updateState(nextState: any): void;
        protected updateView(): void;
    }
}
declare namespace WUX {
    class WCalendar extends WComponent<number, Date> {
        ep: HTMLElement;
        em: HTMLElement;
        en: HTMLElement;
        et: HTMLElement;
        eb: HTMLElement;
        ct: string;
        cd: string;
        sp: string;
        sm: string;
        sn: string;
        sw: string;
        sd: string;
        so: string;
        ss: string;
        sk: string;
        se: string;
        st: string;
        td: string;
        am: string[];
        mt: {
            [k: string]: string;
        };
        ls: string;
        constructor(id?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object);
        onDoubleClick(handler: (e: WEvent) => any): void;
        protected updateState(nextState: Date): void;
        protected render(): string;
        add(a: number): Date;
        mark(...p: any[]): this;
        unmark(...p: any[]): this;
        title(d: any, t: string): this;
        unm(i: number, r?: boolean): void;
        clear(): this;
        prev(): Date;
        next(): Date;
        ele(dt: Date): HTMLElement;
        str(dt: Date): string;
        from(): string;
        to(): string;
        protected body(): string;
        protected componentDidMount(): void;
    }
}
