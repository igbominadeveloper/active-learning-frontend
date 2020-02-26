export default class LocalStorage {
    private static storage = window.localStorage;

    public static addItem(key: string, value: any){
        return this.storage.setItem(key, value);
    }

    public static removeItem(key: string){
        return this.storage.removeItem(key);
    }

    public static getItem(key: string): any{
        return this.storage.getItem(key);
    }
}
