<template>
    <div v-loading="loading" class="info-container">
        <el-card class="info-box">
            <template #header>
                <div class="card-header">
                    <span>{{ info.title }}</span>
                </div>
            </template>
            <div class="info-content">
                <div class="img">
                    <img :src="info.info.img" :alt="info.title" />
                </div>
                <div class="text">
                    <el-descriptions :column="1">
                        <el-descriptions-item label="导演">{{ info.info.director }}</el-descriptions-item>
                        <el-descriptions-item label="编剧">{{ info.info.screenwriter }}</el-descriptions-item>
                        <el-descriptions-item label="演员">{{ info.info.actors.join(', ') }}</el-descriptions-item>
                        <el-descriptions-item label="类型">{{ info.info.genres.join(', ') }}</el-descriptions-item>
                        <el-descriptions-item label="地区">{{ info.info.country.join(', ') }}</el-descriptions-item>
                        <el-descriptions-item label="语言">{{ info.info.language.join(', ') }}</el-descriptions-item>
                        <el-descriptions-item label="上映日期">{{ info.info.releaseDates.join(', ')
                            }}</el-descriptions-item>
                        <el-descriptions-item label="片长">{{ info.info.runtime }}</el-descriptions-item>
                        <el-descriptions-item label="又名">{{ info.info.aliases.join(', ') }}</el-descriptions-item>
                        <el-descriptions-item label="IMDb">{{ info.info.imdb }}</el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>

        </el-card>


        <el-card class="score-box">
            <template #header>
                <div class="card-header">
                    <span>评分情况</span>
                </div>
            </template>
            <div>
                <div class="score">
                    <el-rate style="--el-rate-font-size:32px" :max="10" :model-value="info.score.rating" disabled show-score
                        score-template="{value} 分" />
                </div>
                <div class="distribution">
                    <div class="rating-item" v-for="(item, index) in info.score.ratings" :key="index">
                        <span>{{ item.star }}</span>
                        <el-progress class="progress" :stroke-width="24"
                            :percentage="parseFloat(item.percentage)"></el-progress>
                    </div>

                </div>
                <div class="better-than">
                    <el-space v-for="(item, index) in info.score.betterThan" :key="index">
                        好于
                        <span style="font-size: 24px;">{{ item.percentage }}</span>
                        的
                        <span>{{ item.type }}</span>
                    </el-space>
                </div>
            </div>

        </el-card>
    </div>
</template>

<script setup>
const route = useRoute()
const id = route.query.id

const info = ref({
    title: "",
    info: {
        director: "",
        screenwriter: "",
        actors: [],
        genres: [],
        country: [],
        language: [],
        releaseDates: [],
        runtime: "",
        aliases: [],
        imdb: "",
        img: "",
    },
    score: {
        rating: "",
        votes: "",
        ratings: [],
        betterThan: [],
    },
})

const loading = ref(true)
onMounted(async () => {
    const res = await $fetch('/api/info?id=' + id)
    loading.value = false
    info.value = res


})
</script>




<style scoped>
.info-container {
    width: 1200px;
    padding-top: 10px;
    margin: 0 auto;
}


.img  {
    height: fit-content;
}

@media (max-width: 750px) {
    .info-container {
        width: 96%;
    }

    .img img {
        width: 100%
    }
}




.info-box {
    margin-bottom: 10px;
}

.info-content {
    display: flex;
    gap: 20px;
}

@media (max-width: 750px) {
    .info-content {
        flex-direction: column;
    }
}

.score-box{
    margin-bottom: 10px;
}

.score {
    padding-bottom: 12px;
}

.rating-item {
    display: flex;
    gap: 8px;
    padding: 8px;
}

.progress {
    flex: 1;
}

.better-than {
    margin-top: 12px;
}
</style>