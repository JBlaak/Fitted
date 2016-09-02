export default function decorator (req) {
  return (target, key, descriptor) => {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new Error(`@(get|put|post|delete) decorator can only be applied to methods not: ${typeof fn}`);
    }

    descriptor.value = (...args) => {
      const res = {
        base: target._base,
        processor: target._processor
      };
      return fn.apply(fn, [ ...args, req, res ]);
    };
    return descriptor;
  }
}
