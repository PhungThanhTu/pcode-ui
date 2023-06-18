export interface ConfigState {
    judgers: Array<Judger>;
    programmingLanguages: Array<any>;
    contentTypes: Array<ContentType>
}
export interface Judger {
    Id: string;
    FileName: string;
    Displayname: string;
}
export interface ContentType {
    Id: number;
    MetaDescription: string;
}
