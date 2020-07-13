<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import Rank from "./Rank";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    ListContainer,
    Recommend,
    Brand,
    Floor,
    Like,
    Rank,
  },
};
</script>

<style scoped lang="less"></style>
