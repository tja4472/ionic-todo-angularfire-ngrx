export class SignedInUser {
    // displayName: string = null;
    email: string | null = null;
    firebaseDisplayName: string | null = null;
    userId: string = '';

    public constructor(
        fields?: {
            firebaseDisplayName?: string | null,
            email?: string | null,
            userId?: string,
        }) {
        if (fields) {
            Object.assign(this, fields);
        }
    }

    public get displayName(): string {
        const defaultDisplayName = '';

        if (this.firebaseDisplayName) {
            return this.firebaseDisplayName;
        }

        if (this.email === null) {
            return defaultDisplayName;
        }

        return this.email;
    }
}
