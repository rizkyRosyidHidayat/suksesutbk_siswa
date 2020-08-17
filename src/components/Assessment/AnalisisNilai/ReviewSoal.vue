<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-700 mt-8">
      Tes Potensi Skolastik (TPS)
    </h1>
    <ul class="mt-4">
      <li class="grid grid-cols-2 gap-4 items-center">
        <div class="border rounded p-3 flex items-center justify-between">
          <div>
            <h1 class="text-lg font-bold text-gray-700">
              Penalaran Umum
            </h1>
            <div>Lorem Ipsum dolor sit amet</div>
          </div>
          <div class="btn-primary px-2 py-1 ml-4">
            Review soal
          </div>
        </div>
        <div>
          <div class="mb-2">
            3 Benar / 20 Soal            
          </div>
          <div class="rounded-full bg-blue-200 w-full h-4">
            <div class="rounded-full bg-blue-500 h-4" :style="{'width': 20+'%'}"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>