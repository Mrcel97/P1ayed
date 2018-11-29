export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    roles: Roles;
    since: number;
}

export interface Roles {
    subscriber?: boolean;
    developer?: boolean;
    admin?: boolean;
}