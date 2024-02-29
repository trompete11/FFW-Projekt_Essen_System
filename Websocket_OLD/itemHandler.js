import { Item } from "./database.js"

export const registerItemHandlers = (io, socket) => {
    const createItem = (id, value) => {
        //todo
    }

    const getItem = (id) =>{
        console.log("item:get " + id)
        Item.findByPk(id).then((item) =>{
            try{
                item.price = Number(item.price);
                socket.emit("item:update" + id, item);
            }
            catch{
                
            }

        });

    }

    const getItems = () =>{
        //todo
    }

    const updateItem = (id, value) => {

    }

    const deleteItem = () =>{
        //todo
    }

    socket.on("item:create", createItem);
    socket.on("item:get", getItem);
    socket.on("item:sget", getItems);
    socket.on("item:update", updateItem);
    socket.on("item:delete", deleteItem);
};
