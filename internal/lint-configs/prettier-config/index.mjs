/**
 * @type {import('prettier').Options & import('prettier-plugin-tailwindcss').PluginOptions}
 */
export default {
  endOfLine: 'auto', //换行符自动检测
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: ['*.json', '*.json5'],
      options: {
        quoteProps: 'preserve', //用于控制对象属性何时使用引号包裹,"preserve" - 保持输入时属性引号的使用方式
        singleQuote: false,
      },
    },
  ],
  printWidth: 100, //单行最大长度,传统代码库（80）/现代宽屏开发（100）
  semi: true, //语句末尾添加分号,TypeScript 项目（避免 ASI 问题）
  proseWrap: 'never', //Markdown 换行,不自动折行
  singleQuote: true, //优先使用单引号 '（与 JSX 习惯一致）
  trailingComma: 'all', //对象/数组等多行时始终添加逗号,多人协作项目（减少 Git 差异）
};
