<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { Show } from '@/types/Show'
import { timeDifferene } from '@/utils/time'

// set props
interface Props {
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  id: NaN,
})

// set emet
const emit = defineEmits(['kids'])

const title = ref('no title')
const score = ref(0)
const author = ref('no author available')
const time = ref(0)

const { data: resp } = await useFetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`)
const news = ref<Show>(JSON.parse(resp.value as string))

title.value = news.value.title
score.value = news.value.score
author.value = news.value.by
time.value = news.value.time

emit('kids', news.value.kids || [])

const url = computed(() => news.value?.url || '#')
const countCommet = computed(() => {
  if (news.value?.kids?.length <= 1)
    return `${news.value?.kids?.length} Comment`
  else if (news.value?.kids?.length >= 1)
    return `${news.value?.kids?.length} Comments`
  else return '0 Comment'
})

const creatTime = computed(() => {
  return timeDifferene(time.value)
})
</script>

<template>
  <div class="border-b-2 card-layout">
    <div class="flex justify-center items-center w-12 sm:w-20 p-5">
      <p class="text-center font-semibold text-[#f3621d] text-sm sm:text-xl">
        {{ score }}
      </p>
    </div>
    <div class="flex flex-col justify-center sm:overflow-hidden sm:truncate my-4 sm:my-0">
      <div class="flex items-center font-mono space-x-1">
        <a :href="url" target="_blank" class="text-sm  sm:text-base sm:truncate  font-medium hover:decoration-orange-500 hover:underline">
          {{ title }}
        </a>
      </div>
      <div class="flex text-xs sm:text-sm text-slate-500  ">
        <router-link :to="`/user/${author}`">
          by <span class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">{{ author }}</span>
        </router-link>
        <p class="px-1 sm:px-4">
          |
        </p>
        <router-link :to="`/show/${id}`">
          <p class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">
            {{ countCommet }}
          </p>
        </router-link>
        <p class="px-1 sm:px-4">
          |
        </p>
        <p><span class="hidden sm:inline">created</span> {{ creatTime }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-layout{
  display: grid;
  grid-template-columns: 1fr 11fr;
}
</style>
