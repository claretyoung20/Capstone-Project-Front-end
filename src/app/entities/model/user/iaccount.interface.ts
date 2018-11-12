import { Entity } from 'app/entities/interfaces/entity.interface';

export interface IAccount extends Entity {
    activated: boolean,
    authorities: string[],
    email: string,
    firstName: string,
    langKey: string,
    lastName: string,
    login: string,
    imageUrl: string
}
// export class Account implements IAccount {

//     constructor(
//         public activated: boolean,
//         public authorities: string[],
//         public email: string,
//         public firstName: string,
//         public langKey: string,
//         public lastName: string,
//         public login: string,
//         public imageUrl: string
//     ) {
//         this.activated = activated;
//         this.authorities = authorities;
//         this.email = email;
//         this.firstName = firstName;
//         this.langKey = langKey;
//         this.lastName = lastName;
//         this.login = login
//         this.imageUrl = imageUrl;
//     }
// }
