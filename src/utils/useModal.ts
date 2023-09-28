import Modal from "../components/Modal";

const modalMap = new Map<string, Modal>();

const useModal = (key: string) => {
    if (modalMap.has(key)) {
        return modalMap.get(key)!;
    }

    const modal = new Modal({isVisible: false, content: null});

    modalMap.set(key, modal);

    return modal;
};

export default useModal;
