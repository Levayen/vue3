<template>
    <div>
        <select v-model="lang" style="width:60px; line-height:44px; background:rgb(36,39,46); color:#343434; border:none; background:none; height:44px; margin-right:10px; margin-top:5px;" @change="to_lang_change">
				<option value="zh" >中文</option>
				<option value="en" >EN</option>
		</select>
        <div>index{{ msg }}</div>
        <div>{{ reversedMsg }}</div>
        <div>{{ fn(hellow) }}</div>
        <el-row>
            <el-button icon="el-icon-search" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <el-button type="info" icon="el-icon-message" circle></el-button>
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>
        <div ref="reg" v-if="showReg" style="width:100px">{{$t("lang.nav.REG")}}</div>
        <el-button type="danger" @click="change"> change </el-button>
        <ul>
            <li v-for="(item, index) in number" :key="index">{{ item }}</li>
        </ul>
        <div> add：{{ add }} </div>
        <div>{{amunt}} <el-button @click="plus">增加</el-button></div>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
    data() {
        return {
            msg: "abc",
            hellow: "hello",
            lang:"",
            showReg: false,
            number: [1, 2, 3, 4, 5],
            amunt:"0"
        };
    },
    created() {
        this.lang = this.$i18n.locale
    },
    watch:{
        amunt:function (val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal)
        },
    },
    computed: {
        reversedMsg: function() {
            // `this` 指向vue实例
            return this.msg
                .split("")
                .reverse()
                .join("")
        },
        add() {
            let add = 0
            for(let i = 0; i < this.number.length; i++) {
                add += this.number[i]
            }
            return add
        }
    },
    methods: {
        fn(msg) {
            return msg
                .split("")
                .reverse()
                .join("")
        },
        to_lang_change() {
            this.lang_change(this.lang)
        },
        change() {
            this.showReg = true
            this.$nextTick(() => {
                let domWidth = this.$refs.reg.offsetWidth
                console.log(domWidth)
            }) 
        },
        plus() {
            this.amunt++
        }
    }
};
</script>