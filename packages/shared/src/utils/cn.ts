import type { ClassValue } from 'clsx';
import clsx from 'clsx';
function cn(...inputs: ClassValue[]) {
  console.log('clsx(inputs)--', clsx(inputs));
  return clsx(inputs);
}
export { cn };
