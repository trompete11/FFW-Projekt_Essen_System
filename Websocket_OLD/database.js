import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('mysql://root:@localhost:3306/ordertest');

export const Item = sequelize.define('item', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  count: DataTypes.INTEGER,
  price: DataTypes.DECIMAL
},{timestamps: false});

export const Order = sequelize.define('order', {
  type: DataTypes.CHAR,
  time_in: DataTypes.DATE,
  done: DataTypes.BOOLEAN,
  time_done: DataTypes.DATE,
  gone: DataTypes.BOOLEAN,
  time_gone: DataTypes.DATE,
  order: DataTypes.STRING,
  price: DataTypes.DECIMAL
},{});

export const OrderStorno = sequelize.define('orderstorno', {
  type: DataTypes.CHAR,
  time_in: DataTypes.DATE,
  done: DataTypes.BOOLEAN,
  time_done: DataTypes.DATE,
  gone: DataTypes.BOOLEAN,
  time_gone: DataTypes.DATE,
  order: DataTypes.STRING,
  price: DataTypes.DECIMAL
},{timestamps: false, tableName: 'orderstorno'});


const ordersprinter = new Sequelize('mysql://root:@localhost:3306/ordersprinter');

export const Printjob = ordersprinter.define('printjob', {
  content:DataTypes.STRING,
  type: DataTypes.INTEGER,
  printer: DataTypes.INTEGER,
  removed: DataTypes.INTEGER,
  pickready: DataTypes.INTEGER
},{timestamps: false, tableName: 'ordersprinter_printjob'});

/*
foodtemplate ordersprinter config:

{TAB::0}
{workid:mittig::hochbreit}

START:products
{TAB::1:5}
{longname:links}{-: }
{TAB:}
START:extras
{name:links: + }
END:extras
{option:links: }
END:products


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