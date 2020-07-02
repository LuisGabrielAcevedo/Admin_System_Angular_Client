import { IModal, makeModal } from 'client/app/app/models';

export interface IFlowExitModal extends IModal {
	cancel: string;
	confirm: string;
	description: string;
	onCancel: () => void;
	onConfirm: () => void;
}

export function makeFlowExitModal(data: Partial<IFlowExitModal>): IFlowExitModal {
	const modal: IModal = makeModal({});
	const defaultValue: IFlowExitModal = {
		...modal,
		cancel: '',
		confirm: '',
		description: '',
		onCancel: () => {},
		onConfirm: () => {},
		component: {},
		title: ''
	};

	return { ...defaultValue, ...data };
}
