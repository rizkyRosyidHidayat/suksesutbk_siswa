<template>
  <div id="soal" class="flex content-between h-screen flex-wrap">
    <Navbar class="w-full flex-shrink-0"/>
    <div class="w-full flex-shrink-0 body">
      <div class="container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Perferendis, laudantium! Fugit assumenda blanditiis facilis 
          tempora voluptatum expedita voluptate amet neque error doloribus 
          molestiae, est qui a, sint fuga, voluptatibus dignissimos!
        </p>
        <div class="max-w-full sm:max-w-sm mt-6">
          <div>
            <input type="radio" name="jawaban" id="a" class="hidden">
            <label for="a">
              <div class="card border shadow cursor-pointer">
                <div class="card-body py-2 px-3 flex">
                  <div class="mr-1">A.</div>
                  <div>Jawaban</div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <PageNumber class="w-full flex-shrink-0" />
  </div>
</template>

<script>
import Navbar from '@/components/PengerjaanSoal/Navbar'
import PageNumber from '@/components/PengerjaanSoal/PageNumber'

// const tes = function () {
//   document.querySelector('#soal').webkitRequestFullscreen
//   console.log('ee')
// }

export default {
  components: {
    PageNumber,
    Navbar
  },
}
</script>

<style scoped>
.body{
  height: calc(100vh - 127px);
  overflow-x: hidden;
  overflow-y: auto;
  @apply pt-12;
}
</style>