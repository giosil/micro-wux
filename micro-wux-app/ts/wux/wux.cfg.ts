namespace WUX {

    /** Shared data */
    let _data: { [key: string]: any } = {};
    /** DataChanged callbacks */
    let _dccb: { [key: string]: ((e?: any) => any)[] } = {};

    export let global: WGlobal = {
        locale: 'it',

        init: function _init(callback: () => any) {
            if (WUX.debug) console.log('[WUX] global.init...');
            // Initialization code
            if (WUX.debug) console.log('[WUX] global.init completed');
            if (callback) callback();
        },

        setData(key: string, data: any, dontTrigger: boolean = false): void {
            if (!key) key = 'global';
            _data[key] = data;
            if (dontTrigger) return;
            if (!_dccb[key]) return;
            for (let cb of _dccb[key]) cb(data);
        },

        getData(key: string, def?: any): any {
            if (!key) key = 'global';
            let r = _data[key];
            if (r == null) return def;
            return r;
        },

        onDataChanged(key: string, callback: (data: any) => any) {
            if (!key) key = 'global';
            if (!_dccb[key]) _dccb[key] = [];
            _dccb[key].push(callback);
        }
    }
}