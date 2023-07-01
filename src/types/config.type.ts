export interface ConfigState {
    judgers?: Array<Judger> | null;
    programmingLanguages?: Array<ProgrammingLanguage> | null;
    contentTypes?: Array<ContentType> | null;
    history: string | null;
}
export interface Judger {
    Id: string;
    FileName: string;
    DisplayName: string;
}
export interface ContentType {
    Id: number;
    MetaDescription: string;
}
export interface ProgrammingLanguage {
    Id: number;
    LanguageName: string;
    DisplayName: string;
}
