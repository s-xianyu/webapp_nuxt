# nuxtjs.org

Universal Vue.js Application built with [Nuxt.js](https://github.com/nuxt/nuxt.js).

# zh.nuxtjs.org

Nuxt.js 官网 [nuxtjs.org](https://nuxtjs.org) 的简体中文版，由[凹凸实验室](https://aotu.io)负责翻译整理。

欢迎关注我们的微信公众号（微信里面搜`凹凸实验室`），关于 Nuxt.js 的最新信息会通过公众号发布。

Chinese translation of primary Nuxt.js documentation site. Supported by [AOTU Labs](https://aotu.io).

# Developing

The markdown files are store at [https://github.com/nuxt/docs](https://github.com/nuxt/docs), we use a git submodule to clone the repo:

```
git clone --recursive https://github.com/nuxt/nuxtjs.org.git
```

Update your `/etc/hosts` to have the following lines:

```
127.0.0.1       nuxt
127.0.0.1       ja.nuxt
127.0.0.1       ko.nuxt
127.0.0.1       ru.nuxt
127.0.0.1       zh.nuxt
127.0.0.1       fr.nuxt
```

Then on another tab, start a dev server on `http://nuxt:3000`

```bash
yarn install
yarn run dev
```
