/**
    Micro WRAPPED USER EXPERIENCE - WUX (tiny version)
*/
declare class WuxDOM {
    static components: {
        [id: string]: WUX.WComponent;
    };
    private static renderHandlers;
    private static unmountHandlers;
    private static lastCtx;
    static onRender(handler: (e: WUX.WEvent) => any): void;
    static onUnmount(handler: (e: WUX.WEvent) => any): void;
    static getLastContext(): Element;
    static register(node: WUX.WNode, c?: WUX.WComponent | 'delete'): WUX.WComponent;
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
    /** Global settings */
    interface WGlobal {
        /** Locale setting */
        locale: string;
        /** Global init function */
        init(callback: () => any): void;
        /** Shared data */
        setData(key: string, data: any, dontTrigger?: boolean): void;
        getData(key: string, def?: any): any;
        onDataChanged(key: string, callback: (data: any) => any): void;
    }
    /** Event interface */
    interface WEvent {
        component: WComponent;
        element: Element;
        target: any;
        type: string;
        data?: any;
    }
    /**
     * Base class of a WUX component.
     */
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
        protected render(): WElement;
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
    /**
     * Split content "before<>content<>after" -> ["before", "content", "after"]
     * As well " content " -> ["&nbsp;", "content", "&nbsp;"]
     *
     * @param s content
     */
    function divide(s: string): [string, string, string];
    /**
     * Convert to string for log trace.
     *
     * @param a any
     */
    function str(a: any): string;
    function getTagName(c: any): string;
    interface WStyle {
        /** border */
        b?: string;
        /** border-collapse */
        bc?: 'separate' | 'collapse' | 'initial' | 'inherit' | 'unset';
        /** border-spacing */
        bsp?: string | number;
        /** border-radius */
        br?: string | number;
        /** box-shadow */
        bs?: string;
        /** box-sizing */
        bz?: 'content-box' | 'border-box';
        /** margin */
        m?: string | number;
        /** margin-top */
        mt?: string | number;
        /** margin-right */
        mr?: string | number;
        /** margin-bottom */
        mb?: string | number;
        /** margin-left */
        ml?: string | number;
        /** padding */
        p?: string | number;
        /** padding-top */
        pt?: string | number;
        /** padding-right */
        pr?: string | number;
        /** padding-bottom */
        pb?: string | number;
        /** padding-left */
        pl?: string | number;
        /** text-align */
        a?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
        /** vertical-align */
        v?: string;
        /** display */
        d?: 'inline' | 'block' | 'flex' | 'inline-block' | 'inline-flex' | 'inline-table' | 'list-item' | 'run-in' | 'table' | 'table-caption' | 'table-column-group' | 'table-header-group' | 'table-footer-group' | 'table-row-group' | 'table-cell' | 'table-column' | 'table-row' | 'none' | 'initial' | 'inherit';
        /** z-index */
        z?: string | number;
        /** color */
        c?: string;
        /** background(-color) */
        bg?: string;
        /** background-image */
        bgi?: string;
        /** background-repeat */
        bgr?: 'repeat' | 'space' | 'round' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'initial' | 'inherit' | 'unset';
        /** background-position */
        bgp?: string;
        /** cursor */
        cr?: string;
        /** content */
        cn?: string;
        /** font(-size) */
        f?: string | number;
        /** font-style */
        fs?: 'normal' | 'italic' | 'oblique' | 'inherit';
        /** font-weight */
        fw?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'inherit';
        /** text-transform */
        tt?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'initial' | 'inherit';
        /** transform */
        tr?: string;
        /** float */
        fl?: 'left' | 'right' | 'none' | 'initial' | 'inherit';
        /** clear */
        cl?: 'left' | 'right' | 'both' | 'none' | 'initial' | 'inherit';
        /** overflow */
        o?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
        /** overflow-x */
        ox?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
        /** overflow-y */
        oy?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
        /** opacity */
        op?: number;
        /** outline */
        ol?: number;
        /** text(-decoration) */
        text?: string;
        /** -webkit -moz -o -ms */
        k?: string;
        /** line-height */
        lh?: string;
        /** position */
        ps?: 'absolute' | 'fixed' | 'inherit' | 'initial' | 'relative' | 'static' | 'sticky' | 'unset';
        /** left */
        l?: string | number;
        /** right */
        r?: string | number;
        /** top */
        t?: string | number;
        /** bottom */
        bt?: string | number;
        /** width */
        w?: string | number;
        /** height */
        h?: string | number;
        /** min-width */
        minw?: string | number;
        /** max-width */
        maxw?: string | number;
        /** min-height */
        minh?: string | number;
        /** max-height */
        maxh?: string | number;
        /** white-space */
        ws?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'initial' | 'inherit';
        /** style */
        s?: string;
        /** class name */
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
    function build(tagName: string, inner?: string, css?: string | WStyle, attributes?: string | object, id?: string, classStyle?: string): string;
    let global: WGlobal;
}
