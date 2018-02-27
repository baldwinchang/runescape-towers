<template>
  <div id="app">
    <router-view/>

    <center style="margin-top:25px;margin-bottom:15px;">
      Created by Baldwin<br />
      <small>
        &copy; 2018. All rights reserved. This site is not affiliated nor endorsed by Jagex Ltd.
        Join <a href="http://www.runescape.com" target="_blank">RuneScape</a> to start your adventure.
      </small>

    </center>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
