module.exports = {
  chainWebpack: config => {
    // Import ArchieML files with .aml suffixes at build time
    config.module
      .rule('archieml')
      .test(/.+\.aml$/)
      .use('@newsdev/archieml-loader')
        .loader('@newsdev/archieml-loader')
        .end()
  },
}
