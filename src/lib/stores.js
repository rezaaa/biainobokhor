import { writable } from 'svelte/store';

export const viewState = writable(0);
export const loadingState = writable(false);
export const ordersState = writable({data: []});
export const profileState = writable(null);