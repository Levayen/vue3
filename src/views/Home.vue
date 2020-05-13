<template>
    <div class="home">
        <div>{{$t("lang.nav.REG")}}</div>
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        HelloWorld
    },
    created() {
        this.lang = this.$i18n.locale
    },
};
</script>
