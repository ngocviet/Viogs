'use client';

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListings, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo, useState } from "react";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingHead from "@/app/components/listings/ListingHead";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { eachDayOfInterval } from "date-fns";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    ket: 'selection'
};

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListings & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing, currentUser, reservations = [],
}) => {
    const loginModal = useLoginModal();
    const route = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservations) => {
            const range = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate)
            });
            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);


    const category = useMemo(() => {
        return categories.find((item) => item.label == listing.category);
    }, [listing.category])
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                </div>
                <div
                    className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6"
                >
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;