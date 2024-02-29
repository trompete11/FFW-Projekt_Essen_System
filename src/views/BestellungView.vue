<script lang="ts" setup>
import BestellButtons from '@/components/bestellung/BestellButtons.vue'
import Button from '@/components/bestellung/ButtonBase.vue'
import EssenList from '@/components/bestellung/EssenList.vue'
import TotalModal from '@/components/bestellung/TotalModal.vue'
import IdModal from '@/components/bestellung/IdModal.vue'
import type { OrderItem } from '@/assets/interfaces'
import { useOrderStore } from '@/stores/orderStore'
import type { ButtonGrid, ButtonSite } from '@/assets/bestellInterfaces'
import { ref, type Ref } from 'vue'
import StornoModal from '@/components/bestellung/StornoModal.vue'

const order: Ref<OrderItem[] | []> = ref([])
const price_sum: Ref<number> = ref(0)

var site: ButtonSite = {
  id: 'Seite 1',
  buttons: [
    [
      {
        btnData: { id: 's1', type: 'site', style: "background-color: lightgreen" },
        data: 'Seite 1'
      },
      {
        btnData: { id: 's2', type: 'site', style: "background-color: lightgreen" },
        data: 'Seite 2'
      }
    ],
    [
      {
        btnData: { id: 'btn1', type: 'radio', name: 'food', style: "background-color: orange" },
        data: {
          id: 0,
          name: 'Pizza',
          description: "Pizza beschreibung",
          extra: false,
          price: 1
        }
      },
      {
        btnData: { id: 'btn2', type: 'radio', name: 'food', style: "background-color: orange" },
        data: {
          id: 1,
          name: 'Burger',
          description: "Burger beschreibung",
          extra: false,
          price: 2
        }
      }
    ],
    [
      {
        btnData: { id: 'btn3', type: 'checkbox', style: "background-color: lightblue" },
        data: {
          id: 2,
          name: 'Zwiebeln',
          extra: true,
          price: 0.1
        }
      },
      {
        btnData: { id: 'btn4', type: 'checkbox', style: "background-color: lightblue" },
        data: {
          id: 3,
          name: 'Käse',
          extra: true,
          price: 0.2
        }
      },
      {
        btnData: { id: 'btn5', type: 'addButton', style: "background-color: lightgrey" },
        data: 'Anfügen'
      }
    ],
    [
      {
        btnData: { id: 'btn6', type: 'text' },
        data: 'text eingeben'
      }
    ]
  ]
}
var site2: ButtonSite = {
  id: 'Seite 2',
  buttons: [
    [
      {
        btnData: { id: 's1_2', type: 'site', style: "background-color: lightgreen" },
        data: 'Seite 1'
      },
      {
        btnData: { id: 's2_2', type: 'site', style: "background-color: lightgreen" },
        data: 'Seite 2'
      }
    ],
    [
      {
        btnData: { id: 'btn1_2', type: 'checkbox', style: "background-color: lightblue" },
        data: {
          id: 0,
          name: 'Chili',
          extra: true,
          price: 1
        }
      },
      {
        btnData: { id: 'btn2_2', type: 'checkbox', style: "background-color: lightblue" },
        data: {
          id: 1,
          name: 'Salat',
          extra: true,
          price: 2
        }
      }
    ]
  ]
}
var btns: Ref<ButtonGrid> = ref({ startSite: 'Seite 1', sites: [site, site2] })

const totalModal = ref(false)
const stornoModal = ref(false)
const idModal = ref(false)

const newId = ref(-1)

const orderStore = useOrderStore()

function beilagen_sort(a: any, b: any) {
  if (a.id < b.id) {
    return -1
  } else if (a.id > b.id) {
    return 1
  }

  return 0
}

function addItemClick(item: OrderItem) {
  console.log('addItem: ' + JSON.stringify(item))
  if (item.item === null || item.item === undefined) {
    return
  }
  item.extras.sort(beilagen_sort) // sort um vergleich der beilagen unabhängig von der reihenfolge zu machen

  //finde Index von Element mit gleichem essen und Gleichen beilagen
  let index = order.value.findIndex(
    (element: OrderItem) =>
      element.item.id === item.item.id &&
      element.comment === item.comment &&
      JSON.stringify(item.extras) === JSON.stringify(element.extras)
  )

  if (index !== -1) {
    order.value[index].count++
    console.log('plus')
  } else {
    item.price_sum = item.item.price
    item.extras.forEach((element: any) => {
      item.price_sum += element.price
    })
    console.log('push')
    order.value.push(JSON.parse(JSON.stringify(item)))
  }

  price_sum.value += item.price_sum
}

function newOrder() {
  if (order.value.length <= 0) {
    return
  }
  newId.value = orderStore.addOrder(order.value, price_sum.value).value
  clearOrder()
  idModal.value = true
}

function clearOrder() {
  order.value = []
  price_sum.value = 0
  //location.reload()
}
</script>

<template>
  <div class="col">
    <BestellButtons :buttons="btns" @addClick="(item) => addItemClick(item)"></BestellButtons>
  </div>
  <div class="col-1 col-middle"></div>
  <div class="col col-right">
    <div class="row" style="">
      <div class="col lastSchlange">
        <h2>Auslastung Schlange</h2>
      </div>
    </div>
    <div class="row">
      <div class="col essenList">
        <h2>Aktuelle Bestellung</h2>
        <EssenList :order="order"></EssenList>
      </div>
    </div>
    <div class="row">
      <div class="col col-radio">
        <Button
          :btn_data="{
            type: 'button',
            id: 'total',
            style: 'background-color:#c90019'
          }"
          @click="totalModal = true"
          >Aussen Total</Button
        >
      </div>
      <div class="col col-radio">
        <Button
          :btn_data="{
            type: 'button',
            id: 'price',
            style: 'background-color:#e6eec9'
          }"
          >{{
            Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price_sum)
          }}</Button
        >
      </div>
      <div class="col col-radio">
        <Button
          :btn_data="{
            type: 'button',
            id: 'storno',
            style: 'background-color:#c90019'
          }"
          @click="stornoModal = true"
          >Storno</Button
        >
      </div>
    </div>
  </div>
  <TotalModal
    @close="totalModal = false"
    @bar="newOrder()"
    :order="order"
    :price="price_sum"
    v-if="totalModal"
  />
  <StornoModal
    @close="stornoModal = false"
    @clear="clearOrder()"
    @storno="
      (id: number) => {
        orderStore.stornoOrder(id)
      }
    "
    v-if="stornoModal"
  />
  <IdModal v-if="idModal" @close="idModal = false" :id="newId"/>
</template>

<style scoped>

.lastSchlange{
  height: 10vh;
  margin-top: 1vh;
}
.essenList {
  height: 53vh;
  overflow-y: scroll;
  margin-top: 1vh;
}

.col-radio {
  height: 5vh;
  margin: 1vh 1vh;
  padding: 0em;
}

.col-right {
  padding: 0;
}
.col-middle {
  padding: 0;
}

h2 {
  font-size: x-large;
}
</style>
