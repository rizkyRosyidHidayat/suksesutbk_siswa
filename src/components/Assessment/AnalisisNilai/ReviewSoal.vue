<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-700 mt-8">
      {{ data.materi_uji }}
    </h1>
    <ul class="mt-4">
      <li
        v-for="(val, i) in data.detail" :key="i" 
        class="grid grid-cols-2 gap-4 items-center">
        <div class="border rounded p-3 flex items-center justify-between">
          <div>
            <h1 class="text-lg font-bold text-gray-700">
              {{val.submateri}}
            </h1>
            <div>
              Dikerjakan dalam waktu kurang lebih 
							{{ waktu(val.durasi_pengerjaan.value) }}
            </div>
          </div>
          <div class="btn-primary px-2 py-1 ml-4">
            Review
          </div>
        </div>
        <div>
          <div class="mb-2">
            {{val.benar}} benar / {{val.total_soal}} Soal            
          </div>
          <div class="rounded-full bg-blue-200 w-full h-4">
            <div class="rounded-full bg-blue-500 h-4" :style="{'width': progress(val.benar, val.total_soal)+'%'}"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['data'],
  methods: {
    waktu (time) {
      var durasi = moment.duration(time, 'seconds')
      return durasi.minutes()+' menit '+durasi.seconds()+' detik'
    },
    progress (benar, total) {
      return (benar*100)/total
    },
  }
}
</script>

<style>

</style>