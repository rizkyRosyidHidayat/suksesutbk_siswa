<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
    <div>
      <div class="block rounded py-2 bg-orange-500 text-xl text-white font-bold tracking-widest text-center">
        SAINTEK
      </div>
      <ul class="border rounded mt-4 py-2 divide-y">
        <li v-if="peringkatSaintek.length == 0" class="px-4 py-2">
          <div class="block rounded py-2 bg-blue-500 text-white text-center">
            Data belum tersedia
          </div>
        </li>
        <li 
          v-else
          v-for="(item, i) in peringkatSaintek" :key="i"
          class="flex px-4 py-2 items-center">
          <div class="w-10 h-10 flex-shrink-0 rounded-full flex justify-center items-center bg-orange-300">
            {{ i+1 }}
          </div>
          <div class="ml-3">
            <h1>{{ item.nama_peserta }}</h1>
            <h2>{{ item.sekolah.nama }}</h2>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="block rounded py-2 bg-teal-500 text-xl text-white font-bold tracking-widest text-center">
        SOSHUM
      </div>
      <ul class="border rounded mt-4 py-2 divide-y">
        <li v-if="peringkatSoshum.length == 0" class="px-4 py-2">
          <div class="block rounded py-2 bg-blue-500 text-white text-center">
            Data belum tersedia
          </div>
        </li>
        <li 
          v-else
          v-for="(item, i) in peringkatSoshum" :key="i"
          class="flex px-4 py-2 items-center">
          <div class="w-10 h-10 flex-shrink-0 rounded-full flex justify-center items-center bg-orange-300">
            {{ i+1 }}
          </div>
          <div class="ml-3">
            <h1>{{ item.nama_peserta }}</h1>
            <h2>{{ item.sekolah.nama }}</h2>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDataPeringkat } from '@/config/assessment'

export default {
  data: () => ({
    peringkatSaintek: [],
    peringkatSoshum: []
  }),
  created() {
    this.getDataPeringkat()
  },
  methods: {
    getDataPeringkat: async function () {
      /**
       * Mengambil data peringkat siswa
       * berdasarkan kelompok uji
       */
      await getDataPeringkat({
        nama: '',
        kelompok: 'saintek',
        id_ptn: 0,
        id_prodi: 0,
        page: 1
      })
        .then(res => {
          if (res.status == 200) {
            this.peringkatSaintek = res.data.data
          }
        })
        .catch(err => err)
      await getDataPeringkat({
        nama: '',
        kelompok: 'soshum',
        id_ptn: 0,
        id_prodi: 0,
        page: 1
      })
        .then(res => {
          if (res.status == 200) {
            this.peringkatSoshum = res.data.data
          }
        })
        .catch(err => err)
    }
  }
}
</script>

<style>

</style>