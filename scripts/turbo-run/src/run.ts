import { select, isCancel, cancel } from '@clack/prompts';
import { execaCommand, getPackages, type Package } from '@dhy/node-utils';
interface RunOptions {
  command?: string;
}
export async function run(options: RunOptions) {
  const { command } = options;
  if (!command) {
    console.error('Please enter the command to run');
    process.exit(1);
  }
  const { packages } = await getPackages();
  const selectPkgs = packages.filter((pkg: Package) => {
    return (pkg?.packageJson as Record<string, any>)?.scripts?.[`${command}`];
  });
  let selectPkg: string | symbol;
  if (selectPkgs.length > 1) {
    selectPkg = await select<string>({
      message: '',
      options: selectPkgs.map((pkg: Package) => ({
        label: pkg?.packageJson.name,
        value: pkg?.packageJson.name,
      })),
    });
    if (isCancel(selectPkg) || !selectPkg) {
      cancel('👋 Has cancel');
      process.exit(0);
    }
  } else {
    selectPkg = selectPkgs[0]?.packageJson?.name ?? '';
  }
  if (!selectPkg) {
    console.error('No App found');
    process.exit(1);
  }
  execaCommand(`pnpm --filter=${String(selectPkg)} run ${command}`, {
    stdio: 'inherit',
  });
}
