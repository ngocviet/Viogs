import { Listing, User } from "@prisma/client";

export type SafeListings = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeUser = Omit<
    User,
    "createAt" | "updaeAt" | "emailVerified"
> & {
    createAt: string;
    updaeAt: string;
    emailVerified: string | null
};