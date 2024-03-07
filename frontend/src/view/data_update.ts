import {ReceiverRepository} from "../application/repository/receiver_repository";
import {receiverCard} from "./receiver_card";

export function updateReceivers() {
    ReceiverRepository.getAll().then((receivers) => {
        const ul = document.querySelector('#receivers')!;

        ul.innerHTML = '';
        ul.append(...receivers.map((r) => receiverCard(r)));
    });
}
