<template>
  <main class="home-page page-container">
    <section class="hero-panel" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true">✦</span> RUANG BACA AL-QUR'AN</p>
        <h1 id="hero-title">Al-Qur’an, selalu <span>ada untukmu.</span></h1>
        <p class="hero-description">Temukan ketenangan, petunjuk, dan inspirasi hidup melalui ayat-ayat suci Al-Qur'an dengan tampilan yang nyaman dan modern.</p>
        <div class="hero-actions"><a class="button button-primary" href="#surah-list">Mulai Membaca <span aria-hidden="true">↗</span></a><a class="button button-secondary" href="#surah-list">Lihat Semua Surah</a></div>
        <div class="hero-caption"><span class="caption-line"/> <span>Temukan ruang tenangmu hari ini</span></div>
      </div>
      <div class="hero-visual"><img src="/alquran-online/quran.jpeg" alt="Al-Qur'an terbuka untuk dibaca" /><div class="visual-note"><span class="note-mark">۞</span><span><strong>Mulai dari satu ayat</strong><small>Langkah kecil menuju ketenangan</small></span></div></div>
    </section>

    <section class="feature-strip" aria-label="Fitur aplikasi">
      <div class="feature-item"><span class="feature-icon">١١٤</span><span><strong>114 Surah</strong><small>Lengkap dan terhubung</small></span></div>
      <div class="feature-item"><span class="feature-icon"><svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8m-8 4h7"/></svg></span><span><strong>Terjemahan Indonesia</strong><small>Makna ayat lebih dekat</small></span></div>
      <div class="feature-item"><span class="feature-icon"><svg viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6l-5 4H4Z"/><path d="M17 9a5 5 0 0 1 0 6m2.5-8.5a8.5 8.5 0 0 1 0 11"/></svg></span><span><strong>Audio Murottal</strong><small>Dengarkan ayat pilihan</small></span></div>
      <div class="feature-item"><span class="feature-icon"><svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/></svg></span><span><strong>Nyaman di Mana Saja</strong><small>Responsif untuk semua layar</small></span></div>
    </section>

    <section v-if="lastRead" class="continue-card" aria-labelledby="continue-title">
      <div class="continue-emblem" aria-hidden="true">۞</div><div class="continue-copy"><p class="eyebrow">SAMBUNGKAN KEMBALI</p><h2 id="continue-title">Terakhir dibaca</h2><p>{{ lastRead.name }}<span v-if="lastRead.ayah"> · Ayat {{ lastRead.ayah }}</span></p></div><nuxt-link class="continue-link" :to="lastReadLink">Lanjutkan <span aria-hidden="true">→</span></nuxt-link>
    </section>

    <section id="surah-list" class="surah-section" aria-labelledby="surah-title">
      <div class="section-header"><div><p class="eyebrow">JELAJAHI KITAB SUCI</p><h2 id="surah-title">Temukan surah pilihanmu</h2><p class="section-description">Cari surah berdasarkan nama atau nomor, lalu baca sesuai ritmemu.</p></div><span v-if="surah.length" class="surah-total">{{ surah.length }} surah</span></div>
      <form class="surah-search" role="search" @submit.prevent>
        <label for="surah-search-input" class="sr-only">Cari nama atau nomor surah</label><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg><input id="surah-search-input" v-model.trim="query" type="search" placeholder="Cari nama surah atau nomor..." autocomplete="off" /><kbd>⌘ K</kbd>
      </form>
      <div v-if="error" class="notice notice-error" role="alert"><span>{{ error }}</span><button class="inline-button" type="button" @click="loadSurah">Coba lagi</button></div>
      <div v-else-if="loading" class="surah-grid" aria-label="Memuat daftar surah"><div v-for="n in 6" :key="n" class="surah-skeleton"><span/><span/><span/></div></div>
      <div v-else-if="!filteredSurah.length" class="empty-state"><span class="empty-mark">⌕</span><h3>Surah tidak ditemukan</h3><p>Coba nama lain atau nomor surah antara 1–114.</p></div>
      <template v-else>
        <div class="featured-heading"><h3>{{ query ? 'Hasil pencarian' : 'Surah pilihan' }}</h3><span>{{ query ? `${filteredSurah.length} ditemukan` : 'Pilihan untuk memulai' }}</span></div>
        <div class="surah-grid featured-grid">
          <nuxt-link v-for="item in featuredSurah" :key="item.number" class="surah-card featured-card" :to="`/surah/${item.number}`">
            <span class="surah-index">{{ toArabicNumber(item.number) }}</span><span class="surah-copy"><strong>{{ item.name.transliteration.id }}</strong><small>{{ item.revelation.id }} <i>·</i> {{ item.numberOfVerses }} ayat</small></span><span class="surah-arabic" lang="ar" dir="rtl">{{ item.name.short }}</span><span class="surah-arrow" aria-hidden="true">↗</span>
          </nuxt-link>
        </div>
        <div v-if="!query" class="all-surah-heading"><h3>Seluruh surah</h3><span>Urut sesuai mushaf</span></div>
        <div class="surah-grid all-surah-grid">
          <nuxt-link v-for="item in visibleSurah" :key="item.number" class="surah-card" :to="`/surah/${item.number}`">
            <span class="surah-index">{{ toArabicNumber(item.number) }}</span><span class="surah-copy"><strong>{{ item.name.transliteration.id }}</strong><small>{{ item.revelation.id }} <i>·</i> {{ item.numberOfVerses }} ayat</small></span><span class="surah-arabic" lang="ar" dir="rtl">{{ item.name.short }}</span><span class="surah-arrow" aria-hidden="true">→</span>
          </nuxt-link>
        </div>
        <button v-if="!query && visibleCount < surah.length" class="button button-secondary load-more" type="button" @click="visibleCount += 18">Muat 18 surah lagi <span aria-hidden="true">↓</span></button>
      </template>
    </section>
  </main>
