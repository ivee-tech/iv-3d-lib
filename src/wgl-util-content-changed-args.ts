export class WglUtilContentChangedArgs {
    group: any;
    object: any;
    json: any;
    type: ContentChangedType = ContentChangedType.none;
}

export enum ContentChangedType {
    none = 0,
    add = 1,
    edit = 2,
    delete = 3,
    clear = 4
}

