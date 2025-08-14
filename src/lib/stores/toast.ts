import {
    toasts,
} from "svelte-toasts";


function createToastStore() {
    const showToast = ({ title, description, type }: { title: string, description: string, type: boolean }) => {
        toasts.add({
            title: title,
            description: description,
            duration: 1500, // 0 or negative to avoid auto-remove
            placement: "top-center",
            type: type ? "success" : "error",
            theme: "dark",
            dataSet: "toast",
            onClick: () => { },
            onRemove: () => { },
            // component: BootstrapToast, // allows to override toast component/template per toast
        });

        // toast.remove()
    };

    return {
        showToast
    }
}

export const toastStore = createToastStore