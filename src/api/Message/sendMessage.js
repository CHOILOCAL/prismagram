import { prisma } from "../../../generated/prisma-client";

export default{
    Mutation:{
        sendMessage: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            console.log(roomId);
            if(roomId === undefined){
                if(user.id !== to){
                    room = await prisma.createRoom({
                        participants:
                         {
                             connect:[
                                 {id: toId},{id:user.id}]
                            }
                });
                }
            }else {
                room = await prisma.room({id : roomId});
                if(!room){
                    throw Error("Room not fount");
                }                
            }
            const message = await prisma.createMessage({text:message, toId});

            return null;
        }
    }
}; 