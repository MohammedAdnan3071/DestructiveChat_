import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const SUPES = [
  "Billy Butcher",
  "Hughie Campbell",
  "Homelander",
  "Starlight",
  "A-Train",
  "Mother's Milk",
  "Frenchie",
  "Kimiko Miyashiro",
  "The Deep",
  "Black Noir",
  "Queen Maeve",
  "Ashley Barrett",
  "Victoria Neuman",
  "Ryan Butcher",
  "Soldier Boy",
  "Stormfront",
  "Sister Sage",
  "Firecracker",
  "Stan Edgar",
  "Grace Mallory",
  "Becca Butcher",
  "Madelyn Stillwell",
  "Joe Kessler",
  "Translucent",
  "Lamplighter",
  "Supersonic",
  "Crimson Countess",
  "Gunpowder",
  "Blue Hawk",
  "Eagle the Archer",
  "Shockwave",
  "Popclaw",
  "Kenji Miyashiro",
  "Robin Ward",
  "Hugh Campbell Sr.",
  "Monique Milk",
  "Janine Milk",
  "Cherie",
  "Little Nina",
  "Robert Singer"
];

const STORAGE_KEY = "chat_username";

const generateUsername = () => {
  const word = SUPES[Math.floor(Math.random() * SUPES.length)];
  return `Anonymous-${word}-${nanoid(5)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setUsername(stored);
        return;
      }

      const generated = generateUsername();
      localStorage.setItem(STORAGE_KEY, generated);
      setUsername(generated);
    };

    main();
  }, []);

  return { username };
};