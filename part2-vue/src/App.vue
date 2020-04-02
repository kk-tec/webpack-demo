<!--渲染模版-->
<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<!--组件逻辑-->
<script>
export default {
  data() {
    return {
      msg: 'Hello,Webpack'
    }
  }
}
</script>

<!--样式描述-->
<style lang="scss">
:root {
  --red: #d33;
}

$blue: #1875e7;
div {
  border: 1px solid $blue;
  display: flex; //flex布局
  justify-content: center; //x轴排列
  align-items: center; //y轴排列
}
</style>

<style scoped>
h1 {
  color: var(--red);
}
</style>