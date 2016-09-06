export default function decorator(req) {
    return (target, property, descriptor) => {
        const fn = descriptor.value;

        if (typeof fn !== 'function') {
            throw new Error(`@(get|put|post|delete) decorator can only be applied to methods not: ${typeof fn}`);
        }

        descriptor.value = function (...args) {
            const res = {
                base: target._base,
                processor: target._processor
            };
            return fn.apply(this, [...args, req, res]);
        };
       
        return descriptor;
    }
}
