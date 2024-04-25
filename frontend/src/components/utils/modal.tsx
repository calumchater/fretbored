import './modal.css';

interface ModalProps {
    handleClose: Function,
    show: boolean,
    children: JSX.Element
}

const Modal = ({ handleClose, show, children }: ModalProps) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (

        <div>
            <header>
                <span className="close-button"></span>
            </header>
            <div className={showHideClassName}>
                <section className="modal-main">
                    {children}
                    <button type="button" className="close-button top-right" onClick={() => handleClose()}>
                        X
                    </button>
                </section>

            </div>
        </div>
    );
};

export default Modal;
