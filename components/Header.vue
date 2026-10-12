<template>
  <header class="site-header">
    <div class="page-container nav-inner">
      <nuxt-link class="brand" to="/" aria-label="Al-Qur'an, beranda">
        <span class="brand-symbol" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M21.6 4.8a12.1 12.1 0 1 0 6.1 21.4A13 13 0 0 1 21.6 4.8Z"/><path class="brand-star" d="m19 7 .8 2.2L22 10l-2.2.8L19 13l-.8-2.2L16 10l2.2-.8L19 7Z"/></svg></span>
        <span class="brand-copy"><strong>Al-Qur'an</strong><small>Cahaya untuk setiap hari</small></span>
      </nuxt-link>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen ? 'true' : 'false'" aria-controls="site-navigation" @click="menuOpen = !menuOpen"><span class="sr-only">{{ menuOpen ? 'Tutup menu' : 'Buka menu' }}</span><svg v-if="!menuOpen" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
      <nav id="site-navigation" class="site-nav" :class="{ 'is-open': menuOpen }" aria-label="Navigasi utama">
        <nuxt-link to="/" exact @click.native="menuOpen = false">Beranda</nuxt-link>
        <nuxt-link to="/#surah-list" @click.native="menuOpen = false">Daftar Surah</nuxt-link>
        <button class="theme-toggle" type="button" :aria-label="theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'" :title="theme === 'dark' ? 'Mode terang' : 'Mode gelap'" @click="toggleTheme"><svg v-if="theme !== 'dark'" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 15.2A8.3 8.3 0 0 1 8.8 3.9 8.5 8.5 0 1 0 20.1 15.2Z"/></svg><svg v-else viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><span class="theme-label">{{ theme === 'dark' ? 'Terang' : 'Gelap' }}</span></button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return { menuOpen: false, theme: 'light' }
  },
  mounted () {
    try {
      this.theme = window.localStorage.getItem('alquran-theme') || 'light'
    } catch (error) {
      this.theme = 'light'
    }
    this.applyTheme()
  },
  methods: {
    applyTheme () {
      if (process.client) {
        document.documentElement.setAttribute('data-theme', this.theme)
        this.$root.$emit('theme-change', this.theme)
      }
    },
    toggleTheme () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme()
      try { window.localStorage.setItem('alquran-theme', this.theme) } catch (error) {}
    }
  }
}
</script>
