"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate } from "@/lib/utils";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import {
  Bath,
  BedSingle,
  CheckCheck,
  Loader2,
  MapPin,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ListingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const { address } = useWeb3ModalAccount();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [listing, setListing] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<string>("");

  async function fetchListingData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://decentralized-real-estate-trading.onrender.com/api/v1/listings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast("Failed to fetch listing");
        throw new Error("Failed to fetch listing");
      }
      const result = await response.json();
      if (!result?.data?.rows) {
        return router.push("/dashboard");
      }

      // Find the listing with matching ID
      const foundListing = result?.data?.rows.find(
        (item: any) => item.id === params.id
      );
      if (foundListing) {
        setListing(foundListing);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast("Listing not found");
        return router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  async function deleteListing() {
    if (address !== listing?.details?.owner)
      return toast("You are not authorized to delete this listing");

    try {
      setIsDeleting(true);
      const response = await fetch(
        `https://decentralized-real-estate-trading.onrender.com/api/v1/listings/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast("Failed to delete listing");
        throw new Error("Failed to delete listing");
      }
      toast("Successfully deleted listing");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    fetchListingData();
    setSelectedImage(listing?.details?.images[0]);
  }, [listing?.details?.images[0]]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex-1 flex flex-col gap-6 pb-6">
      <div className="aspect-[1.4] md:aspect-[1.8] lg:aspect-[2.5] xl:aspect-auto xl:h-[535px] max-w-[1558px] w-full mx-auto overflow-hidden relative">
        <div className="w-full h-full bg-background/40 absolute inset-0 hidden xl:flex"></div>
        <div className="w-full h-full bg-secondary rounded-xl overflow-hidden mb-3">
          <Image
            src={`https://bronze-gigantic-quokka-778.mypinata.cloud/ipfs/${
              selectedImage || listing?.details?.images[0]
            }`}
            alt="Main Image"
            width={3840}
            height={2160}
            priority
            quality={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto w-full relative xl:absolute xl:bottom-0 xl:left-0 p-3 bg-background/80">
          {listing?.details?.images.map((image: string, index: number) => (
            <div
              key={index}
              onClick={() => handleImageClick(image)}
              className={cn(
                "w-24 aspect-[1.1] cursor-pointer bg-secondary rounded-md brightness-50 overflow-hidden",
                {
                  "brightness-100 border-2 border-primary":
                    selectedImage === image,
                }
              )}>
              <Image
                src={`https://bronze-gigantic-quokka-778.mypinata.cloud/ipfs/${image}`}
                alt={`Image ${index}`}
                width={200}
                height={200}
                priority
                quality={100}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[1200px] mx-auto gap-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl md:text-4xl font-bold">
            5 bedroom duplex vgc.
          </h1>
          <p className="text-sm md:text-base">
            5 Bedrooms Detached Duplex offer for Sales in VGC, Lekki, Nigeria
            for ₦ 280,000,000 : 61721
          </p>

          <h1 className="text-xl md:text-2xl font-bold text-primary">
            ₦ {listing?.details?.price}
          </h1>
          <p className="text-sm md:text-base flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {listing?.details?.address}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <Button>Creating Proposal</Button>
            {address === listing?.details?.owner && (
              <Button
                size="icon"
                variant="destructive"
                disabled={isDeleting}
                onClick={deleteListing}>
                {isDeleting ? (
                  <Loader2 className="w-4 h-4" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="p-4 md:p-6 bg-secondary/20 flex-1 rounded border sm:border-0">
            <h2 className="text-base md:text-lg font-bold mb-2 md:mb-4">
              Description
            </h2>
            <pre className="font-sans text-sm md:text-base text-muted-foreground whitespace-pre-wrap">
              {listing?.details?.description}
            </pre>
          </div>

          <div className="p-4 md:p-6 bg-secondary/20 max-w-full lg:max-w-[450px] flex-1 rounded border sm:border-0">
            <h2 className="text-base md:text-lg font-bold mb-2 md:mb-4">
              Overview
            </h2>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <BedSingle className="w-5 h-5" />
                <p>5 Bedrooms</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <Bath className="w-5 h-5" />
                <p>5 Bathrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground mt-2">
              <span className="font-bold">Published On:</span>
              <p>{formatDate(listing?.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="p-4 md:p-6 bg-secondary/20 rounded border sm:border-0 w-full">
            <h2 className="text-base md:text-lg font-bold mb-2 md:mb-4">
              Details
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <span className="font-bold">Property Id:</span>
                <p className="flex-1 text-sm md:text-base">61721</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <span className="font-bold">Price:</span>
                <p className="flex-1 text-sm md:text-base">₦ 280,000,000</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <span className="font-bold">Bedrooms:</span>
                <p className="flex-1 text-sm md:text-base">5</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <span className="font-bold">Bathrooms:</span>
                <p className="flex-1 text-sm md:text-base">5</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <span className="font-bold">Living Rooms:</span>
                <p className="flex-1 text-sm md:text-base">2</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <span className="font-bold">Garages:</span>
                <p className="flex-1 text-sm md:text-base">7</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 bg-secondary/20 rounded border sm:border-0 w-full">
            <h2 className="text-base md:text-lg font-bold mb-2 md:mb-4">
              Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">
                  All Ensuite Bedrooms
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Back Yard</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Balcony</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Family Lounge</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Fenced Yard</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Gateman</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Hot Tub</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Kitchen</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Swimming Pool</p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <CheckCheck className="w-5 h-5 text-primary" />
                <p className="flex-1 text-sm md:text-base">Washer and Dryer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
