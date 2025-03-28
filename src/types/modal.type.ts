export interface IConfirmModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmitFn: () => void;
  name: string;
}
