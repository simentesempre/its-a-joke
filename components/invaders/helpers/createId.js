export const createId = () => [Math.random().toString(36), Math.random().toString(36), Math.random().toString(36)].join('').replace(/[^a-z]+/g, '').substr(0, 10).toUpperCase()