</template>

<script>
import axios from 'axios'

const FEATURED_NAMES = ['fatih', 'baqar', 'yasin', 'mulk']

export default {
  name: 'Main',
  data () {
    return { surah: [], query: '', loading: false, error: '', visibleCount: 18, lastRead: null }
  },
  computed: {
    filteredSurah () {
      const term = this.query.toLocaleLowerCase('id-ID')
      if (!term) return this.surah
      return this.surah.filter(item => {
        const name = item.name && item.name.transliteration && item.name.transliteration.id || ''
        const translated = item.name && item.name.translation && item.name.translation.id || ''
        return String(item.number) === term || name.toLocaleLowerCase('id-ID').includes(term) || translated.toLocaleLowerCase('id-ID').includes(term)
      })
    },
    featuredSurah () {
      if (this.query) return this.filteredSurah.slice(0, 4)
      const picks = FEATURED_NAMES.map(name => this.surah.find(item => item.name.transliteration.id.toLowerCase().replace(/[^a-z]/g, '').includes(name))).filter(Boolean)
      return picks.length ? picks : this.surah.slice(0, 4)
    },
    visibleSurah () {
      if (this.query) return this.filteredSurah.slice(4)
      const featuredNumbers = this.featuredSurah.map(item => item.number)
      return this.surah.filter(item => !featuredNumbers.includes(item.number)).slice(0, this.visibleCount)
    },
    lastReadLink () {
      return this.lastRead && this.lastRead.ayah ? `/surah/${this.lastRead.id}#ayah-${this.lastRead.ayah}` : `/surah/${this.lastRead.id}`
    }
  },
  mounted () {
    this.loadSurah()
    this.restoreLastRead()
    window.addEventListener('keydown', this.handleShortcut)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleShortcut)
  },
  methods: {
    async loadSurah () {
      this.loading = true
      this.error = ''
      try {
        const response = await axios.get('https://api.quran.gading.dev/surah')
        if (!response.data || !Array.isArray(response.data.data)) throw new Error('Format daftar surah tidak sesuai.')
        this.surah = response.data.data
      } catch (error) {
        this.error = 'Daftar surah belum dapat dimuat. Periksa koneksi lalu coba lagi.'
      } finally {
        this.loading = false
      }
    },
    restoreLastRead () {
      try {
        const saved = JSON.parse(window.localStorage.getItem('alquran-last-read') || 'null')
        if (saved && Number(saved.id) >= 1 && Number(saved.id) <= 114) this.lastRead = saved
      } catch (error) {
        this.lastRead = null
      }
    },
    toArabicNumber (number) {
      return String(number).replace(/[0-9]/g, digit => '٠١٢٣٤٥٦٧٨٩'[Number(digit)])
    },
    handleShortcut (event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        const input = document.getElementById('surah-search-input')
        if (input) input.focus()
      }
    }
  }
}
</script>
