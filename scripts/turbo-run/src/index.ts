import cac from 'cac';
import { run } from './run';
try {
  const turboRun = cac('turbo-run');
  turboRun
    .command('[script]')
    .usage('Run Turbo !')
    .action(async (command: string) => {
      run({ command });
    });
  // Listen to unknown commands
  turboRun.on('command:*', () => {
    console.error('Invalid command');
    process.exit(1);
  });
  turboRun.usage('turbo-run'); //添加全局使用说明文本
  turboRun.help(); //当出现 -h, --help 标志时显示帮助信息
  turboRun.parse(); //当调用此方法时， cli.rawArgs cli.args cli.options cli.matchedCommand 也将可用。
} catch (error) {
  console.error(error);
  process.exit(1);
}
