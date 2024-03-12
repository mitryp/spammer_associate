export namespace receiver {
    export interface ReceiverName {
        firstName: string;
        middleName?: string;
        lastName: string;
    }

    export interface Receiver {
        _id?: string;
        name: ReceiverName;
        email: string;
    }

    export interface UpdateReceiverDto {
        name: ReceiverName | {
            middleName?: null | string
        }
    }

    export function presentName(name: ReceiverName): String {
        return `${name.firstName}${name.middleName ? ` ${name.middleName}` : ''} ${name.lastName}`;
    }

    export function isValidName(json: unknown): boolean {
        const maybeName = json as ReceiverName;
        console.log(!!maybeName.firstName && !!maybeName.lastName);
        return !!maybeName.firstName && !!maybeName.lastName;
    }

    export function isValid(json: unknown): boolean {
        if (!json) {
            return false;
        }

        const maybeReceiver = json as Receiver;

        return !!maybeReceiver.email && !!maybeReceiver.name && isValidName(maybeReceiver.name);
    }

    export function validateArray(json: unknown): boolean {
        return !!json && Array.isArray(json) && (json as unknown[]).every(isValid);
    }
}