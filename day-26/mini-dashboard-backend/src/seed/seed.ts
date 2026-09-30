import prisma from "../utils/prisma";
import bcrypt from "bcrypt";

async function seedDB() {
  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.createMany({
    data: [
      {
        name: "admin1",
        email: "admin1@gmail.com",
        passwordHash: passwordHash,
        avatar:
          "https://github.com/antony-akshay/solana/blob/main/nft/json-data/hue.png?raw=true",
      },
      {
        name: "admin2",
        email: "admin2@gmail.com",
        passwordHash: passwordHash,
        avatar:
          "https://media.licdn.com/dms/image/v2/D4D03AQF1c8oCAZR0ng/profile-displayphoto-scale_200_200/B4DZ8iRWphJwAg-/0/1782986404520?e=2147483647&v=beta&t=wGicrcWe97jhq6k5A11gVNweJjlogaqN0G590zSCJFk",
      },
    ],
  });

  console.log(user);
}

await seedDB();
