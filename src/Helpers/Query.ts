export function $ (selector: string): HTMLElement | null { return document.querySelector(selector) }
export function $$ (selector: string): HTMLElement[] | null { return [...document.querySelectorAll<HTMLElement>(selector)] }
export default { $, $$ }
