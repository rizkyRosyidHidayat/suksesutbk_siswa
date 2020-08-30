<template>
  <div class="card-body overflow-auto md:overflow-visible">
    <h1 class="text-2xl font-bold text-gray-700">
      Peringkat Berdasarkan
    </h1>
    <Form :page="page" />
    <table class="table-auto w-full mt-4 -mx-6 md:mx-0">
      <thead class="bg-gray-200">
        <tr>
          <th>Ranking</th>
          <th>Nama</th>
          <th>Asal Sekolah</th>
          <th>Provinsi</th>
          <th>Kelompok Uji</th>
          <th>PTN</th>
          <th>Prodi</th>
          <th>Nilai Akhir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="8">
            <div class="rounded-full block h-4 bg-gray-500 animate-pulse"></div>
          </td>
        </tr>
        <tr v-else-if="dataPeringkat.length == 0">
          <td colspan="8">
            <div class="rounded p-3 bg-blue-600 text-white">
              Silahkan mengisi form untuk mencari data peringkat
            </div>
          </td>
        </tr>        
        <tr v-else>
          <td>1</td>
          <td>Ocid</td>
          <td>SMK</td>
          <td>Jateng</td>
          <td>SAINTEK</td>
          <td>AMIKOM</td>
          <td>Informatika</td>
          <td>90</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center mt-8">
      <div 
        v-show="dataPeringkat.length > 0"
        v-for="item in 2" :key="item"
        @click="page=item"
        class="btn-primary py-1 px-3 btn-outline mr-3"
        :class="{'active': item==page?true:false}">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Form from './Peringkat/Form'
export default {
  components: { Form },
  data: () => ({
    page: 1
  }),
  computed: {
    ...mapState('dataAssessment', ['dataPeringkat', 'loading'])
  }
}
</script>

<style scoped>
th{ @apply p-2; }
td{ 
  @apply text-center py-2;
}
table tr:nth-child(even) {
  @apply bg-gray-200;
}
.btn-outline{
  @apply text-orange-500 border border-orange-500 bg-white;
}
.btn-outline:hover, .btn-outline.active{
  @apply text-white bg-orange-500;
}
</style>