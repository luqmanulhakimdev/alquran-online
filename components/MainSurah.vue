<template>
  <main class="reader-page page-container">
    <div class="reader-topbar"><nuxt-link class="back-link" to="/#surah-list"><span aria-hidden="true">←</span> Kembali ke daftar surah</nuxt-link><button class="reader-theme" type="button" :aria-label="isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'" @click="toggleTheme"><span aria-hidden="true">{{ isDark ? '☼' : '☾' }}</span> <span>{{ isDark ? 'Mode terang' : 'Mode gelap' }}</span></button></div>

    <div v-if="error" class="notice notice-error reader-notice" role="alert"><span>{{ error }}</span><button class="inline-button" type="button" @click="loadSurah">Coba lagi</button></div>
    <div v-else-if="loading" class="reader-loading" role="status"><span class="spinner"/> Memuat surah…</div>
    <template v-else-if="surah && surah.number">
      <section class="surah-banner" aria-labelledby="surah-heading"><div class="banner-pattern" aria-hidden="true">۞</div><div class="banner-topline"><span class="banner-number">SURAH {{ surah.number }}</span><span class="revelation-pill">{{ surah.revelation.id }}<span v-if="surah.numberOfVerses"> · {{ surah.numberOfVerses }} ayat</span></span></div><div class="banner-main"><div><h1 id="surah-heading">{{ surah.name.transliteration.id }}</h1><p class="surah-translation">{{ surah.name.translation.id }}</p></div><p class="banner-arabic" lang="ar" dir="rtl">{{ surah.name.short }}</p></div><div v-if="surah.preBismillah" class="bismillah" lang="ar" dir="rtl">{{ surah.preBismillah.text.arab }}</div></section>

      <section class="reader-controls" aria-label="Pengaturan bacaan"><div class="reader-tabs" role="tablist" aria-label="Konten surah"><button type="button" role="tab" :aria-selected="activeTab === 'verses' ? 'true' : 'false'" :class="{ active: activeTab === 'verses' }" @click="activeTab = 'verses'">Ayat</button><button type="button" role="tab" :aria-selected="activeTab === 'about' ? 'true' : 'false'" :class="{ active: activeTab === 'about' }" @click="activeTab = 'about'">Tentang Surah</button></div><div v-if="activeTab === 'verses'" class="display-settings"><span>Ukuran Arab</span><div class="size-buttons" aria-label="Ukuran teks Arab"><button type="button" :aria-pressed="arabSize === 'small' ? 'true' : 'false'" :class="{ active: arabSize === 'small' }" @click="setArabSize('small')">A−</button><button type="button" :aria-pressed="arabSize === 'normal' ? 'true' : 'false'" :class="{ active: arabSize === 'normal' }" @click="setArabSize('normal')">A</button><button type="button" :aria-pressed="arabSize === 'large' ? 'true' : 'false'" :class="{ active: arabSize === 'large' }" @click="setArabSize('large')">A+</button></div><label class="switch-setting"><input v-model="showTransliteration" type="checkbox" @change="savePreferences"><span>Transliterasi</span></label><label class="switch-setting"><input v-model="showTranslation" type="checkbox" @change="savePreferences"><span>Terjemahan</span></label></div></section>

      <p v-if="audioError" class="notice notice-error audio-notice" role="alert">{{ audioError }}</p>
      <section v-if="activeTab === 'verses'" class="verse-list" :class="`arab-${arabSize}`" aria-label="Ayat surah">
        <article v-if="surah.preBismillah" class="verse-card preface-card"><div class="preface-label"><span class="verse-number">ب</span><span>Bismillah</span></div><p class="arabic-text" lang="ar" dir="rtl">{{ surah.preBismillah.text.arab }}</p><p v-if="showTransliteration && surah.preBismillah.text.transliteration" class="transliteration">{{ surah.preBismillah.text.transliteration.en }}</p><p v-if="showTranslation" class="translation-text">{{ surah.preBismillah.translation.id }}</p><div class="verse-actions"><button class="verse-action" type="button" :disabled="!surah.preBismillah.audio || !surah.preBismillah.audio.primary" @click="toggleAudio(surah.preBismillah, 0)"><span aria-hidden="true">{{ activeVerse === 0 && isPlaying ? 'Ⅱ' : '▶' }}</span> {{ activeVerse === 0 && isPlaying ? 'Jeda' : 'Putar' }}</button></div></article>
        <article v-for="verse in surah.verses" :id="`ayah-${verse.number.inSurah}`" :key="verse.number.inSurah" class="verse-card" :data-verse="verse.number.inSurah">
          <div class="verse-heading"><span class="verse-number">{{ toArabicNumber(verse.number.inSurah) }}</span><span class="verse-label">Ayat {{ verse.number.inSurah }}</span><button class="bookmark-button" type="button" :aria-label="isBookmarked(verse.number.inSurah) ? 'Hapus penanda ayat' : 'Tandai ayat'" :aria-pressed="isBookmarked(verse.number.inSurah) ? 'true' : 'false'" @click="toggleBookmark(verse.number.inSurah)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z"/></svg></button></div>
          <p class="arabic-text" lang="ar" dir="rtl">{{ verse.text.arab }}</p><p v-if="showTransliteration && verse.text.transliteration" class="transliteration">{{ verse.text.transliteration.en }}</p><p v-if="showTranslation" class="translation-text">{{ verse.translation.id }}</p>
          <div class="verse-actions"><button class="verse-action" type="button" :disabled="!verse.audio || !verse.audio.primary" @click="toggleAudio(verse, verse.number.inSurah)"><span aria-hidden="true">{{ activeVerse === verse.number.inSurah && isPlaying ? 'Ⅱ' : '▶' }}</span> {{ activeVerse === verse.number.inSurah && isPlaying ? 'Jeda' : 'Putar ayat' }}</button><button class="verse-action" type="button" @click="saveLastRead(verse.number.inSurah)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16l-7-4-7 4V4Z"/></svg>{{ lastReadVerse === verse.number.inSurah ? 'Tersimpan' : 'Terakhir dibaca' }}</button></div>
        </article>
      </section>
      <section v-else class="about-panel"><p class="eyebrow">{{ surah.revelation.id }}<span v-if="surah.numberOfVerses"> · {{ surah.numberOfVerses }} ayat</span></p><h2>{{ surah.name.translation.id }}</h2><p v-if="surah.tafsir && surah.tafsir.id" class="about-tafsir">{{ surah.tafsir.id }}</p><p v-else class="muted-copy">Informasi tentang surah ini belum tersedia dari sumber data.</p></section>

      <nav class="surah-navigation" aria-label="Navigasi surah"><nuxt-link v-if="previousSurah" :to="`/surah/${previousSurah}`" class="surah-nav-link"><span aria-hidden="true">←</span><span><small>SEBELUMNYA</small><strong>{{ previousSurahName }}</strong></span></nuxt-link><span v-else class="surah-nav-placeholder"/><nuxt-link v-if="nextSurah" :to="`/surah/${nextSurah}`" class="surah-nav-link next"><span><small>SELANJUTNYA</small><strong>{{ nextSurahName }}</strong></span><span aria-hidden="true">→</span></nuxt-link><span v-else class="surah-nav-placeholder"/></nav>
    </template>
    <div v-else class="empty-state"><h2>Surah tidak ditemukan</h2><p>Pastikan nomor surah berada di antara 1 dan 114.</p><nuxt-link class="button button-primary" to="/#surah-list">Kembali ke daftar surah</nuxt-link></div>
    <audio ref="audio" :src="audioSource" @ended="handleAudioEnded" @error="handleAudioError" />
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MainSurah',
  data () {
    return {
      id: 0,
      surah: null,
      loading: false,
      error: '',
      activeTab: 'verses',
      arabSize: 'normal',
      showTransliteration: true,
      showTranslation: true,
      audioSource: '',
      activeVerse: null,
      isPlaying: false,
      audioError: '',
      isDark: false,
      bookmarks: [],
      lastReadVerse: null,
      verseObserver: null
    }
  },
  computed: {
    previousSurah () { return this.id > 1 ? this.id - 1 : null },
    nextSurah () { return this.id < 114 ? this.id + 1 : null },
    previousSurahName () { return this.previousSurah ? `Surah ${this.previousSurah}` : '' },
    nextSurahName () { return this.nextSurah ? `Surah ${this.nextSurah}` : '' },
  },
  watch: {
    '$route.params.id' () { this.stopAudio(); this.loadSurah() }
  },
  mounted () {
    this.restorePreferences()
    this.isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    this.$root.$on('theme-change', this.handleThemeChange)
    this.loadSurah()
  },
  beforeDestroy () {
    this.stopAudio()
    this.$root.$off('theme-change', this.handleThemeChange)
    if (this.verseObserver) this.verseObserver.disconnect()
  },
  methods: {
    async loadSurah () {
      const id = Number(this.$route.params.id)
      if (!Number.isInteger(id) || id < 1 || id > 114) {
        this.id = 0; this.surah = null; this.loading = false
        return
      }
      this.id = id; this.loading = true; this.error = ''; this.surah = null
      if (this.verseObserver) this.verseObserver.disconnect()
      try {
        const response = await axios.get(`https://api.quran.gading.dev/surah/${id}`)
        const data = response.data && response.data.data
        if (!data || Number(data.number) !== id || !Array.isArray(data.verses)) throw new Error('Data surah tidak lengkap.')
        this.surah = data
        this.restoreLastRead()
        this.$nextTick(this.observeVerses)
      } catch (error) {
        this.error = 'Surah belum dapat dimuat. Periksa koneksi internet lalu coba lagi.'
      } finally {
        this.loading = false
      }
    },
    restorePreferences () {
      try {
        const saved = JSON.parse(window.localStorage.getItem('alquran-reader-settings') || '{}')
        if (['small', 'normal', 'large'].includes(saved.arabSize)) this.arabSize = saved.arabSize
        if (typeof saved.showTranslation === 'boolean') this.showTranslation = saved.showTranslation
        if (typeof saved.showTransliteration === 'boolean') this.showTransliteration = saved.showTransliteration
        const savedBookmarks = JSON.parse(window.localStorage.getItem('alquran-bookmarks') || '[]')
        this.bookmarks = Array.isArray(savedBookmarks) ? savedBookmarks.filter(item => typeof item === 'string') : []
      } catch (error) {
        this.bookmarks = []
      }
    },
    savePreferences () {
      try { window.localStorage.setItem('alquran-reader-settings', JSON.stringify({ arabSize: this.arabSize, showTranslation: this.showTranslation, showTransliteration: this.showTransliteration })) } catch (error) {}
    },
    setArabSize (size) { this.arabSize = size; this.savePreferences() },
    toggleTheme () {
      this.isDark = !this.isDark
      const next = this.isDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      try { window.localStorage.setItem('alquran-theme', next) } catch (error) {}
      this.$root.$emit('theme-change', next)
    },
    handleThemeChange (theme) { this.isDark = theme === 'dark' },
    toArabicNumber (number) { return String(number).replace(/[0-9]/g, digit => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]) },
    isBookmarked (number) { return this.bookmarks.includes(`${this.id}:${number}`) },
    toggleBookmark (number) {
      const key = `${this.id}:${number}`
      this.bookmarks = this.isBookmarked(number) ? this.bookmarks.filter(item => item !== key) : this.bookmarks.concat(key)
      try { window.localStorage.setItem('alquran-bookmarks', JSON.stringify(this.bookmarks)) } catch (error) {}
    },
    saveLastRead (number) {
      this.lastReadVerse = number
      const name = this.surah && this.surah.name && this.surah.name.transliteration ? this.surah.name.transliteration.id : `Surah ${this.id}`
      try { window.localStorage.setItem('alquran-last-read', JSON.stringify({ id: this.id, ayah: number, name, updatedAt: Date.now() })) } catch (error) {}
    },
    restoreLastRead () {
      try {
        const saved = JSON.parse(window.localStorage.getItem('alquran-last-read') || 'null')
        this.lastReadVerse = saved && Number(saved.id) === this.id && Number(saved.ayah) >= 1 ? Number(saved.ayah) : null
      } catch (error) { this.lastReadVerse = null }
    },
    observeVerses () {
      if (typeof IntersectionObserver === 'undefined') return
      if (this.verseObserver) this.verseObserver.disconnect()
      this.verseObserver = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) this.saveLastRead(Number(visible[0].target.getAttribute('data-verse')))
      }, { threshold: 0.6 })
      this.$el.querySelectorAll('.verse-card[data-verse]').forEach(element => this.verseObserver.observe(element))
    },
    async toggleAudio (verse, number) {
      const url = verse && verse.audio && verse.audio.primary
      if (!url) return
      const audio = this.$refs.audio
      this.audioError = ''
      if (this.activeVerse === number) {
        if (this.isPlaying) { audio.pause(); this.isPlaying = false }
        else { try { await audio.play(); this.isPlaying = true } catch (error) { this.audioError = 'Audio tidak dapat diputar. Coba lagi atau periksa koneksi internet.' } }
        return
      }
      audio.pause(); this.audioSource = url; this.activeVerse = number; this.isPlaying = false
      await this.$nextTick()
      try {
        await audio.play()
        this.isPlaying = true
        if (number > 0) this.saveLastRead(number)
      } catch (error) {
        this.audioError = 'Audio tidak dapat diputar. Coba lagi atau periksa koneksi internet.'
        this.activeVerse = null
      }
    },
    stopAudio () {
      if (this.$refs.audio) { this.$refs.audio.pause(); this.$refs.audio.removeAttribute('src'); this.$refs.audio.load() }
      this.audioSource = ''; this.activeVerse = null; this.isPlaying = false
    },
    handleAudioEnded () { this.isPlaying = false; this.activeVerse = null },
    handleAudioError () { if (this.audioSource) { this.audioError = 'Audio gagal dimuat. Anda masih dapat membaca teks dan terjemahan.'; this.isPlaying = false } },
  }
}
</script>
