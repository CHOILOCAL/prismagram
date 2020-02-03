import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    sayHello: async () => {

      console.log(await prisma.users());

      return "HELLO";
    }
  }
};

//  frontend -> request server -> request prisma
// safe the server endpoint