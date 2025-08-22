import config from '.';
export default {
  plugins: {
    //cssnano：生成环境缩减css代码
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    //v4可以移除 postcss-import 和 autoprefixer
    '@tailwindcss/postcss': {
      config,
    },
    //postcss-preset-env:根据目标浏览器或运行时环境确定所需的 polyfills
    'postcss-preset-env': {},
  },
};
