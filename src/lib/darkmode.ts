import { browser } from "$app/environment";
import { writable } from "svelte/store";

function createDarkModeStore() {
    const { subscribe, update, set } = writable<boolean>(false);

    if (browser) {
        if (localStorage.getItem("darkMode")) {
            set(JSON.parse(localStorage.getItem("darkMode")))
        }
        subscribe((val) => {
            localStorage.setItem("darkMode", JSON.stringify(val))

        })
    }



    return {
        subscribe,
        toggle: () => {
            update((current) =>
                !current
            )
        }
    }
}

export const darkMode = createDarkModeStore();