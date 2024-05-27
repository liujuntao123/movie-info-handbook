<template>
    <div class="search-container">
        <div class="logo">
            <img src="~/assets/img/logo_transparent.png" alt="logo" />
        </div>
        <div class="search-box">
            <el-autocomplete :activated="true" style="--el-border-radius-base: 24px;--el-component-size-large: 48px" size="large"  v-model="keyword" :fetch-suggestions="querySearch" popper-class="my-autocomplete"
                placeholder="请输入" @select="handleSelect">
                <template #preffix>
                    <el-icon class="el-input__icon">
                        <edit />
                    </el-icon>
                </template>
                <template #default="{ item }">
                    <el-space>
                        <div class="pic">
                            <img crossorigin="anonymous" :src="item.img" :alt="item.title" />
                        </div>
                        <div class="text">
                            <p class="title">
                                {{ item.title }}
                                <span class="year-text">
                                    {{ item.year }}
                                </span>
                            </p>
                            <p class="sub-title">
                                {{ item.sub_title }}
                            </p>
                        </div>
                    </el-space>
                </template>
            </el-autocomplete>
        </div>

    </div>
</template>

<script setup>
const router=useRouter()
const keyword = ref('')
const querySearch = async (queryString,cb) => {
    if(queryString===''){
        return cb([])
    }
const res=await $fetch('/api/search?keyword='+queryString)
console.log(res)
cb(res)
}
const handleSelect = (record) => {
    router.push('/info?id='+record.id)
}

const handleIconClick = () => {

}


</script>

<style scoped>
.search-container {
    margin: 0 auto;
    padding: 40px 0;
}

@media (max-width: 750px) {
    .search-container {
        width: 100%;
    }
}
.logo{
    width: 40%;
    margin: 0 auto;
}
.logo img{
    width: 100%;
}
.search-box{
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
}
.search-input{
    height: 40px;

}


.pic img{
    height: 80px;
}

.year-text{
    font-size: 12px;
    color: #999;
}
</style>