export declare function hashPassword(password: string): Promise<string>;
export declare function comparePasswords(plainText: string, hashedPassword: string): Promise<boolean>;
