import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import { supabase } from "@/constants";

export const registerUser = async ({
  name,
  email,
  password,
  address,
}: {
  name: string;
  email: string;
  password: string;
  address: string;
}) => {
  const avatar = createAvatar(pixelArt, {
    seed: `${name + email + address + password}`,
  }).toString();

  try {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
        data: {
          name,
          address,
          avatar,
        },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const result = await supabase.auth.signOut();

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
