export namespace template {
    export interface MailTemplate {
        title: string;
        body: string;
    }

    export function isValid(json: unknown): boolean {
        if (!json) return false;

        const maybeTemplate = json as MailTemplate;

        return !!maybeTemplate.title && !!maybeTemplate.body;
    }

    export function validateArray(json: unknown): boolean {
        return !!json && Array.isArray(json) && (json as unknown[]).every(isValid);
    }
}
