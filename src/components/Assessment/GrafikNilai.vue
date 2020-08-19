<template>
  <div class="card-body">
    <h1 class="text-2xl font-bold text-gray-700 text-center mb-8">
      Tes Potensi Skolastik (TPS)
    </h1>
    <canvas id="grafik-1"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from 'chart.js'

const dataChart = {
  type: 'bar',		
  options: {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
}

export default {
  data: () => ({
		dataChart: dataChart,
    // dataGrafik: [
    //   {
    //     id: 1,
    //     pertanyaan: 'apa ?',
    //     datasets: [{
    //       startup: 'Smartedu',
    //       jawaban: 100,
    //       color: 'red'
    //     },{
    //       startup: 'Matrash',
    //       jawaban: 90,
    //       color: 'blue'
    //     }]
    //   }
    // ]
  }),
  computed: {
    ...mapState('dataAssessment', ['detailAssessment']),
    dataGrafik() {
      const colors = ['#313D65', '#F08519', '#1976D2', '#EB306F', '#3F51B5'] 
      return this.detailAssessment.analisis_nilai.tabel
       .map((tabel, i) => {
         const data = {
           id: i+1,
           datasets: []
         }
        data.datasets = tabel.detail.map((submateri, color) => ({
         submateri: submateri.submateri,
         skor: submateri.skor,
         color: colors[color]
        }))
        return data
       })       
    }
  },
  methods: {
    createChart(chartData) {
      chartData.map(x => {
        const cfx = document.getElementById(`grafik-${x.id}`)
        new Chart(cfx, {
          type: this.dataChart.type,
          data: {
            labels: [''],
            datasets: x.datasets.map((y) => {
              return {
                label: y.submateri,
                data: [parseInt(y.skor)],
                backgroundColor: y.color,
              }
            })
          },
          options: this.dataChart.options
        })
      })
    }
  },
  mounted() {
    this.createChart(this.dataGrafik)
  },
}
</script>

<style>

</style>