import escpos from "escpos";
import Serial from "escpos-serialport";

// Select the adapter based on your printer type
//const device  = new Console();
//const device  = new Network('LAPTOP01/TestBonDrucker');
//console.log(Usb.findPrinter());

const device  = new Serial("ser1");

const options = { /*encoding: "GB18030" /* default */};
// encoding is optional

const printer = new escpos.Printer(device, options);

try{
  device.open(function(error){
    printer.cashdraw().close();
  });
  }catch(error){
      console.log(error);
  }
