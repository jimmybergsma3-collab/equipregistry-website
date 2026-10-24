import bcrypt from "bcryptjs";

async function run() {
  const password = "Er!9vQ7#Lx2@M4pZ";

  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
}

run();