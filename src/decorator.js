export default function decorator (req) {
  return (target, key, descriptor) => {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new Error(`@(get|put|post|delete) decorator can only be applied to methods not: ${typeof fn}`);
    }

    descriptor.value = (...args) => fn.apply(fn, [ ...args, req, {} ]);
    return descriptor;
  }
}
