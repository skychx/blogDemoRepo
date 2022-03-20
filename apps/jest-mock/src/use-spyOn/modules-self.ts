import { fib } from './cpu';

export function sum(n: number) {
    const a = fib(n);
    const b = fib(n);

    return a + b;
}
