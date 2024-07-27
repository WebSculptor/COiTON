import { createClient } from "@/utils/supabase/client";

export const supabase = createClient();

export const dummyProperties = [
  {
    id: 1,
    isApproved: true,
    title: "Sunny Villa",
    propertyType: "House",
    address: "123 Sunshine St, Miami, FL",
    createdAt: "June 14, 2023",
    price: 500000,
    image: [
      "https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 2,
    isApproved: true,
    title: "Cozy Cottage",
    propertyType: "Cottage",
    address: "456 Oak Lane, Asheville, NC",
    createdAt: "June 14, 2023",
    price: 300000,
    image: [
      "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 3,
    isApproved: true,
    title: "Urban Apartment",
    propertyType: "Apartment",
    address: "789 Main St, New York, NY",
    createdAt: "June 14, 2023",
    price: 750000,
    image: [
      "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 4,
    isApproved: true,
    title: "Luxury Condo",
    propertyType: "Condo",
    address: "101 Ocean Dr, Los Angeles, CA",
    createdAt: "June 14, 2023",
    price: 1200000,
    image: [
      "https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 5,
    isApproved: false,
    title: "Suburban Home",
    propertyType: "House",
    address: "202 Maple St, Dallas, TX",
    createdAt: "June 14, 2023",
    price: 600000,
    image: [
      "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
];

export const realEstateTypes: string[] = [
  "Single-family Home",
  "Multi-family Home",
  "Condominium",
  "Townhouse",
  "Apartment",
  "Co-op",
  "Loft",
  "Duplex",
  "Triplex",
  "Quadruplex",
  "Studio",
  "Penthouse",
  "Villa",
  "Cottage",
  "Cabin",
  "Ranch",
  "Farm",
  "Land",
  "Commercial Property",
  "Industrial Property",
  "Retail Space",
  "Office Space",
  "Mixed-use Property",
  "Hotel",
  "Motel",
  "Resort",
  "Mobile Home",
  "Modular Home",
  "Tiny House",
  "Boat House",
  "Farmhouse",
  "Luxury Home",
  "Historic Property",
  "New Construction",
  "Vacation Home",
  "Investment Property",
];

export const dummyStates: string[] = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT (Federal Capital Territory)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
