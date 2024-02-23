<template>
    <div id="sidebar-right">
        <div id="vertical-flex-container">
          <div id="queue">
            <h2>Warteschlange</h2>
            <div id="red-queue">
              <span>ROT</span>
            </div>
            <div id="yellow-queue">
              <span>GELB</span>
            </div>
            <div id="green-queue">
              <span>GRÜN</span>
            </div>
          </div>
          <div id="back">
            <h3>Zurückholen</h3>
          </div>
        </div>
      </div>
</template>

<script setup>
    
</script>

<style scoped>
#vertical-flex-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
  }
  
  #queue {
    margin-right: 30px;
  }
  
  #queue > div {
    padding: 50px;
    margin-top: 10px;
    border: 5px solid black;
    text-align: center;
    font-size: 24pt;
  }
  
  #back {
    margin-top: 100px;
    padding: 50px;
    border: 5px dashed red;
    flex: 1;
    align-items: center;
  }
</style>