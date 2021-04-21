module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
                @import "@/_variables.scss"; 
                `,
      },
    },
  },
};
