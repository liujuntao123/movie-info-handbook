<template>
    <div class="header-container">
        <div class="header">
            <div class="logo">
                <NuxtLink to="/">
                    <img src="~/assets/img/logo_transparent.png" alt="logo" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>


<style scoped>
.header-container {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: var(--el-box-shadow-light)
}
.header{
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 40px;
}

.logo img{
    height: 40px;
}
</style>