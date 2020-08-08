<template>
  <div class="card bg-gray-300">
    <div class="card-body">
      <div class="font-bold text-2xl text-gray-700 italic">
        <div class="flex items-center">
          <img src="@/assets/icons/account.svg" alt="icon" width="30px">
          <span class="uppercase ml-4">{{ data.nama }}</span>
        </div>
        <div class="flex items-center">
          <img src="@/assets/icons/school.svg" alt="icon" width="30px">
          <span class="ml-4">{{ data.sekolah }}</span>
        </div>
      </div>
      <div class="text-right mt-4">
        <button class="btn-primary">
          EDIT PROFIL
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      var peserta = JSON.parse(window.localStorage.getItem('dataPeserta'))
      return {
        nama: peserta.nama,
        sekolah: peserta.sekolah.nama==null?'-':peserta.sekolah.nama,
        // avatar: peserta.avatar==null?'1@3x.png':peserta.avatar,
      }
    }
  }
}
</script>