import { Order, OrderStorno, Printjob } from "./database.js"

import escpos from "escpos";
import Serial from "escpos-serialport";
import { Association } from "sequelize";

function numDisplay(num) {
    if (num < 10) {
        return '00' + num
    } else if (num < 100) {
        return '0' + num
    } else {
        return num
    }
}

try{
    const device  = new Serial("ser6");
    const options = { /*encoding: "GB18030" /* default */};
    // encoding is optional

    const printer = new escpos.Printer(device, options);
}
catch(error){
    console.log(error);
}

function printBon(value, storno=false){
    console.log(value);

    try{
        device.open(function(error){
          printer.cashdraw().close();
        });
    }catch(error){
        console.log(error);
    }

    let time = new Date(value.time_in).toLocaleTimeString();
    let out = {
        workid: numDisplay(value.id),
        table: "Zum Mitnehmen",
        userid: "2",
        time: time,
        products: []
        
    };

    value.order.forEach(item => {
        let prod = {
            id: item.item.id,
            longname: item.count + "x " + item.item.count + " " + item.item.name,
            singleprod: item.item.count + " " + item.item.name,
            price: item.item.price,
            togo: "",
            option: "",
            extras:[],
            ordertime: time,
            kind: 0,
            printer: 1,
            allqueueids: ["3"]
        };

        item.beilagen.forEach(bei => {
            prod.extras.push({name: bei.name});
            prod.price += bei.price;
        })

        if(item.comment !== ""){
            prod.extras.push({name: item.comment});
        }
        out.products.push(prod);
    })

    let job = {
        content: JSON.stringify(out),
        type: 1,
        printer: 1
    }
    if(storno){
        job.type = 2
    }

    Printjob.create(job);
}


/*
printjob ordersprinter

(43, '{
      "workid":65,
      "table":"Zum Mitnehmen (Karl Kellner)",
      "userid":"2",
      "time":"16:16",
      "products":[
            {
            "id":"3",
            "longname":"Schnitzel",
            "singleprod":"Schnitzel",
            "price":"3,50",
            "togo":"",
            "option":"",
            "extras":[
                {"name":"mit Ketchup"},{"name":"mit Remoulade"},{"name":"mit Senf"}
            ],
            "ordertime":"16:16",
            "kind":0,
            "printer":1,
            "allqueueids":["3"]
            }
        ]
    }', 1, 1, 1, NULL, '2022-05-17 20:56:01'),
*/

export const registerOrderHandlers = (io, socket) => {
    const createOrder = async (value) => {
        
        value = JSON.parse(value);
        value.order = JSON.stringify(value.order);

        let order = await Order.create(value);
        console.log("order:create " + value);
        order.order = JSON.parse(order.order);

        printBon(order);
        order.time_in = Date();
        socket.broadcast.emit("order:update", order);
    }

    const kasse = async () => {
        console.log("Kasse")
        try{
            device.open(function(error){
                printer.cashdraw().close();
            });
        }catch(error){
            console.log(error);
        }
    }

    const rePrintOrder = async () =>{
        console.log("order:rePrint ");
        try{
            let lastOrder = await Printjob.findAll({limit: 1, order:[["id", "DESC"]]});

            lastOrder[0].set({removed:null});
            lastOrder[0].save();
        }catch(error){
            console.log(error);
        }
    }
    
    const getOrder = async (id) =>{
        console.log("order:get " + id);

        let order = Order.findByPk(id);

        order.order = JSON.parse(order.order);
        socket.emit("order:update", order);
    }

    const getOrders = async (filter) =>{
        console.log("order:sget ");
        console.log(filter);
        let orders = await Order.findAll({where: filter});
        orders.forEach((element) => {element.order = JSON.parse(element.order)});
        socket.emit("order:updates", orders);
    }

    const updateOrder = async (value) => {
        console.log("Update, " + value);
        value = JSON.parse(value);
        value.order = JSON.stringify(value.order);

        let order = await Order.findByPk(value.id)
        order.set(value);
        await order.save();
        order.order = JSON.parse(order.order);
        socket.broadcast.emit('order:update', order);
    }

    const updatebOrder = async (value) => {
        console.log("Update, " + value);
        value = JSON.parse(value);
        value.order = JSON.stringify(value.order);

        let order = await Order.findByPk(value.id)
        order.set(value);
        await order.save();
        order.order = JSON.parse(order.order);
        io.emit('order:update', order);
    }

    const deleteOrder = async (id) =>{
        console.log("Delete, " + id);
        let orders = await Order.findAll({where:{id:id}});
        orders.forEach(async (element) => {
            await Order.destroy({where:{id:element.id}});
            element.id = null;
            await OrderStorno.create(element);
            element.order = JSON.parse(element.order);
            printBon(element, true);
        });
    }

    socket.on("order:create", createOrder);
    socket.on("order:get", getOrder);
    socket.on("order:sget", getOrders);
    socket.on("order:update", updateOrder);
    socket.on("order:updateb", updatebOrder);
    socket.on("order:delete", deleteOrder);
    socket.on("order:kasse", kasse);
    socket.on("order:reprint", rePrintOrder);
};
