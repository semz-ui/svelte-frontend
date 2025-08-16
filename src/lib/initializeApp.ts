import { createAppState, createTodoState } from "$lib/state";


export const initializeApp = () => {
    const appState = createAppState()
    const initializers = [
        () => createTodoState(appState)
    ]
    initializers.forEach((initializer) => initializer())
}